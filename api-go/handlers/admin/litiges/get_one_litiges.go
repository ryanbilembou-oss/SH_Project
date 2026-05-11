package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetLitige(w http.ResponseWriter, r *http.Request) {
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

	var l models.Litiges
	err := database.DB.QueryRow(
		`SELECT id_litige, id_intervention, motif, statut, date_ouverture FROM litiges WHERE id_litige = $1`, id,
	).Scan(&l.Id_litige, &l.Id_intervention, &l.Motif, &l.Statut, &l.Date_ouverture)
	if err != nil {
		log.Printf("❌ GetLitige - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Litige introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(l)
}