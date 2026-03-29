package planning_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllPlanningPro(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif FROM planning_pro`)
	if err != nil {
		log.Printf("❌ GetAllPlanningPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var plannings []models.PlanningPro
	for rows.Next() {
		var p models.PlanningPro
		if err := rows.Scan(&p.Id_planning, &p.Id_pro, &p.Jour_semaine, &p.Heure_debut, &p.Heure_fin, &p.Est_actif); err != nil {
			log.Printf("⚠️ GetAllPlanningPro - Erreur scan: %v", err)
			continue
		}
		plannings = append(plannings, p)
	}

	if plannings == nil {
		plannings = []models.PlanningPro{}
	}

	json.NewEncoder(w).Encode(plannings)
}