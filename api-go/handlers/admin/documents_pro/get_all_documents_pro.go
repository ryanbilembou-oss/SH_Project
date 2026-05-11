package documents_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DocumentDisplay struct {
	Id_doc       int     `json:"id_doc"`
	Id_user      int     `json:"id_user"`
	NomPro       string  `json:"nom_pro"`
	PrenomPro    string  `json:"prenom_pro"`
	Type_doc     string  `json:"type_doc"`
	Url_document string  `json:"url_document"`
	Date_upload  string  `json:"date_upload"`
	Id_categorie *int    `json:"id_categorie"`
	NomCategorie *string `json:"nom_categorie"`
	Statut       string  `json:"statut"`
}

func GetAllDocumentsPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	query := `
		SELECT d.id_doc, d.id_user,
			pp.nom, pp.prenom,
			d.type_doc, d.url_document, d.date_upload::text,
			d.id_categorie, cd.nom_categorie,
			d.statut
		FROM documents_pro d
		LEFT JOIN profile_pro pp ON d.id_user = pp.id_user
		LEFT JOIN categorie_document cd ON d.id_categorie = cd.id_categorie
		ORDER BY d.date_upload DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllDocumentsPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	docs := []DocumentDisplay{}
	for rows.Next() {
		var d DocumentDisplay
		if err := rows.Scan(
			&d.Id_doc, &d.Id_user, &d.NomPro, &d.PrenomPro,
			&d.Type_doc, &d.Url_document, &d.Date_upload,
			&d.Id_categorie, &d.NomCategorie, &d.Statut,
		); err != nil {
			log.Printf("⚠️ GetAllDocumentsPro - Erreur scan: %v", err)
			continue
		}
		docs = append(docs, d)
	}
	json.NewEncoder(w).Encode(docs)
}