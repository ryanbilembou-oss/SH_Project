package admin

import (
	"encoding/json"
	"net/http"
	"strings"
	"silver-happy-api/database"
	"silver-happy-api/models"

	"golang.org/x/crypto/bcrypt"
)

type UserRequest struct {
	Email         string `json:"email"`
	Password      string `json:"password_hash"`
	Role          string `json:"role"`
	IsComplete    int    `json:"is_profile_completed"`
	Nom           string `json:"nom"`
	Prenom        string `json:"prenom"`
	Genre         string `json:"genre"`
	DateNaissance string `json:"date_naissance"`
	Telephone     string `json:"telephone"`
	NomSociete    string `json:"nom_societe"`
	AdressePro    string `json:"adresse_pro"`
	Siret         string `json:"siret"`
	Rib           string `json:"rib"`
	Bio           string `json:"bio"`
	TelephonePro  string `json:"telephone_pro"`
}

type ErrorResponse struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func sendError(w http.ResponseWriter, field string, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Field: field, Message: msg})
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req UserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide", http.StatusBadRequest)
		return
	}

	hash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 10)

	tx, err := database.DB.Begin()
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
		sendError(w, "global", "Erreur serveur (DB)", http.StatusInternalServerError)
		return
	}

	var lastID int
	queryUser := "INSERT INTO users (email, password_hash, role, date_inscription) VALUES ($1, $2, $3, NOW()) RETURNING id_user"
	err = tx.QueryRow(queryUser, req.Email, string(hash), req.Role).Scan(&lastID)
	
	if err != nil {
		tx.Rollback()
		if strings.Contains(err.Error(), "unique_email") || strings.Contains(err.Error(), "users_email_key") {
			sendError(w, "email", "Cet email est déjà utilisé.", http.StatusConflict)
		} else {
			sendError(w, "global", "Erreur lors de la création du compte.", http.StatusInternalServerError)
		}
		return
	}

	if req.IsComplete == 1 {
		var errProfile error
		switch req.Role {
		case "senior":
			query := `INSERT INTO profile_senior (id_user, nom, prenom, genre, date_naissance, telephone) VALUES ($1, $2, $3, $4, NULLIF($5, '')::DATE, $6)`
			_, errProfile = tx.Exec(query, lastID, req.Nom, req.Prenom, req.Genre, req.DateNaissance, req.Telephone)
		case "pro":
			query := `INSERT INTO profile_pro (id_user, nom, prenom, nom_entreprise, adresse_pro, date_naissance, genre, siret, bio, rib, telephone_pro) VALUES ($1, $2, $3, $4, $5, NULLIF($6, '')::DATE, $7, $8, $9, $10, $11)`
			_, errProfile = tx.Exec(query, lastID, req.Nom, req.Prenom, req.NomSociete, req.AdressePro, req.DateNaissance, req.Genre, req.Siret, req.Bio, req.Rib, req.TelephonePro)
		case "admin":
			query := "INSERT INTO profile_admin (id_user, nom, prenom, genre) VALUES ($1, $2, $3, $4)"
			_, errProfile = tx.Exec(query, lastID, req.Nom, req.Prenom, req.Genre)
		}

		if errProfile != nil {
			tx.Rollback()
			if strings.Contains(errProfile.Error(), "siret") {
				sendError(w, "siret", "Ce numéro SIRET existe déjà.", http.StatusConflict)
			} else {
				sendError(w, "global", "Erreur technique sur le profil.", http.StatusInternalServerError)
			}
			return
		}
	}

	tx.Commit()
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}