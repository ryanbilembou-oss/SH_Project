package evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"strconv"
	"strings"
)

type CreateEvenementRequest struct {
	IDCategorie json.Number `json:"id_categorie"`
	Titre       string      `json:"titre"`
	Description string      `json:"description"`
	DateHeure   string      `json:"date_heure"`
	Lieu        string      `json:"lieu"`
	PrixTicket  float64     `json:"prix_ticket"`
	NbPlacesMax int         `json:"nb_places_max"`
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

func CreateEvenement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req CreateEvenementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide", http.StatusBadRequest)
		return
	}

	idCat, err := strconv.Atoi(req.IDCategorie.String())
	if err != nil {
		sendError(w, "id_categorie", "Catégorie invalide", http.StatusBadRequest)
		return
	}

	cleanDate := strings.Replace(req.DateHeure, "T", " ", 1)
	cleanDate = strings.Replace(cleanDate, "Z", "", 1)

	adminID := 11

	query := `
		INSERT INTO evenements (
			id_createur, id_categorie, titre, description, date_heure, lieu, prix_ticket, nb_places_max, nb_inscrits
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, 0
		) RETURNING id_evenement;
	`

	var lastID int
	err = database.DB.QueryRow(
		query,
		adminID,
		idCat,
		req.Titre,
		req.Description,
		cleanDate,
		req.Lieu,
		req.PrixTicket,
		req.NbPlacesMax,
	).Scan(&lastID)

	if err != nil {
		log.Printf(" Erreur SQL : %v", err)
		sendError(w, "global", "Erreur lors de la création de l'événement.", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":       "success",
		"id_evenement": lastID,
	})
}