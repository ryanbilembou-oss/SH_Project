package categorie_evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CreateCategorieEvenementRequest struct {
	IDCategorie int     `json:"id_categorie"`
	NomCategorie       string  `json:"nom_categorie"`
}

func sendError(w http.ResponseWriter, field string, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Field: field, Message: msg})
}
func CreateCategorieEvenement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req CreateCategorieEvenementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide", http.StatusBadRequest)
		return
	}

	if req.NomCategorie == "" {
		sendError(w, "nom_categorie", "Le nom de la catégorie est requis", http.StatusBadRequest)
		return
	}

	query := `
		INSERT INTO categorie_evenement (nom_categorie)
		VALUES ($1)
		RETURNING id_categorie;
	`

	var lastID int
	err := database.DB.QueryRow(query, req.NomCategorie).Scan(&lastID)
	if err != nil {
		log.Printf(" Erreur SQL lors de la création de la catégorie : %v", err)
		sendError(w, "global", "Erreur lors de la création de la catégorie.", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":       "success",
		"id_categorie": lastID,
	})
}