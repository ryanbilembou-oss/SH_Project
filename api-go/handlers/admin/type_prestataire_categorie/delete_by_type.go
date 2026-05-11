package type_prestataire_categorie
 
import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)
 
func DeleteAllByType(w http.ResponseWriter, r *http.Request) {
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
 
	idType := r.URL.Query().Get("id_type")
	if idType == "" {
		http.Error(w, `{"erreur": "id_type manquant"}`, http.StatusBadRequest)
		return
	}
 
	_, err := database.DB.Exec(
		`DELETE FROM type_prestataire_categorie WHERE id_type = $1`, idType,
	)
	if err != nil {
		log.Printf("❌ DeleteAllByType - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}
 
	log.Printf("✅ Toutes les catégories supprimées pour type=%s", idType)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}