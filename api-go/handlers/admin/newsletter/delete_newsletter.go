package newsletter

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteNewsletter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(`DELETE FROM newsletter WHERE id_newsletter = $1`, id)
	if err != nil {
		log.Printf("❌ DeleteNewsletter - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Newsletter introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Newsletter %s supprimée", id)
	json.NewEncoder(w).Encode(map[string]string{"message": "Newsletter supprimée avec succès"})
}