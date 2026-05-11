package service

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
)

type ServiceResponse struct {
	Id             int     `json:"id"`
	Id_categorie   int     `json:"id_categorie"`
	Nom_categorie  string  `json:"nom_categorie"`
	Nom            string  `json:"nom"`
	Description    *string `json:"description"`
	Prix_reference float64 `json:"prix_reference"`
	Image_url      *string `json:"image_url"`
}

func GetAllServices(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	query := `
		SELECT s.id, s.id_categorie, cs.nom_categorie, s.nom, s.description, s.prix_reference, s.image_url 
		FROM service s
		LEFT JOIN categorie_services cs ON s.id_categorie = cs.id_categorie
	`
	rows, err := database.DB.Query(query)
	if err != nil {
		sendError(w, "global", "Erreur lors de la récupération", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	services := []ServiceResponse{}
	for rows.Next() {
		var s ServiceResponse
		if err := rows.Scan(&s.Id, &s.Id_categorie, &s.Nom_categorie, &s.Nom, &s.Description, &s.Prix_reference, &s.Image_url); err != nil {
			continue
		}
		services = append(services, s)
	}

	json.NewEncoder(w).Encode(services)
}