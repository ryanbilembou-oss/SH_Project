package admin

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
	"golang.org/x/crypto/bcrypt"
)

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	var u models.Users
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "JSON invalide", http.StatusBadRequest)
		return
	}

	if u.Password_hash != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password_hash), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Erreur hachage", http.StatusInternalServerError)
			return
		}
		
		query := "UPDATE users SET email = ?, role = ?, password_hash = ? WHERE id_user = ?"
		_, err = database.DB.Exec(query, u.Email, u.Role, string(hashedPassword), u.Id_user)
		if err != nil {
			http.Error(w, "Erreur SQL avec mot de passe", http.StatusInternalServerError)
			return
		}
	} else {
		query := "UPDATE users SET email = ?, role = ? WHERE id_user = ?"
		_, err := database.DB.Exec(query, u.Email, u.Role, u.Id_user)
		if err != nil {
			http.Error(w, "Erreur SQL sans mot de passe", http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Utilisateur mis à jour avec succès"})
}
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	
	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "ID manquant", http.StatusBadRequest)
		return
	}

	var u models.Users
	
	query := "SELECT id_user, email, role FROM users WHERE id_user = ?"
	err := database.DB.QueryRow(query, idStr).Scan(&u.Id_user, &u.Email, &u.Role)

	if err != nil {
		http.Error(w, "Utilisateur introuvable", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(u)
}