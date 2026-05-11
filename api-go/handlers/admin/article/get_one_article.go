package article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func GetArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://172.16.90.10:8080")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	var a ArticleDisplay

	query := `
		SELECT
			a.id, a.id_user, a.id_categorie, c.nom_categorie,
			a.nom, a.prix, a.bio, a.stock, a.image_url
		FROM article a
		INNER JOIN categorie_article c ON a.id_categorie = c.id_categorie
		WHERE a.id = $1
	`

	err := database.DB.QueryRow(query, id).Scan(
		&a.Id, &a.Id_user, &a.Id_categorie, &a.NomCategorie,
		&a.Nom, &a.Prix, &a.Bio, &a.Stock, &a.Image_url,
	)
	if err != nil {
		log.Printf("❌ GetArticle - ID %s introuvable : %v", id, err)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Article introuvable"})
		return
	}

	json.NewEncoder(w).Encode(a)
}