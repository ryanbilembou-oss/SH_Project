package users

import (
  "database/sql"
  "encoding/json"
  "net/http"
  "silver-happy-api/database"
  "silver-happy-api/models"
  "golang.org/x/crypto/bcrypt"
)

func LoginUser(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

  if r.Method == "OPTIONS" {
    return
  }

  if r.Method != http.MethodPost {
    http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
    return
  }

  var u models.Users
  err := json.NewDecoder(r.Body).Decode(&u)
  if err != nil {
    http.Error(w, "JSON invalide", http.StatusBadRequest)
    return
  }

  var storedHash string
  query := "SELECT password_hash FROM users WHERE email = ?"
  err = database.DB.QueryRow(query, u.Email).Scan(&storedHash)
  
  if err == sql.ErrNoRows {
    http.Error(w, "Utilisateur non trouvé", http.StatusUnauthorized)
    return
  } else if err != nil {
    http.Error(w, "Erreur base de données", http.StatusInternalServerError)
    return
  }

  err = bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(u.Password_hash))
  if err != nil {
    http.Error(w, "Mot de passe incorrect", http.StatusUnauthorized)
    return
  }

  w.WriteHeader(http.StatusOK)
  json.NewEncoder(w).Encode(map[string]string{"message": "Connexion réussie !"})
}