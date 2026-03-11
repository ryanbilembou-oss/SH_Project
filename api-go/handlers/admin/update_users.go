package admin

import (
	"crypto/rand"
	"encoding/json"
	"log"
	"math/big"
	"net/http"
	"silver-happy-api/database"
	"golang.org/x/crypto/bcrypt"
)


type UpdateRequest struct {
	Id_user       int    `json:"id_user"`
	Email         string `json:"email"`
	Role          string `json:"role"`
	ResetPassword bool   `json:"reset_password"`
}

func generateRandomPassword() string {
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
	var password string
	for i := 0; i < 12; i++ {
		num, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		password += string(chars[num.Int64()])
	}
	return password
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req UpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur":"JSON invalide"}`, http.StatusBadRequest)
		return
	}

	var newRawPassword string
	var err error

	if req.ResetPassword {
		newRawPassword = generateRandomPassword()
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(newRawPassword), bcrypt.DefaultCost)
		query := "UPDATE users SET email = $1, password_hash = $2 WHERE id_user = $3"
		_, err = database.DB.Exec(query, req.Email, string(hashedPassword), req.Id_user)
	} else {
		query := "UPDATE users SET email = $1 WHERE id_user = $2"
		_, err = database.DB.Exec(query, req.Email, req.Id_user)
	}

	if err != nil {
		log.Printf("❌ Erreur SQL Update: %v", err)
		http.Error(w, `{"erreur":"Erreur base de données"}`, http.StatusInternalServerError)
		return
	}

	resp := map[string]string{"message": "Mise à jour réussie"}
	if newRawPassword != "" {
		resp["new_password"] = newRawPassword
	}
	json.NewEncoder(w).Encode(resp)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")


    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, `{"erreur":"ID manquant"}`, http.StatusBadRequest)
        return
    }


    var u struct {
        Id_user int    `json:"id_user"`
        Email   string `json:"email"`
        Role    string `json:"role"`
    }


    query := "SELECT id_user, email, role FROM users WHERE id_user = $1"
    err := database.DB.QueryRow(query, id).Scan(&u.Id_user, &u.Email, &u.Role)

    if err != nil {
        log.Printf("❌ GetUser - ID %s introuvable: %v", id, err)
        http.Error(w, `{"erreur":"Utilisateur introuvable"}`, http.StatusNotFound)
        return
    }

    json.NewEncoder(w).Encode(u)
}