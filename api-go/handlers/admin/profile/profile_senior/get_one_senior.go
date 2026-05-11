package profile_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetProfileSenior(w http.ResponseWriter, r *http.Request) {
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

	var p models.ProfileSenior
	err := database.DB.QueryRow(
		`SELECT id_user, nom, prenom, genre, date_naissance, is_first_login, is_subscription_valid, adresse, telephone FROM profile_senior WHERE id_user = $1`, id,
	).Scan(&p.Id_user, &p.Nom, &p.Prenom, &p.Genre, &p.Date_naissance, &p.Is_first_login, &p.Is_subscription_valid, &p.Adresse, &p.Telephone)
	if err != nil {
		log.Printf("❌ GetProfileSenior - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Profil senior introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(p)
}