package inscription_evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CreateInscriptionRequest struct {
	Id_user      int    `json:"id_user"`
	Id_evenement int    `json:"id_evenement"`
	Statut       string `json:"statut"`
}

func CreateInscription(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req CreateInscriptionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Id_evenement == 0 {
		http.Error(w, `{"erreur": "id_user et id_evenement sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.Statut == "" { req.Statut = "inscrit" }


	var nbPlacesMax, nbInscrits int
	err := database.DB.QueryRow(
		`SELECT nb_places_max, nb_inscrits FROM evenements WHERE id_evenement = $1`,
		req.Id_evenement,
	).Scan(&nbPlacesMax, &nbInscrits)
	if err != nil {
		http.Error(w, `{"erreur": "Événement introuvable"}`, http.StatusNotFound)
		return
	}

	if nbInscrits >= nbPlacesMax {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "complet"})
		return
	}


	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

_, err = tx.Exec(
    `INSERT INTO inscription_evenement (id_user, id_evenement, statut) VALUES ($1, $2, 'inscrit')ON CONFLICT (id_user, id_evenement) DO UPDATE SET statut = 'inscrit'`,
    req.Id_user, req.Id_evenement,
)
	if err != nil {
		tx.Rollback()
		log.Printf("❌ CreateInscription - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	_, err = tx.Exec(
		`UPDATE evenements SET nb_inscrits = nb_inscrits + 1 WHERE id_evenement = $1`,
		req.Id_evenement,
	)
	if err != nil {
		tx.Rollback()
		log.Printf("❌ CreateInscription - Erreur UPDATE: %v", err)
		http.Error(w, `{"erreur": "Erreur mise à jour places"}`, http.StatusInternalServerError)
		return
	}

	tx.Commit()
	log.Printf("✅ Inscription créée user %d → événement %d", req.Id_user, req.Id_evenement)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}