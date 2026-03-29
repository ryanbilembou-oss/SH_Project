package type_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type TypePrestataireRequest struct {
	Nom_type string `json:"nom_type"`
}

func CreateTypePrestataire(w http.ResponseWriter, r *http.Request) {
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

	var req TypePrestataireRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Nom_type == "" {
		http.Error(w, `{"erreur": "Le nom du type est obligatoire"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(`INSERT INTO type_prestataire (nom_type) VALUES ($1)`, req.Nom_type)
	if err != nil {
		log.Printf("❌ CreateTypePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Type prestataire créé : %s", req.Nom_type)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}