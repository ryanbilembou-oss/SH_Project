package categorie_article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func GetOneCategorieArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	var cat CategorieArticle
	err := database.DB.QueryRow(
		`SELECT id_categorie, nom_categorie FROM categorie_article WHERE id_categorie = $1`, id,
	).Scan(&cat.IDCategorie, &cat.NomCategorie)
	if err != nil {
		log.Printf("❌ Erreur SQL getone : %v", err)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Catégorie introuvable"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cat)
}