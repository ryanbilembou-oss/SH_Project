package categorie_article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CategorieArticle struct {
	IDCategorie  int    `json:"id_categorie"`
	NomCategorie string `json:"nom_categorie"`
}

func GetCategorieArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	rows, err := database.DB.Query(`
		SELECT id_categorie, nom_categorie
		FROM categorie_article
		ORDER BY nom_categorie ASC
	`)
	if err != nil {
		log.Printf("❌ Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}
	defer rows.Close()

	var categories []CategorieArticle
	for rows.Next() {
		var cat CategorieArticle
		if err := rows.Scan(&cat.IDCategorie, &cat.NomCategorie); err != nil {
			log.Printf("❌ Erreur scan : %v", err)
			continue
		}
		categories = append(categories, cat)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(categories)
}