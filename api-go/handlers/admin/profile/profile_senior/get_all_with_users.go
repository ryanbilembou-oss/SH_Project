package profile_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type SeniorWithUser struct {
	Id_user               int     `json:"id_user"`
	Email                 string  `json:"email"`
	Nom                   *string `json:"nom"`
	Prenom                *string `json:"prenom"`
	Genre                 *string `json:"genre"`
	Date_naissance        *string `json:"date_naissance"`
	Is_first_login        *bool   `json:"is_first_login"`
	Is_subscription_valid *bool   `json:"is_subscription_valid"`
	Adresse               *string `json:"adresse"`
	Telephone             *string `json:"telephone"`
	Has_profile           bool    `json:"has_profile"`
}

func GetAllSeniorsWithUsers(w http.ResponseWriter, r *http.Request) {
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

	query := `
		SELECT 
			u.id_user,
			u.email,
			ps.nom,
			ps.prenom,
			ps.genre,
			ps.date_naissance::text,
			ps.is_first_login,
			ps.is_subscription_valid,
			ps.adresse,
			ps.telephone,
			CASE WHEN ps.id_user IS NOT NULL THEN true ELSE false END as has_profile
		FROM users u
		LEFT JOIN profile_senior ps ON u.id_user = ps.id_user
		WHERE u.role = 'senior'
		ORDER BY u.id_user ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllSeniorsWithUsers - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var seniors []SeniorWithUser
	for rows.Next() {
		var s SeniorWithUser
		if err := rows.Scan(
			&s.Id_user, &s.Email, &s.Nom, &s.Prenom,
			&s.Genre, &s.Date_naissance, &s.Is_first_login,
			&s.Is_subscription_valid, &s.Adresse, &s.Telephone,
			&s.Has_profile,
		); err != nil {
			log.Printf("⚠️ GetAllSeniorsWithUsers - Erreur scan: %v", err)
			continue
		}
		seniors = append(seniors, s)
	}

	if seniors == nil {
		seniors = []SeniorWithUser{}
	}

	json.NewEncoder(w).Encode(seniors)
}