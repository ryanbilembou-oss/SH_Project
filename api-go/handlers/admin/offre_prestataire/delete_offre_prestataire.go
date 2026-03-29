package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteOffrePrestataire(w http.ResponseWriter, r *http.Request) {
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

	result, err := database.DB.Exec(`DELETE FROM offre_prestataire WHERE id_offre = $1`, id)
	if err != nil {
		log.Printf("❌ DeleteOffrePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Offre prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ OffrePrestataire %s supprimée", id)
	json.NewEncoder(w).Encode(map[string]string{"message": "Offre prestataire supprimée avec succès"})
}