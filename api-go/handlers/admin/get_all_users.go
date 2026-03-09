package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") 
	// 1. Headers globaux (CORS + Type de contenu)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json") // Indispensable pour du JSON

	// 2. Gestion du Preflight CORS (Naviguateur)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 3. Sécurité de la méthode
	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	query := "SELECT id_user, email, role, date_inscription FROM users"
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ Erreur SQL Admin: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		err := rows.Scan(&u.Id_user, &u.Email, &u.Role, &u.Date_inscription)
		if err != nil {
			log.Printf("⚠️ Erreur Scan sur un user: %v", err)
			continue
		}
		users = append(users, u)
	}

	if users == nil {
		users = []models.Users{}
	}

	json.NewEncoder(w).Encode(users)
}