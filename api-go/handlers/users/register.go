package users

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
	"silver-happy-api/pass_hash"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
    // Configuration CORS
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    // 1. Décodage du JSON envoyé par le Front-end
    var u models.Users
    if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
        log.Printf("Erreur décodage : %v", err)
        http.Error(w, "Données JSON invalides", http.StatusBadRequest)
        return
    }

    // 2. Hachage du mot de passe
    hashedPassword, err := pass_hash.HashPassword(u.Password_hash)
    if err != nil {
        http.Error(w, "Erreur de hachage", http.StatusInternalServerError)
        return
    }

    // 3. Requête SQL (Syntaxe Postgres avec $1, $2...)
    // Attention : J'utilise les champs de base de ton modèle Users
    query := `INSERT INTO users (email, password_hash, role, date_inscription) 
              VALUES ($1, $2, $3, NOW())`
    
    _, err = database.DB.Exec(query, u.Email, hashedPassword, u.Role)

    if err != nil {
        log.Printf("Erreur insertion BDD : %v", err)
        http.Error(w, "Erreur lors de l'inscription (Email peut-être déjà utilisé)", http.StatusConflict)
        return
    }

    // 4. Réponse de succès
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "Inscription réussie"})
}