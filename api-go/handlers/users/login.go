package users

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"
	"silver-happy-api/database"
	"golang.org/x/crypto/bcrypt"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Id_user           int    `json:"id_user"`
	Email             string `json:"email"`
	Role              string `json:"role"`
	Is_first_login    bool   `json:"is_first_login"`
	Statut_validation string `json:"statut_validation"`
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	var storedHash string
	var resp LoginResponse
	err := database.DB.QueryRow(
		`SELECT id_user, email, password_hash, role FROM users WHERE email = $1`, req.Email,
	).Scan(&resp.Id_user, &resp.Email, &storedHash, &resp.Role)

	if err == sql.ErrNoRows {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Utilisateur non trouvé"})
		return
	} else if err != nil {
		log.Printf("Erreur BDD login : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	if err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(req.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Mot de passe incorrect"})
		return
	}

	var estBanni bool
	var banJusquAu *time.Time
	database.DB.QueryRow(
		`SELECT est_banni, ban_jusqu_au FROM users WHERE id_user = $1`,
		resp.Id_user,
	).Scan(&estBanni, &banJusquAu)

	if estBanni {
		if banJusquAu == nil {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "Votre compte a été banni définitivement."})
			return
		}
		if time.Now().Before(*banJusquAu) {
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]string{"error": "Votre compte est suspendu jusqu'au " + banJusquAu.Format("02/01/2006") + "."})
			return
		}
		database.DB.Exec(`UPDATE users SET est_banni = false, ban_jusqu_au = NULL WHERE id_user = $1`, resp.Id_user)
	}

	switch resp.Role {
	case "senior":
		database.DB.QueryRow(
			`SELECT COALESCE(is_first_login, true) FROM profile_senior WHERE id_user = $1`,
			resp.Id_user,
		).Scan(&resp.Is_first_login)
		resp.Statut_validation = "valide"
	case "pro":
		database.DB.QueryRow(
			`SELECT COALESCE(is_first_login, true), COALESCE(statut_validation, 'en_attente') FROM profile_pro WHERE id_user = $1`,
			resp.Id_user,
		).Scan(&resp.Is_first_login, &resp.Statut_validation)
	case "admin":
		resp.Statut_validation = "valide"
	}

	log.Printf("Connexion : %s (%s)", resp.Email, resp.Role)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}