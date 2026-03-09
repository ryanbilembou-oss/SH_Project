package evenement

import (
	"fmt"
	"net/http"
	"silver-happy-api/database"
)

func DeleteEvenement(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")


	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodDelete && r.Method != http.MethodGet {
	
	}


	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, `{"error": "ID manquant"}`)
		return
	}


	query := "DELETE FROM evenements WHERE id_evenement =$1"
	result, err := database.DB.Exec(query, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, `{"error": "Erreur SQL: %v"}`, err)
		return
	}


	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, `{"error": "Aucun événement trouvé avec cet ID"}`)
		return
	}


	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, `{"success": true, "message": "Événement supprimé"}`)
}