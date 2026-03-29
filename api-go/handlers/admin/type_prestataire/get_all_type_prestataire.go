package type_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllTypesPrestataire(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	rows, err := database.DB.Query(`SELECT id_type, nom_type FROM type_prestataire`)
	if err != nil {
		log.Printf("❌ GetAllTypesPrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var types []models.TypePrestataire
	for rows.Next() {
		var t models.TypePrestataire
		if err := rows.Scan(&t.Id_type, &t.Nom_type); err != nil {
			log.Printf("⚠️ GetAllTypesPrestataire - Erreur scan: %v", err)
			continue
		}
		types = append(types, t)
	}

	if types == nil {
		types = []models.TypePrestataire{}
	}

	json.NewEncoder(w).Encode(types)
}