package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"

	"golang.org/x/crypto/bcrypt"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	
	if r.Method != http.MethodPost {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	
	var u models.Users
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		log.Printf("Erreur décodage JSON: %v", err)
		http.Error(w, "Données invalides", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password_hash), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Erreur hachage: %v", err)
		http.Error(w, "Erreur interne du serveur", http.StatusInternalServerError)
		return
	}

	query := "INSERT INTO users (email, password_hash, role, date_inscription) VALUES (?, ?, ?, NOW())"
	_, err = database.DB.Exec(query, u.Email, string(hashedPassword), u.Role)
	
	if err != nil {
		log.Printf("Erreur SQL insertion: %v", err)
		http.Error(w, "Impossible de créer l'utilisateur (email peut-être déjà utilisé)", http.StatusConflict)
		return
	}

	log.Printf("Utilisateur %s créé par l'administrateur", u.Email)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Utilisateur créé avec succès",
	})
}