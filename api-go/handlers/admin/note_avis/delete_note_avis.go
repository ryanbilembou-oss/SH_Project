package note_avis

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
)

func DeleteNoteAvis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://172.16.90.10:8080")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions { w.WriteHeader(http.StatusOK); return }

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec("DELETE FROM note_avis WHERE id_avis=$1", id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "message": "Avis supprimé"})
}