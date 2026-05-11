package planning_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllPlanningSenior(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_agenda, id_senior, id_intervention, rappel_notification, note_perso FROM planning_senior`)
	if err != nil {
		log.Printf("❌ GetAllPlanningSenior - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var plannings []models.PlanningSenior
	for rows.Next() {
		var p models.PlanningSenior
		if err := rows.Scan(&p.Id_agenda, &p.Id_senior, &p.Id_intervention, &p.Rappel_notification, &p.Note_perso); err != nil {
			log.Printf("⚠️ GetAllPlanningSenior - Erreur scan: %v", err)
			continue
		}
		plannings = append(plannings, p)
	}

	if plannings == nil {
		plannings = []models.PlanningSenior{}
	}

	json.NewEncoder(w).Encode(plannings)
}