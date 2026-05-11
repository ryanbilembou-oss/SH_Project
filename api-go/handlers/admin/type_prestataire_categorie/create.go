
package type_prestataire_categorie
 
import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)
 
type TypePrestataireCategRequest struct {
	Id_type      int `json:"id_type"`
	Id_categorie int `json:"id_categorie"`
}
 
func CreateTypePrestataireCategorie(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Content-Type", "application/json")
 
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
 
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}
 
	var req TypePrestataireCategRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}
 
	if req.Id_type == 0 || req.Id_categorie == 0 {
		http.Error(w, `{"erreur": "id_type et id_categorie sont obligatoires"}`, http.StatusBadRequest)
		return
	}
 
	_, err := database.DB.Exec(
		`INSERT INTO type_prestataire_categorie (id_type, id_categorie) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
		req.Id_type, req.Id_categorie,
	)
	if err != nil {
		log.Printf("❌ CreateTypePrestataireCategorie - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}
 
	log.Printf("✅ TypePrestataireCategorie créée : type=%d categorie=%d", req.Id_type, req.Id_categorie)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}