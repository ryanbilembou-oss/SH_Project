package newsletter

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetNewsletter(w http.ResponseWriter, r *http.Request) {
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

	var n models.Newsletter
	err := database.DB.QueryRow(
		`SELECT id_newsletter, email, date_inscription, id_user, preferences, titre, contenu FROM newsletter WHERE id_newsletter = $1`, id,
	).Scan(&n.Id_newsletter, &n.Email, &n.Date_inscription, &n.Id_user, &n.Preferences, &n.Titre, &n.Contenu)
	if err != nil {
		log.Printf("❌ GetNewsletter - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Newsletter introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(n)
}