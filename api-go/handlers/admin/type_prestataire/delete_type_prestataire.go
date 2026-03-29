package type_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteTypePrestataire(w http.ResponseWriter, r *http.Request) {
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

	result, err := database.DB.Exec(`DELETE FROM type_prestataire WHERE id_type = $1`, id)
	if err != nil {
		log.Printf("❌ DeleteTypePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Type prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Type prestataire %s supprimé", id)
	json.NewEncoder(w).Encode(map[string]string{"message": "Type prestataire supprimé avec succès"})
}