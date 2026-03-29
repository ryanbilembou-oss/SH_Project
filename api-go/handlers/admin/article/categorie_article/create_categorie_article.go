package categorie_article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CreateCategorieRequest struct {
	NomCategorie string `json:"nom_categorie"`
}

func CreateCategorieArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req CreateCategorieRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	if req.NomCategorie == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Nom requis"})
		return
	}

	var lastID int
	err := database.DB.QueryRow(
		`INSERT INTO categorie_article (nom_categorie) VALUES ($1) RETURNING id_categorie`,
		req.NomCategorie,
	).Scan(&lastID)
	if err != nil {
		log.Printf("❌ Erreur SQL create : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":       "success",
		"id_categorie": lastID,
	})
}
