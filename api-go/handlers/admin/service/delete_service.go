package service

import (
	"encoding/json"
	"net/http"
	"strconv"
	"silver-happy-api/database"
)

func DeleteService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")

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

	query := `DELETE FROM service WHERE id = $1`
	_, err = database.DB.Exec(query, id)
	if err != nil {
		sendError(w, "global", "Impossible de supprimer le service (il est peut-être lié à une intervention)", http.StatusConflict)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}