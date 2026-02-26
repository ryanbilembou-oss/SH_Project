package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"golang.org/x/crypto/bcrypt"
)

type UserRequest struct {
  Email      string `json:"email"`
  Password   string `json:"password_hash"`
  Role       string `json:"role"`
  IsComplete int    `json:"is_profile_completed"`
  Nom        string `json:"nom"`
  Prenom     string `json:"prenom"`
  Genre      string `json:"genre"`
  DateNaissance string `json:"date_naissance"`
  Telephone     string `json:"telephone"`
  NomSociete   string `json:"nom_societe"`   // Vérifie que le JS envoie bien "nom_societe"
  Siret        string `json:"siret"`
  Rib          string `json:"rib"`
  Bio          string `json:"bio"`
  TelephonePro string `json:"telephone_pro"`
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
		log.Printf("❌ Erreur décodage JSON: %v", err)
		http.Error(w, "Données invalides", http.StatusBadRequest)
		return
	}

	// 1. Hachage sécurisé
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		http.Error(w, "Erreur hachage", http.StatusInternalServerError)
		return
	}

	// 2. Début de la Transaction SQL (Sécurité "Tout ou rien")
	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, "Erreur base de données", http.StatusInternalServerError)
		return
	}

	// 3. Insertion dans 'users'
	queryUser := "INSERT INTO users (email, password_hash, role, date_inscription) VALUES (?, ?, ?, NOW())"
	res, err := tx.Exec(queryUser, req.Email, string(hash), req.Role)
	if err != nil {
		tx.Rollback()
		log.Printf("❌ Erreur SQL Users: %v", err)
		http.Error(w, "Email déjà utilisé", http.StatusConflict)
		return
	}

	lastID, _ := res.LastInsertId()

	// 4. Insertion dans le profil correspondant si demandé
	if req.IsComplete == 1 {
		var errProfile error

		switch req.Role {
		case "senior":
			query := "INSERT INTO profiles_senior (id_user, nom, prenom, genre, date_naissance, telephone, is_first_login, is_subscription_valid) VALUES (?, ?, ?, ?, ?, ?, 1, 0)"
			_, errProfile = tx.Exec(query, lastID, req.Nom, req.Prenom, req.Genre, req.DateNaissance, req.Telephone)

		case "pro":
			query := "INSERT INTO profiles_pro (id_user, nom_societe, genre, siret, bio, rib, telephone_pro, statut_validation, is_subscription_valid, note_moyenne) VALUES (?, ?, ?, ?, ?, ?, ?, 'en_attente', 0, 0.0)"
			_, errProfile = tx.Exec(query, lastID, req.NomSociete, req.Genre, req.Siret, req.Bio, req.Rib, req.TelephonePro)

		case "admin":
			query := "INSERT INTO profiles_admin (id_user, nom, prenom, genre) VALUES (?, ?, ?, ?)"
			_, errProfile = tx.Exec(query, lastID, req.Nom, req.Prenom, req.Genre)
		}

		if errProfile != nil {
			tx.Rollback()
			log.Printf("❌ Erreur SQL Profil (%s): %v", req.Role, errProfile)
			http.Error(w, "Erreur lors de la création du profil (Vérifiez le SIRET)", http.StatusInternalServerError)
			return
		}
	}

	// 5. Validation de la transaction
	if err := tx.Commit(); err != nil {
		http.Error(w, "Erreur lors de la validation", http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Succès : Utilisateur %d [%s] créé.", lastID, req.Role)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}