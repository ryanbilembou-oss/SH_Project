package planning_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func GetPlanningPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var p PlanningProDisplay
	err := database.DB.QueryRow(`
		SELECT id_planning, id_pro, jour_semaine, heure_debut, heure_fin, est_actif,
		COALESCE(duree_intervention, 60), COALESCE(pause_entre, 0)
		FROM planning_pro WHERE id_planning = $1
	`, id).Scan(&p.Id_planning, &p.Id_pro, &p.Jour_semaine, &p.Heure_debut, &p.Heure_fin, &p.Est_actif, &p.Duree_intervention, &p.Pause_entre)
	if err != nil {
		log.Printf("GetPlanningPro %s: %v", id, err)
		http.Error(w, `{"erreur": "Planning introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(p)
}