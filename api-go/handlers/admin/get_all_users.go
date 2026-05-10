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
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	rows, err := database.DB.Query("SELECT id_user, email, role, date_inscription, est_banni, ban_jusqu_au, ban_raison FROM users")
	if err != nil {
		log.Printf("Erreur SQL Admin: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []models.Users
	for rows.Next() {
		var u models.Users
		err := rows.Scan(&u.Id_user, &u.Email, &u.Role, &u.Date_inscription, &u.Est_banni, &u.Ban_jusqu_au, &u.Ban_raison)
		if err != nil {
			log.Printf("Erreur Scan user: %v", err)
			continue
		}
		users = append(users, u)
	}

	if users == nil {
		users = []models.Users{}
	}

	json.NewEncoder(w).Encode(users)
}