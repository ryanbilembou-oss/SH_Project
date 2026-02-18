package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Autorise tout le monde (pour le dev)
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	query := "SELECT id_user, email, role, date_inscription FROM users"
	
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("Erreur SQL Admin: %v", err)
		http.Error(w, "Erreur base de données", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		err := rows.Scan(&u.Id_user, &u.Email, &u.Role, &u.Date_inscription)
		if err != nil {
			log.Printf("Erreur Scan: %v", err)
			continue
		}
		users = append(users, u)
	}

	if users == nil {
		users = []models.Users{} 
	}
	
	json.NewEncoder(w).Encode(users)
}