package note_avis

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type NoteAvisRequest struct {
	Id_intervention *int    `json:"id_intervention"`
	Note            int     `json:"note"`
	Commentaire     *string `json:"commentaire"`
}

func CreateNoteAvis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	var req NoteAvisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	if req.Note < 1 || req.Note > 5 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "La note doit être entre 1 et 5"})
		return
	}

 
	if req.Id_intervention != nil {
		var exists bool
		database.DB.QueryRow(
			`SELECT EXISTS(SELECT 1 FROM note_avis WHERE id_intervention = $1)`,
			req.Id_intervention,
		).Scan(&exists)

		if exists {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]string{"error": "Vous avez déjà noté cette intervention"})
			return
		}
	}
 
	var newId int
	err := database.DB.QueryRow(`
		INSERT INTO note_avis (id_intervention, note, commentaire)
		VALUES ($1, $2, $3) RETURNING id_avis`,
		req.Id_intervention, req.Note, req.Commentaire,
	).Scan(&newId)

	if err != nil {
		log.Printf("❌ CreateNoteAvis - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
 
	if req.Id_intervention != nil {
		_, err = database.DB.Exec(`
			UPDATE profile_pro SET note_moyenne = (
				SELECT COALESCE(AVG(na.note::numeric), 0)
				FROM note_avis na
				INNER JOIN intervention i ON na.id_intervention = i.id
				WHERE i.id_pro = (
					SELECT i2.id_pro FROM intervention i2 WHERE i2.id = $1
				)
			) WHERE id_user = (
				SELECT i3.id_pro FROM intervention i3 WHERE i3.id = $1
			)
		`, req.Id_intervention)
		if err != nil {
			log.Printf("⚠️ CreateNoteAvis - Erreur update note_moyenne : %v", err)
		}
	}

	log.Printf("✅ CreateNoteAvis - ID %d créé, note=%d", newId, req.Note)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "id": newId})
}