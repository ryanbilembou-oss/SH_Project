package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CreateProfileProRequest struct {
	Id_user          int     `json:"id_user"`
	Nom              string  `json:"nom"`
	Prenom           string  `json:"prenom"`
	Nom_entreprise   string  `json:"nom_entreprise"`
	Adresse_pro      string  `json:"adresse_pro"`
	Statut_juridique string  `json:"statut_juridique"`
	Date_naissance   string  `json:"date_naissance"`
	Genre            string  `json:"genre"`
	Siret            string  `json:"siret"`
	Bio              string  `json:"bio"`
	Rib              string  `json:"rib"`
	Telephone_pro    string  `json:"telephone_pro"`
	Commission       float64 `json:"commission"`
}

func CreateProfilePro(w http.ResponseWriter, r *http.Request) {
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

	var req CreateProfileProRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Nom == "" || req.Prenom == "" {
		http.Error(w, `{"erreur": "id_user, nom et prenom sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.Commission == 0 {
		req.Commission = 15.00
	}

	query := `INSERT INTO profile_pro (id_user, nom, prenom, nom_entreprise, adresse_pro, statut_juridique, date_naissance, genre, siret, bio, rib, telephone_pro, commission)
		VALUES ($1, $2, $3, NULLIF($4,''), NULLIF($5,''), NULLIF($6,''), NULLIF($7,'')::DATE, NULLIF($8,''), NULLIF($9,''), NULLIF($10,''), NULLIF($11,''), NULLIF($12,''), $13)`
	_, err := database.DB.Exec(query, req.Id_user, req.Nom, req.Prenom, req.Nom_entreprise, req.Adresse_pro, req.Statut_juridique, req.Date_naissance, req.Genre, req.Siret, req.Bio, req.Rib, req.Telephone_pro, req.Commission)
	if err != nil {
		log.Printf("❌ CreateProfilePro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ ProfilePro créé pour user %d", req.Id_user)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}