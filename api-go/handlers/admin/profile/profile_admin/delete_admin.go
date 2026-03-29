package profile_admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteProfileAdmin(w http.ResponseWriter, r *http.Request) {
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

	result, err := database.DB.Exec(`DELETE FROM profile_admin WHERE id_user = $1`, id)
	if err != nil {
		log.Printf("❌ DeleteProfileAdmin - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Profil admin introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ ProfileAdmin %s supprimé", id)
	json.NewEncoder(w).Encode(map[string]string{"message": "Profil admin supprimé avec succès"})
}