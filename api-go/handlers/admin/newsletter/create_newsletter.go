package newsletter

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type NewsletterRequest struct {
	Email       string `json:"email"`
	Id_user     int    `json:"id_user"`
	Preferences string `json:"preferences"`
	Titre       string `json:"titre"`
	Contenu     string `json:"contenu"`
}

func CreateNewsletter(w http.ResponseWriter, r *http.Request) {
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

	var req NewsletterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Email == "" {
		http.Error(w, `{"erreur": "email est obligatoire"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO newsletter (email, date_inscription, id_user, preferences, titre, contenu) 
		VALUES ($1, NOW(), NULLIF($2, 0), NULLIF($3, ''), NULLIF($4, ''), NULLIF($5, ''))`,
		req.Email, req.Id_user, req.Preferences, req.Titre, req.Contenu,
	)
	if err != nil {
		log.Printf("❌ CreateNewsletter - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Newsletter créée pour %s", req.Email)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}