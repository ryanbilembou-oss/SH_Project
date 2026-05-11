package profile_admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllProfileAdmin(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_user, nom, prenom, genre, telephone FROM profile_admin`)
	if err != nil {
		log.Printf("❌ GetAllProfileAdmin - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var profiles []models.ProfileAdmin
	for rows.Next() {
		var p models.ProfileAdmin
		if err := rows.Scan(&p.Id_user, &p.Nom, &p.Prenom, &p.Genre, &p.Telephone); err != nil {
			log.Printf("⚠️ GetAllProfileAdmin - Erreur scan: %v", err)
			continue
		}
		profiles = append(profiles, p)
	}

	if profiles == nil {
		profiles = []models.ProfileAdmin{}
	}

	json.NewEncoder(w).Encode(profiles)
}