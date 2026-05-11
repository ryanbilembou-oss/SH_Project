package documents_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateDocumentPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Id_doc       int    `json:"id_doc"`
		Type_doc     string `json:"type_doc"`
		Url_document string `json:"url_document"`
		Id_categorie int    `json:"id_categorie"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_doc == 0 || req.Type_doc == "" || req.Url_document == "" {
		http.Error(w, `{"erreur": "id_doc, type_doc et url_document sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE documents_pro SET type_doc = $1, url_document = $2, id_categorie = NULLIF($3, 0) WHERE id_doc = $4`,
		req.Type_doc, req.Url_document, req.Id_categorie, req.Id_doc,
	)
	if err != nil {
		log.Printf("❌ UpdateDocumentPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Document introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ DocumentPro %d mis à jour", req.Id_doc)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}