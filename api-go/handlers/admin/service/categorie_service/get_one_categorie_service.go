package categorie_service

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"silver-happy-api/database"
)

func GetOneCategorieService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		sendError(w, "id", "ID de catégorie invalide.", http.StatusBadRequest)
		return
	}

	var cat CategorieResponse
	query := `SELECT id_categorie, nom_categorie FROM categorie_services WHERE id_categorie = $1`
	err = database.DB.QueryRow(query, id).Scan(&cat.Id, &cat.Nom_categorie)

	if err == sql.ErrNoRows {
		sendError(w, "id", "Catégorie non trouvée.", http.StatusNotFound)
		return
	} else if err != nil {
		sendError(w, "global", "Erreur lors de la récupération.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cat)
}