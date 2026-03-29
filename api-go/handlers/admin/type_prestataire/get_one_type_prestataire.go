package type_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetTypePrestataire(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var t models.TypePrestataire
	err := database.DB.QueryRow(`SELECT id_type, nom_type FROM type_prestataire WHERE id_type = $1`, id).Scan(&t.Id_type, &t.Nom_type)
	if err != nil {
		log.Printf("❌ GetTypePrestataire - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Type prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(t)
}