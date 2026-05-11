package categorie_document

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CategorieDocumentDisplay struct {
	Id_categorie  int    `json:"id_categorie"`
	Id_type       int    `json:"id_type"`
	Nom_categorie string `json:"nom_categorie"`
	Nom_type      string `json:"nom_type"`
}

func GetAllCategorieDocument(w http.ResponseWriter, r *http.Request) {
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
		SELECT cd.id_categorie, cd.id_type, cd.nom_categorie, tp.nom_type
		FROM categorie_document cd
		LEFT JOIN type_prestataire tp ON cd.id_type = tp.id_type
		ORDER BY tp.nom_type, cd.nom_categorie
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllCategorieDocument - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	categories := []CategorieDocumentDisplay{}
	for rows.Next() {
		var c CategorieDocumentDisplay
		if err := rows.Scan(&c.Id_categorie, &c.Id_type, &c.Nom_categorie, &c.Nom_type); err != nil {
			log.Printf("⚠️ GetAllCategorieDocument - Erreur scan: %v", err)
			continue
		}
		categories = append(categories, c)
	}

	json.NewEncoder(w).Encode(categories)
}