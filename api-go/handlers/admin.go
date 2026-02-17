package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

// GetAllUsers récupère la liste simplifiée des utilisateurs pour le dashboard admin
func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Autorise tout le monde (pour le dev)
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// On vérifie que c'est bien une requête GET
	if r.Method != http.MethodGet {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	// 2. La requête SQL ciblée (Pas de SELECT *)
	query := "SELECT id_user, email, role, date_inscription FROM users"
	
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("Erreur SQL Admin: %v", err)
		http.Error(w, "Erreur base de données", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// 3. Boucle sur les résultats
	var users []models.Users
	for rows.Next() {
		var u models.Users
		// On scanne uniquement les colonnes demandées dans la query
		err := rows.Scan(&u.Id_user, &u.Email, &u.Role, &u.Date_inscription)
		if err != nil {
			log.Printf("Erreur Scan: %v", err)
			continue
		}
		users = append(users, u)
	}

	// 4. Envoi de la réponse
	if users == nil {
		users = []models.Users{} // On renvoie un tableau vide [] au lieu de null
	}
	
	json.NewEncoder(w).Encode(users)
}