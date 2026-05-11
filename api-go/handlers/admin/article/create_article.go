package article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ArticleRequest struct {
	Id           int     `json:"id"`
	Id_user      *int    `json:"id_user"`
	Id_categorie int     `json:"id_categorie"`
	Nom          string  `json:"nom"`
	Prix         float64 `json:"prix"`
	Bio          *string `json:"bio"`
	Stock        int     `json:"stock"`
	Image_url    *string `json:"image_url"`
}

func CreateArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	var req ArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	if req.Nom == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le nom est obligatoire"})
		return
	}
	if req.Id_categorie == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "La catégorie est obligatoire"})
		return
	}
	if req.Prix <= 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le prix ne peut pas être négatif ou inferieur a 0"})
		return
	}
	if req.Stock <= 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le stock ne peut pas être négatif"})
		return
	}

	query := `
		INSERT INTO article (id_user, id_categorie, nom, prix, bio, stock, image_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
	`

	var newId int
	err := database.DB.QueryRow(
		query,
		req.Id_user, req.Id_categorie, req.Nom,
		req.Prix, req.Bio, req.Stock, req.Image_url,
	).Scan(&newId)

	if err != nil {
		log.Printf(" CreateArticle - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	log.Printf("CreateArticle - Nouvel article ID %d créé", newId)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Article créé avec succès",
		"id":      newId,
	})
}