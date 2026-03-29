package newsletter

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllNewsletter(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_newsletter, email, date_inscription, id_user, preferences, titre, contenu FROM newsletter`)
	if err != nil {
		log.Printf("❌ GetAllNewsletter - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var newsletters []models.Newsletter
	for rows.Next() {
		var n models.Newsletter
		if err := rows.Scan(&n.Id_newsletter, &n.Email, &n.Date_inscription, &n.Id_user, &n.Preferences, &n.Titre, &n.Contenu); err != nil {
			log.Printf("⚠️ GetAllNewsletter - Erreur scan: %v", err)
			continue
		}
		newsletters = append(newsletters, n)
	}

	if newsletters == nil {
		newsletters = []models.Newsletter{}
	}

	json.NewEncoder(w).Encode(newsletters)
}