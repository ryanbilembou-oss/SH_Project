package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllProfilePro(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_user, nom, prenom, nom_entreprise, adresse_pro, statut_juridique, date_naissance, genre, statut_validation, is_subscription_valid, siret, bio, rib, telephone_pro, logo_url, note_moyenne, commission FROM profile_pro`)
	if err != nil {
		log.Printf("❌ GetAllProfilePro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var profiles []models.ProfilePro
	for rows.Next() {
		var p models.ProfilePro
		if err := rows.Scan(&p.Id_user, &p.Nom, &p.Prenom, &p.Nom_entreprise, &p.Adresse_pro, &p.Statut_juridique, &p.Date_naissance, &p.Genre, &p.Statut_validation, &p.Is_subscription_valid, &p.Siret, &p.Bio, &p.Rib, &p.Telephone_pro, &p.Logo_url, &p.Note_moyenne, &p.Commission); err != nil {
			log.Printf("⚠️ GetAllProfilePro - Erreur scan: %v", err)
			continue
		}
		profiles = append(profiles, p)
	}

	if profiles == nil {
		profiles = []models.ProfilePro{}
	}

	json.NewEncoder(w).Encode(profiles)
}