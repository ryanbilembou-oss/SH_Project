package profile_admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CreateProfileAdminRequest struct {
	Id_user   int    `json:"id_user"`
	Nom       string `json:"nom"`
	Prenom    string `json:"prenom"`
	Genre     string `json:"genre"`
	Telephone string `json:"telephone"`
}

func CreateProfileAdmin(w http.ResponseWriter, r *http.Request) {
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

	var req CreateProfileAdminRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Nom == "" || req.Prenom == "" {
		http.Error(w, `{"erreur": "id_user, nom et prenom sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	query := `INSERT INTO profile_admin (id_user, nom, prenom, genre, telephone) VALUES ($1, $2, $3, NULLIF($4,''), NULLIF($5,''))`
	_, err := database.DB.Exec(query, req.Id_user, req.Nom, req.Prenom, req.Genre, req.Telephone)
	if err != nil {
		log.Printf("❌ CreateProfileAdmin - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ ProfileAdmin créé pour user %d", req.Id_user)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}