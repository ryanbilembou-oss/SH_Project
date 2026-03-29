package planning_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdatePlanningPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Id_planning  int    `json:"id_planning"`
		Jour_semaine int    `json:"jour_semaine"`
		Heure_debut  string `json:"heure_debut"`
		Heure_fin    string `json:"heure_fin"`
		Est_actif    bool   `json:"est_actif"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_planning == 0 || req.Heure_debut == "" || req.Heure_fin == "" {
		http.Error(w, `{"erreur": "id_planning, heure_debut et heure_fin sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.Jour_semaine < 1 || req.Jour_semaine > 7 {
		http.Error(w, `{"erreur": "jour_semaine doit être entre 1 et 7"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE planning_pro SET jour_semaine = $1, heure_debut = $2, heure_fin = $3, est_actif = $4 WHERE id_planning = $5`,
		req.Jour_semaine, req.Heure_debut, req.Heure_fin, req.Est_actif, req.Id_planning,
	)
	if err != nil {
		log.Printf("❌ UpdatePlanningPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Planning introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ PlanningPro %d mis à jour", req.Id_planning)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}