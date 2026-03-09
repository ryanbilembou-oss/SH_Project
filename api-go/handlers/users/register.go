package users

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
	"silver-happy-api/pass_hash"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var u models.Users
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Données invalides", http.StatusBadRequest)
		return
	}


	hashedPassword, err := pass_hash.HashPassword(u.Password_hash)
	if err != nil {
		http.Error(w, "Erreur de hachage", http.StatusInternalServerError)
		return
	}

	query := "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)"
	_, err = database.DB.Exec(query, u.Email, hashedPassword, u.Role)
	if err != nil {
		http.Error(w, "Erreur lors de la création en base", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Utilisateur créé avec succès !"})
}