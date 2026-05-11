package  categorie_evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"

)

type CategorieEvenement struct {
	IDCategorie  int    `json:"id_categorie"`
	NomCategorie string `json:"nom_categorie"`
}
type ErrorResponse struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func GetCategorieEvenement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	rows, err := database.DB.Query(`
		SELECT id_categorie, nom_categorie
		FROM categorie_evenement
		ORDER BY nom_categorie ASC
	`)
	if err != nil {
		log.Printf("Erreur SQL lors de la récupération des catégories : %v", err)
		sendError(w, "global", "Erreur lors de la récupération des catégories.", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var categories []CategorieEvenement
	for rows.Next() {
		var cat CategorieEvenement
		if err := rows.Scan(&cat.IDCategorie, &cat.NomCategorie); err != nil {
			log.Printf("Erreur scan : %v", err)
			continue
		}
		categories = append(categories, cat)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(categories)
}