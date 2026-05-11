package profile_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateProfileSenior(w http.ResponseWriter, r *http.Request) {
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
		Id_user               int    `json:"id_user"`
		Nom                   string `json:"nom"`
		Prenom                string `json:"prenom"`
		Genre                 string `json:"genre"`
		Date_naissance        string `json:"date_naissance"`
		Is_subscription_valid bool   `json:"is_subscription_valid"`
		Adresse               string `json:"adresse"`
		Telephone             string `json:"telephone"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Nom == "" || req.Prenom == "" {
		http.Error(w, `{"erreur": "id_user, nom et prenom sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE profile_senior SET nom = $1, prenom = $2, genre = NULLIF($3, ''), date_naissance = NULLIF($4, '')::DATE, is_subscription_valid = $5, adresse = NULLIF($6, ''), telephone = NULLIF($7, '') WHERE id_user = $8`,
		req.Nom, req.Prenom, req.Genre, req.Date_naissance, req.Is_subscription_valid, req.Adresse, req.Telephone, req.Id_user,
	)
	if err != nil {
		log.Printf("❌ UpdateProfileSenior - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Profil senior introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ ProfileSenior %d mis à jour", req.Id_user)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}