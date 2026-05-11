package service

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"strings"
)

type ServiceRequest struct {
	Id_categorie   int     `json:"id_categorie"`
	Nom            string  `json:"nom"`
	Description    *string `json:"description"`
	Prix_reference float64 `json:"prix_reference"`
	Image_url      *string `json:"image_url"`
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

func CreateService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req ServiceRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide", http.StatusBadRequest)
		return
	}

	query := `INSERT INTO service (id_categorie, nom, description, prix_reference, image_url) 
              VALUES ($1, $2, $3, $4, $5) RETURNING id`
	
	var lastID int
	err := database.DB.QueryRow(query, req.Id_categorie, req.Nom, req.Description, req.Prix_reference, req.Image_url).Scan(&lastID)

	if err != nil {
		if strings.Contains(err.Error(), "fk_service_categorie") {
			sendError(w, "id_categorie", "La catégorie spécifiée n'existe pas.", http.StatusConflict)
		} else {
			sendError(w, "global", "Erreur lors de la création du service.", http.StatusInternalServerError)
		}
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "id": lastID})
}