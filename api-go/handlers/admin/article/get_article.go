package article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ArticleDisplay struct {
	Id           int     `json:"id"`
	Id_user      *int    `json:"id_user"`
	Id_categorie int     `json:"id_categorie"`
	NomCategorie string  `json:"nom_categorie"`
	Nom          string  `json:"nom"`
	Prix         float64 `json:"prix"`
	Bio          *string `json:"bio"`
	Stock        int     `json:"stock"`
	Image_url    *string `json:"image_url"`
}

func GetAllArticles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	query := `
		SELECT
			a.id, a.id_user, a.id_categorie, c.nom_categorie,
			a.nom, a.prix, a.bio, a.stock, a.image_url
		FROM article a
		INNER JOIN categorie_article c ON a.id_categorie = c.id_categorie
		ORDER BY a.nom ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllArticles - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}
	defer rows.Close()

	articles := []ArticleDisplay{}

	for rows.Next() {
		var a ArticleDisplay
		err := rows.Scan(
			&a.Id, &a.Id_user, &a.Id_categorie, &a.NomCategorie,
			&a.Nom, &a.Prix, &a.Bio, &a.Stock, &a.Image_url,
		)
		if err != nil {
			log.Printf("⚠️ GetAllArticles - Erreur Scan : %v", err)
			continue
		}
		articles = append(articles, a)
	}

	json.NewEncoder(w).Encode(articles)
}