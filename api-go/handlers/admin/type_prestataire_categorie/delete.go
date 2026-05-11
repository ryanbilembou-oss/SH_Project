
package type_prestataire_categorie
 
import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)
 
func DeleteTypePrestataireCategorie(w http.ResponseWriter, r *http.Request) {
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
	idCategorie := r.URL.Query().Get("id_categorie")
 
	if idType == "" || idCategorie == "" {
		http.Error(w, `{"erreur": "id_type et id_categorie sont obligatoires"}`, http.StatusBadRequest)
		return
	}
 
	result, err := database.DB.Exec(
		`DELETE FROM type_prestataire_categorie WHERE id_type = $1 AND id_categorie = $2`,
		idType, idCategorie,
	)
	if err != nil {
		log.Printf("❌ DeleteTypePrestataireCategorie - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}
 
	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Liaison introuvable"}`, http.StatusNotFound)
		return
	}
 
	log.Printf("✅ TypePrestataireCategorie supprimée : type=%s categorie=%s", idType, idCategorie)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}