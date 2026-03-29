package planning_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type PlanningProRequest struct {
	Id_pro       int    `json:"id_pro"`
	Jour_semaine int    `json:"jour_semaine"`
	Heure_debut  string `json:"heure_debut"`
	Heure_fin    string `json:"heure_fin"`
	Est_actif    bool   `json:"est_actif"`
}

func CreatePlanningPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req PlanningProRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_pro == 0 || req.Heure_debut == "" || req.Heure_fin == "" {
		http.Error(w, `{"erreur": "id_pro, heure_debut et heure_fin sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.Jour_semaine < 1 || req.Jour_semaine > 7 {
		http.Error(w, `{"erreur": "jour_semaine doit être entre 1 et 7"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO planning_pro (id_pro, jour_semaine, heure_debut, heure_fin, est_actif) VALUES ($1, $2, $3, $4, $5)`,
		req.Id_pro, req.Jour_semaine, req.Heure_debut, req.Heure_fin, req.Est_actif,
	)
	if err != nil {
		log.Printf("❌ CreatePlanningPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ PlanningPro créé pour pro %d", req.Id_pro)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}