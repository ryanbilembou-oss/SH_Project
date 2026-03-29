package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/pass_hash"
)

type LoginForm struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	// Gestion des CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var credentials LoginForm
	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		log.Printf("❌ Erreur JSON login: %v", err)
		http.Error(w, "Données invalides", http.StatusBadRequest)
		return
	}

	var storedHash string
	var role string
	var prenom string

	// Requête pour récupérer le hash et le prénom (soit senior, soit pro)
	query := `
        SELECT u.password_hash, u.role, COALESCE(s.prenom, p.prenom, 'Utilisateur') as prenom
        FROM users u
        LEFT JOIN profile_senior s ON u.id_user = s.id_user
        LEFT JOIN profile_pro p ON u.id_user = p.id_user
        WHERE u.email = $1`

	err := database.DB.QueryRow(query, credentials.Email).Scan(&storedHash, &role, &prenom)

	if err == sql.ErrNoRows {
		log.Printf("❌ Échec login : Email inconnu (%s)", credentials.Email)
		http.Error(w, "Identifiants incorrects", http.StatusUnauthorized)
		return
	} else if err != nil {
		log.Printf("❌ Erreur SQL login: %v", err)
		http.Error(w, "Erreur serveur", http.StatusInternalServerError)
		return
	}

	// Vérification du mot de passe haché
	if !pass_hash.CheckPasswordHash(credentials.Password, storedHash) {
		log.Printf("❌ Échec login pour %s : Mot de passe incorrect", credentials.Email)
		http.Error(w, "Identifiants incorrects", http.StatusUnauthorized)
		return
	}

	// Succès !
	log.Printf("✅ Connexion réussie : %s (%s)", credentials.Email, role)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Bienvenue chez Silver Happy !",
		"prenom":  prenom,
		"role":    role,
	})
}