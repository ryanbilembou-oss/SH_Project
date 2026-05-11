package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateProfilePro(w http.ResponseWriter, r *http.Request) {
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
		Id_user               int     `json:"id_user"`
		Nom                   string  `json:"nom"`
		Prenom                string  `json:"prenom"`
		Nom_entreprise        string  `json:"nom_entreprise"`
		Adresse_pro           string  `json:"adresse_pro"`
		Statut_juridique      string  `json:"statut_juridique"`
		Date_naissance        string  `json:"date_naissance"`
		Genre                 string  `json:"genre"`
		Is_subscription_valid bool    `json:"is_subscription_valid"`
		Siret                 string  `json:"siret"`
		Bio                   string  `json:"bio"`
		Rib                   string  `json:"rib"`
		Telephone_pro         string  `json:"telephone_pro"`
		Commission            float64 `json:"commission"`
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
		`UPDATE profile_pro SET 
			nom = $1, prenom = $2, nom_entreprise = NULLIF($3, ''),
			adresse_pro = NULLIF($4, ''), statut_juridique = NULLIF($5, ''),
			date_naissance = NULLIF($6, '')::DATE, genre = NULLIF($7, ''),
			is_subscription_valid = $8, siret = NULLIF($9, ''),
			bio = NULLIF($10, ''), rib = NULLIF($11, ''),
			telephone_pro = NULLIF($12, ''), commission = $13
		WHERE id_user = $14`,
		req.Nom, req.Prenom, req.Nom_entreprise, req.Adresse_pro,
		req.Statut_juridique, req.Date_naissance, req.Genre,
		req.Is_subscription_valid, req.Siret, req.Bio, req.Rib,
		req.Telephone_pro, req.Commission, req.Id_user,
	)
	if err != nil {
		log.Printf("❌ UpdateProfilePro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Profil pro introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ ProfilePro %d mis à jour", req.Id_user)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}