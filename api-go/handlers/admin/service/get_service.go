package service

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"silver-happy-api/database"
)

func GetService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		sendError(w, "id", "ID invalide", http.StatusBadRequest)
		return
	}

	var s ServiceResponse
	query := `SELECT id, id_categorie, nom, description, prix_reference, image_url FROM service WHERE id = $1`
	err = database.DB.QueryRow(query, id).Scan(&s.Id, &s.Id_categorie, &s.Nom, &s.Description, &s.Prix_reference, &s.Image_url)

	if err == sql.ErrNoRows {
		sendError(w, "id", "Service non trouvé", http.StatusNotFound)
		return
	} else if err != nil {
		sendError(w, "global", "Erreur technique", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(s)
}