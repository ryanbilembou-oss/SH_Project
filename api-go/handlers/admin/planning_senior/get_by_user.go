package planning_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type PlanningSeniorDisplay struct {
	Id_agenda           int     `json:"id_agenda"`
	Id_senior           int     `json:"id_senior"`
	Id_intervention     *int    `json:"id_intervention"`
	NomService          *string `json:"nom_service"`
	NomPro              *string `json:"nom_pro"`
	PrenomPro           *string `json:"prenom_pro"`
	Date_debut          *string `json:"date_debut"`
	Date_fin            *string `json:"date_fin"`
	Rappel_notification *string `json:"rappel_notification"`
	Note_perso          *string `json:"note_perso"`
}

func GetPlanningSeniorByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	idSenior := r.URL.Query().Get("id")
	if idSenior == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	query := `
			SELECT 
					ps.id_agenda, ps.id_senior,
					ps.id_intervention,
					sv.nom,
					pp.nom, pp.prenom,
					i.date_heure_debut::text, i.date_heure_fin::text,
					ps.rappel_notification::text,
					ps.note_perso
			FROM planning_senior ps
			LEFT JOIN intervention i ON ps.id_intervention = i.id
			LEFT JOIN service sv ON i.id_service = sv.id
			LEFT JOIN profile_pro pp ON i.id_pro = pp.id_user
			WHERE ps.id_senior = $1
			ORDER BY i.date_heure_debut ASC
	`

	rows, err := database.DB.Query(query, idSenior)
	if err != nil {
		log.Printf("❌ GetPlanningSeniorByUser - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	plannings := []PlanningSeniorDisplay{}
	for rows.Next() {
		var p PlanningSeniorDisplay
		if err := rows.Scan(
			&p.Id_agenda, &p.Id_senior,
			&p.Id_intervention,
			&p.NomService,
			&p.NomPro, &p.PrenomPro,
			&p.Date_debut, &p.Date_fin,
			&p.Rappel_notification,
			&p.Note_perso,
		); err != nil {
			log.Printf("⚠️ GetPlanningSeniorByUser - Erreur scan: %v", err)
			continue
		}
		plannings = append(plannings, p)
	}

	if plannings == nil {
		plannings = []PlanningSeniorDisplay{}
	}

	json.NewEncoder(w).Encode(plannings)
}