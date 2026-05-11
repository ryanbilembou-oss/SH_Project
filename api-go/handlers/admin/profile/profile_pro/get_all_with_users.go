package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ProWithUser struct {
	Id_user               int      `json:"id_user"`
	Email                 string   `json:"email"`
	Nom                   *string  `json:"nom"`
	Prenom                *string  `json:"prenom"`
	Nom_entreprise        *string  `json:"nom_entreprise"`
	Telephone_pro         *string  `json:"telephone_pro"`
	Statut_validation     *string  `json:"statut_validation"`
	Is_subscription_valid *bool    `json:"is_subscription_valid"`
	Note_moyenne          *float64 `json:"note_moyenne"`
	Has_profile           bool     `json:"has_profile"`
}

func GetAllProsWithUsers(w http.ResponseWriter, r *http.Request) {
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
			pp.nom,
			pp.prenom,
			pp.nom_entreprise,
			pp.telephone_pro,
			pp.statut_validation,
			pp.is_subscription_valid,
			pp.note_moyenne,
			CASE WHEN pp.id_user IS NOT NULL THEN true ELSE false END as has_profile
		FROM users u
		LEFT JOIN profile_pro pp ON u.id_user = pp.id_user
		WHERE u.role = 'pro'
		ORDER BY u.id_user ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllProsWithUsers - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var pros []ProWithUser
	for rows.Next() {
		var p ProWithUser
		if err := rows.Scan(
			&p.Id_user, &p.Email, &p.Nom, &p.Prenom,
			&p.Nom_entreprise, &p.Telephone_pro,
			&p.Statut_validation, &p.Is_subscription_valid,
			&p.Note_moyenne, &p.Has_profile,
		); err != nil {
			log.Printf("⚠️ GetAllProsWithUsers - Erreur scan: %v", err)
			continue
		}
		pros = append(pros, p)
	}

	if pros == nil {
		pros = []ProWithUser{}
	}

	json.NewEncoder(w).Encode(pros)
}