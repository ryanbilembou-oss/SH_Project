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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions { w.WriteHeader(http.StatusOK); return }
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

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "id": newId})
}