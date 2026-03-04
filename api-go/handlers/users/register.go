package users

import (
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/pass_hash"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

    if r.Method == "OPTIONS" {
        return
    }

    err := r.ParseMultipartForm(10 << 20)
    if err != nil {
        http.Error(w, "Erreur formulaire", http.StatusBadRequest)
        return
    }

    hashedPassword, _ := pass_hash.HashPassword(r.FormValue("password"))

    query := `INSERT INTO utilisateurs (
        role, nom, prenom, genre, telephone, email, 
        password, date_naissance, adresse, siret, bio
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`

    _, err = database.DB.Exec(query, 
        r.FormValue("role"),
        r.FormValue("nom"),
        r.FormValue("prenom"),
        r.FormValue("genre"),
        r.FormValue("telephone"),
        r.FormValue("email"),
        hashedPassword,
        r.FormValue("date_naissance"),
        r.FormValue("adresse"),
        r.FormValue("siret"),
        r.FormValue("bio"),
    )

    if err != nil {
        http.Error(w, "Erreur BDD : " + err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
}