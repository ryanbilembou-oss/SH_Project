package profile_admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type AdminWithUser struct {
	Id_user     int     `json:"id_user"`
	Email       string  `json:"email"`
	Nom         *string `json:"nom"`
	Prenom      *string `json:"prenom"`
	Genre       *string `json:"genre"`
	Telephone   *string `json:"telephone"`
	Has_profile bool    `json:"has_profile"`
}

func GetAllAdminsWithUsers(w http.ResponseWriter, r *http.Request) {
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
			pa.nom,
			pa.prenom,
			pa.genre,
			pa.telephone,
			CASE WHEN pa.id_user IS NOT NULL THEN true ELSE false END as has_profile
		FROM users u
		LEFT JOIN profile_admin pa ON u.id_user = pa.id_user
		WHERE u.role = 'admin'
		ORDER BY u.id_user ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllAdminsWithUsers - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var admins []AdminWithUser
	for rows.Next() {
		var a AdminWithUser
		if err := rows.Scan(
			&a.Id_user, &a.Email, &a.Nom, &a.Prenom,
			&a.Genre, &a.Telephone, &a.Has_profile,
		); err != nil {
			log.Printf("⚠️ GetAllAdminsWithUsers - Erreur scan: %v", err)
			continue
		}
		admins = append(admins, a)
	}

	if admins == nil {
		admins = []AdminWithUser{}
	}

	json.NewEncoder(w).Encode(admins)
}