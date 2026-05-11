package planning_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetPlanningSenior(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var p models.PlanningSenior
	err := database.DB.QueryRow(
		`SELECT id_agenda, id_senior, id_intervention, rappel_notification, note_perso FROM planning_senior WHERE id_agenda = $1`, id,
	).Scan(&p.Id_agenda, &p.Id_senior, &p.Id_intervention, &p.Rappel_notification, &p.Note_perso)
	if err != nil {
		log.Printf("❌ GetPlanningSenior - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Planning introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(p)
}