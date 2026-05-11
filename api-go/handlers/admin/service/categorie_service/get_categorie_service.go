package categorie_service

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
)


func GetCategoriesService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	query := `SELECT id_categorie, nom_categorie FROM categorie_services ORDER BY id_categorie ASC`
	rows, err := database.DB.Query(query)
	if err != nil {
		sendError(w, "global", "Erreur lors de la récupération des catégories.", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var categories []map[string]interface{}
	for rows.Next() {
		var id int
		var nom string
		if err := rows.Scan(&id, &nom); err != nil {
			continue
		}
		categories = append(categories, map[string]interface{}{
			"id_categorie":  id,
			"nom_categorie": nom,
		})
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(categories)
}