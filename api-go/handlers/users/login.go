package users

import (
	"database/sql"
	"fmt"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/pass_hash"
)

func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	email := r.FormValue("email")
	password := r.FormValue("password")

	var storedHash string
	var role string
	var nom string
	var prenom string

	query := `SELECT password, role, nom, prenom FROM utilisateurs WHERE email = $1`
	err := database.DB.QueryRow(query, email).Scan(&storedHash, &role, &nom, &prenom)
	
	if err == sql.ErrNoRows {
		fmt.Printf("DEBUG: L'email [%s] n'existe pas dans la base.\n", email)
		http.Error(w, "Utilisateur non trouvé", http.StatusUnauthorized)
		return
	} else if err != nil {
		fmt.Printf("DEBUG: Erreur SQL technique: %v\n", err)
		http.Error(w, "Erreur base de données", http.StatusInternalServerError)
		return
	}

	if !pass_hash.CheckPasswordHash(password, storedHash) {
		fmt.Printf("DEBUG: Mot de passe incorrect pour %s\n", email)
		http.Error(w, "Mot de passe incorrect", http.StatusUnauthorized)
		return
	}

	fmt.Printf("DEBUG: Connexion réussie pour %s\n", email)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Bienvenue " + prenom))
}