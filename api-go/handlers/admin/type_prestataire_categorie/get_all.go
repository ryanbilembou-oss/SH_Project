
package type_prestataire_categorie
 
import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)
 
type TypePrestataireCategDisplay struct {
	Id_type        int    `json:"id_type"`
	Id_categorie   int    `json:"id_categorie"`
	Nom_type       string `json:"nom_type"`
	Nom_categorie  string `json:"nom_categorie"`
}
 
func GetAllTypePrestataireCategorie(w http.ResponseWriter, r *http.Request) {
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
 
	query := `
		SELECT tpc.id_type, tpc.id_categorie, tp.nom_type, cs.nom_categorie
		FROM type_prestataire_categorie tpc
		LEFT JOIN type_prestataire tp ON tpc.id_type = tp.id_type
		LEFT JOIN categorie_services cs ON tpc.id_categorie = cs.id_categorie
		ORDER BY tp.nom_type, cs.nom_categorie
	`
 
	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllTypePrestataireCategorie - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()
 
	liaisons := []TypePrestataireCategDisplay{}
	for rows.Next() {
		var l TypePrestataireCategDisplay
		if err := rows.Scan(&l.Id_type, &l.Id_categorie, &l.Nom_type, &l.Nom_categorie); err != nil {
			log.Printf("⚠️ GetAllTypePrestataireCategorie - Erreur scan: %v", err)
			continue
		}
		liaisons = append(liaisons, l)
	}
 
	if liaisons == nil {
		liaisons = []TypePrestataireCategDisplay{}
	}
 
	json.NewEncoder(w).Encode(liaisons)
}