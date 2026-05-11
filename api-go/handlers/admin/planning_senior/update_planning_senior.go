package planning_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdatePlanningSenior(w http.ResponseWriter, r *http.Request) {
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
		Id_agenda           int    `json:"id_agenda"`
		Id_intervention     int    `json:"id_intervention"`
		Rappel_notification string `json:"rappel_notification"`
		Note_perso          string `json:"note_perso"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_agenda == 0 {
		http.Error(w, `{"erreur": "id_agenda est obligatoire"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE planning_senior SET id_intervention = NULLIF($1, 0), rappel_notification = NULLIF($2, '')::TIMESTAMPTZ, note_perso = NULLIF($3, '') WHERE id_agenda = $4`,
		req.Id_intervention, req.Rappel_notification, req.Note_perso, req.Id_agenda,
	)
	if err != nil {
		log.Printf("❌ UpdatePlanningSenior - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Planning introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ PlanningSenior %d mis à jour", req.Id_agenda)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}