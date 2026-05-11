package categorie_service

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"strings"
)

type CategorieRequest struct {
	Nom_categorie string `json:"nom_categorie"`
}

type CategorieResponse struct {
	Id            int    `json:"id_categorie"`
	Nom_categorie string `json:"nom_categorie"`
}

type ErrorResponse struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

func sendError(w http.ResponseWriter, field string, msg string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(ErrorResponse{Field: field, Message: msg})
}

func CreateCategorieService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		sendError(w, "global", "Méthode POST requise", http.StatusMethodNotAllowed)
		return
	}

	var req CategorieRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(req.Nom_categorie) == "" {
		sendError(w, "nom_categorie", "Le nom de la catégorie est obligatoire.", http.StatusBadRequest)
		return
	}

	query := `INSERT INTO categorie_services (nom_categorie) VALUES ($1) RETURNING id_categorie`
	var lastID int
	err := database.DB.QueryRow(query, req.Nom_categorie).Scan(&lastID)

	if err != nil {
		if strings.Contains(err.Error(), "unique") || strings.Contains(err.Error(), "23505") {
			sendError(w, "nom_categorie", "Cette catégorie existe déjà.", http.StatusConflict)
		} else {
			sendError(w, "global", "Erreur lors de la création.", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "id": lastID})
}