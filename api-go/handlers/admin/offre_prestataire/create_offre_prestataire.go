package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type OffrePrestataireRequest struct {
	Id_pro            int     `json:"id_pro"`
	Id_service        int     `json:"id_service"`
	Prix_personnalise float64 `json:"prix_personnalise"`
	Titre             string  `json:"titre"`
	Bio               string  `json:"bio"`
}

func CreateOffrePrestataire(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req OffrePrestataireRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_pro == 0 || req.Id_service == 0 || req.Prix_personnalise <= 0 {
		http.Error(w, `{"erreur": "id_pro, id_service et prix_personnalise sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO offre_prestataire (id_pro, id_service, prix_personnalise, titre, bio) VALUES ($1, $2, $3, NULLIF($4, ''), NULLIF($5, ''))`,
		req.Id_pro, req.Id_service, req.Prix_personnalise, req.Titre, req.Bio,
	)
	if err != nil {
		log.Printf("❌ CreateOffrePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ OffrePrestataire créée pour pro %d", req.Id_pro)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}