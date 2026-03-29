package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllLitiges(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_litige, id_intervention, motif, statut, date_ouverture FROM litiges`)
	if err != nil {
		log.Printf("❌ GetAllLitiges - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var litiges []models.Litiges
	for rows.Next() {
		var l models.Litiges
		if err := rows.Scan(&l.Id_litige, &l.Id_intervention, &l.Motif, &l.Statut, &l.Date_ouverture); err != nil {
			log.Printf("⚠️ GetAllLitiges - Erreur scan: %v", err)
			continue
		}
		litiges = append(litiges, l)
	}

	if litiges == nil {
		litiges = []models.Litiges{}
	}

	json.NewEncoder(w).Encode(litiges)
}