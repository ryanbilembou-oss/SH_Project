package users

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/pass_hash"
	"time"
)

type RegisterForm struct {
	Email         string `json:"email"`
	Password      string `json:"password"`
	Role          string `json:"role"`
	Nom           string `json:"nom"`
	Prenom        string `json:"prenom"`
	Genre         string `json:"genre"`
	Telephone     string `json:"telephone"`
	DateNaissance string `json:"date_naissance"`
	Adresse       string `json:"adresse"`
	Siret         string `json:"siret"`
	Rib           string `json:"rib"`
	Bio           string `json:"bio"`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var form RegisterForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Printf("❌ JSON Error: %v", err)
		http.Error(w, "Données invalides", http.StatusBadRequest)
		return
	}

	hashedPassword, err := pass_hash.HashPassword(form.Password)
	if err != nil {
		log.Printf("❌ Hash Error: %v", err)
		http.Error(w, "Erreur hachage", http.StatusInternalServerError)
		return
	}

	tx, err := database.DB.Begin()
	if err != nil {
		log.Printf("❌ Transaction Error: %v", err)
		http.Error(w, "Erreur transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	var newID int
	queryUser := `INSERT INTO users (email, password_hash, role, date_inscription) 
                  VALUES ($1, $2, $3, NOW()) RETURNING id_user`

	err = tx.QueryRow(queryUser, form.Email, hashedPassword, form.Role).Scan(&newID)
	if err != nil {
		log.Printf("❌ Auth Error: %v", err)
		http.Error(w, "Email déjà utilisé", http.StatusConflict)
		return
	}

	parsedDate, _ := time.Parse("2006-01-02", form.DateNaissance)

	var errInsert error

	if form.Role == "pro" || form.Role == "prestataire" {
		queryPro := `INSERT INTO profile_pro (id_user, nom, prenom, genre, date_naissance, siret, rib, bio, telephone_pro, statut_validation) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
		_, errInsert = tx.Exec(queryPro, newID, form.Nom, form.Prenom, form.Genre, parsedDate, form.Siret, form.Rib, form.Bio, form.Telephone, "en_attente")
	} else {
		querySenior := `INSERT INTO profile_senior (id_user, nom, prenom, genre, date_naissance, adresse, telephone, is_first_login, is_subscription_valid) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, true, false)`
		_, errInsert = tx.Exec(querySenior, newID, form.Nom, form.Prenom, form.Genre, parsedDate, form.Adresse, form.Telephone)
	}

	if errInsert != nil {
		log.Printf("❌ Profile Insertion Error (%s): %v", form.Role, errInsert)
		http.Error(w, "Erreur création profil", http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		log.Printf("❌ Commit Error: %v", err)
		http.Error(w, "Erreur commit", http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Success: ID %d (%s)", newID, form.Role)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Inscription réussie"})
}