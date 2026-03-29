package service

import (
	"encoding/json"
	"net/http"
	"strconv"
	"silver-happy-api/database"
)

func UpdateService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		sendError(w, "id", "ID invalide", http.StatusBadRequest)
		return
	}

	var req ServiceRequest // Utilise la structure définie dans types.go
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Données invalides", http.StatusBadRequest)
		return
	}

	query := `UPDATE service SET id_categorie=$1, nom=$2, description=$3, prix_reference=$4, image_url=$5 WHERE id=$6`
	res, err := database.DB.Exec(query, req.Id_categorie, req.Nom, req.Description, req.Prix_reference, req.Image_url, id)

	if err != nil {
		sendError(w, "global", "Erreur lors de la mise à jour", http.StatusInternalServerError)
		return
	}

	rows, _ := res.RowsAffected()
	if rows == 0 {
		sendError(w, "id", "Service non trouvé", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}