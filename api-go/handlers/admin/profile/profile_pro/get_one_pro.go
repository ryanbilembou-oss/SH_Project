package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetProfilePro(w http.ResponseWriter, r *http.Request) {
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

	var p models.ProfilePro
	err := database.DB.QueryRow(
		`SELECT id_user, nom, prenom, nom_entreprise, adresse_pro, statut_juridique, date_naissance, genre, statut_validation, is_subscription_valid, siret, bio, rib, id_type,telephone_pro, logo_url, note_moyenne, commission FROM profile_pro WHERE id_user = $1`, id,
	).Scan(&p.Id_user, &p.Nom, &p.Prenom, &p.Nom_entreprise, &p.Adresse_pro, &p.Statut_juridique, &p.Date_naissance, &p.Genre, &p.Statut_validation, 
		&p.Is_subscription_valid, &p.Siret, &p.Bio, &p.Rib, &p.Id_type,&p.Telephone_pro, &p.Logo_url, &p.Note_moyenne, &p.Commission)
	if err != nil {
		log.Printf("❌ GetProfilePro - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Profil pro introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(p)
}

