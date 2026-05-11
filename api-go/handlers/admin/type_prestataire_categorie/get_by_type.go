
package type_prestataire_categorie
 
import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)
 
func GetCategoriesByType(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
 
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
 
	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}
 
	idType := r.URL.Query().Get("id_type")
	if idType == "" {
		http.Error(w, `{"erreur": "id_type manquant"}`, http.StatusBadRequest)
		return
	}
 
	query := `
		SELECT cs.id_categorie, cs.nom_categorie
		FROM type_prestataire_categorie tpc
		LEFT JOIN categorie_services cs ON tpc.id_categorie = cs.id_categorie
		WHERE tpc.id_type = $1
		ORDER BY cs.nom_categorie
	`
 
	rows, err := database.DB.Query(query, idType)
	if err != nil {
		log.Printf("❌ GetCategoriesByType - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()
 
	type CategorieSimple struct {
		Id_categorie  int    `json:"id_categorie"`
		Nom_categorie string `json:"nom_categorie"`
	}
 
	categories := []CategorieSimple{}
	for rows.Next() {
		var c CategorieSimple
		if err := rows.Scan(&c.Id_categorie, &c.Nom_categorie); err != nil {
			log.Printf("⚠️ GetCategoriesByType - Erreur scan: %v", err)
			continue
		}
		categories = append(categories, c)
	}
 
	if categories == nil {
		categories = []CategorieSimple{}
	}
 
	json.NewEncoder(w).Encode(categories)
}