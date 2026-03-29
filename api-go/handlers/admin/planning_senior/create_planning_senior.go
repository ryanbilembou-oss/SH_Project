package planning_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type PlanningSeniorRequest struct {
	Id_senior           int    `json:"id_senior"`
	Id_intervention     int    `json:"id_intervention"`
	Rappel_notification string `json:"rappel_notification"`
	Note_perso          string `json:"note_perso"`
}

func CreatePlanningSenior(w http.ResponseWriter, r *http.Request) {
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

	var req PlanningSeniorRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_senior == 0 {
		http.Error(w, `{"erreur": "id_senior est obligatoire"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO planning_senior (id_senior, id_intervention, rappel_notification, note_perso) 
		VALUES ($1, NULLIF($2, 0), NULLIF($3, '')::TIMESTAMPTZ, NULLIF($4, ''))`,
		req.Id_senior, req.Id_intervention, req.Rappel_notification, req.Note_perso,
	)
	if err != nil {
		log.Printf("❌ CreatePlanningSenior - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ PlanningSenior créé pour senior %d", req.Id_senior)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}