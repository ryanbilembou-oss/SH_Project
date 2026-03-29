package newsletter

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateNewsletter(w http.ResponseWriter, r *http.Request) {
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
		Id_newsletter int    `json:"id_newsletter"`
		Email         string `json:"email"`
		Preferences   string `json:"preferences"`
		Titre         string `json:"titre"`
		Contenu       string `json:"contenu"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_newsletter == 0 || req.Email == "" {
		http.Error(w, `{"erreur": "id_newsletter et email sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE newsletter SET email = $1, preferences = NULLIF($2, ''), titre = NULLIF($3, ''), contenu = NULLIF($4, '') WHERE id_newsletter = $5`,
		req.Email, req.Preferences, req.Titre, req.Contenu, req.Id_newsletter,
	)
	if err != nil {
		log.Printf("❌ UpdateNewsletter - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Newsletter introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Newsletter %d mise à jour", req.Id_newsletter)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}