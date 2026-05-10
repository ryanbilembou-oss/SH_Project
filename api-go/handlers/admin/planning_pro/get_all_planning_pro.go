package planning_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type PlanningProDisplay struct {
	Id_planning         int     `json:"id_planning"`
	Id_pro              int     `json:"id_pro"`
	Jour_semaine        *int    `json:"jour_semaine"`
	Heure_debut         string  `json:"heure_debut"`
	Heure_fin           string  `json:"heure_fin"`
	Est_actif           bool    `json:"est_actif"`
	Duree_intervention  int     `json:"duree_intervention"`
	Pause_entre         int     `json:"pause_entre"`
}

func GetAllPlanningPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	rows, err := database.DB.Query(`
		SELECT id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif,
		COALESCE(duree_intervention, 60), COALESCE(pause_entre, 0)
		FROM planning_pro
	`)
	if err != nil {
		log.Printf("GetAllPlanningPro error: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var plannings []PlanningProDisplay
	for rows.Next() {
		var p PlanningProDisplay
		if err := rows.Scan(&p.Id_planning, &p.Id_pro, &p.Jour_semaine, &p.Heure_debut, &p.Heure_fin, &p.Est_actif, &p.Duree_intervention, &p.Pause_entre); err != nil {
			log.Printf("scan error: %v", err)
			continue
		}
		plannings = append(plannings, p)
	}

	if plannings == nil { plannings = []PlanningProDisplay{} }
	json.NewEncoder(w).Encode(plannings)
}