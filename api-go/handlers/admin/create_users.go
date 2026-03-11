package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"strings"

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

    hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        sendError(w, "global", "Erreur de hachage", http.StatusInternalServerError)
        return
    }

    tx, err := database.DB.Begin()
    if err != nil {
        log.Printf("Erreur Transaction: %v", err)
        sendError(w, "global", "Erreur serveur (DB)", http.StatusInternalServerError)
        return
    }

    var lastID int
    queryUser := "INSERT INTO users (email, password_hash, role, date_inscription) VALUES ($1, $2, $3, NOW()) RETURNING id_user"
    err = tx.QueryRow(queryUser, req.Email, string(hash), req.Role).Scan(&lastID)
    
    if err != nil {
        tx.Rollback()
        if strings.Contains(err.Error(), "unique") {
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
            log.Printf("Erreur Profil: %v", errProfile)
            sendError(w, "global", "Erreur technique sur le profil.", http.StatusInternalServerError)
            return
        }
    }

    tx.Commit()
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"status": "success", "message": "Utilisateur créé"})
}