package users

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"strings"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Email          string `json:"email"`
	Password       string `json:"password"`
	Role           string `json:"role"`
	Nom            string `json:"nom"`
	Prenom         string `json:"prenom"`
	Genre          string `json:"genre"`
	Telephone      string `json:"telephone"`
	DateNaissance  string `json:"date_naissance"`
	Adresse        string `json:"adresse"`
	Siret          string `json:"siret"`
	Bio            string `json:"bio"`
	NomEntreprise  string `json:"nom_entreprise"`
	AdressePro     string `json:"adresse_pro"`
	StatutJuridique string `json:"statut_juridique"`
	TelephonePro   string `json:"telephone_pro"`
}

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"error": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error": "Données invalides"}`, http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" || req.Role == "" {
		http.Error(w, `{"error": "Email, mot de passe et rôle sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		http.Error(w, `{"error": "Erreur de hachage"}`, http.StatusInternalServerError)
		return
	}

	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, `{"error": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	var lastID int
	err = tx.QueryRow(
		`INSERT INTO users (email, password_hash, role, date_inscription) VALUES ($1, $2, $3, NOW()) RETURNING id_user`,
		req.Email, string(hash), req.Role,
	).Scan(&lastID)

	if err != nil {
		tx.Rollback()
		if strings.Contains(err.Error(), "users_email_key") {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]string{"error": "Cet email est déjà utilisé."})
		} else {
			log.Printf("❌ RegisterUser - Erreur SQL: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(map[string]string{"error": "Erreur lors de la création du compte."})
		}
		return
	}

	var errProfile error
	switch req.Role {
	case "senior":
		_, errProfile = tx.Exec(
			`INSERT INTO profile_senior (id_user, nom, prenom, genre, telephone, date_naissance, adresse, is_first_login)
			 VALUES ($1, $2, $3, $4, $5, NULLIF($6, '')::DATE, $7, true)`,
			lastID, req.Nom, req.Prenom, req.Genre, req.Telephone, req.DateNaissance, req.Adresse,
		)
	case "pro":
		_, errProfile = tx.Exec(
			`INSERT INTO profile_pro (id_user, nom, prenom, genre, telephone_pro, date_naissance, siret, bio, nom_entreprise, adresse_pro, statut_juridique, statut_validation, is_first_login)
			 VALUES ($1, $2, $3, $4, $5, NULLIF($6, '')::DATE, NULLIF($7, ''), NULLIF($8, ''), NULLIF($9, ''), NULLIF($10, ''), NULLIF($11, ''), 'en_attente', true)`,
			lastID, req.Nom, req.Prenom, req.Genre, req.TelephonePro, req.DateNaissance,
			req.Siret, req.Bio, req.NomEntreprise, req.AdressePro, req.StatutJuridique,
		)
	}

	if errProfile != nil {
		tx.Rollback()
		log.Printf("❌ RegisterUser - Erreur profil: %v", errProfile)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur lors de la création du profil."})
		return
	}

	tx.Commit()
	log.Printf("✅ Nouvel utilisateur : %s (%s) id=%d", req.Email, req.Role, lastID)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Compte créé avec succès !",
		"id_user": lastID,
		"role":    req.Role,
	})
}