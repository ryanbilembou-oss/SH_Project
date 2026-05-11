package documents_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetDocumentPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var d models.DocumentsPro
	err := database.DB.QueryRow(
		`SELECT id_doc, id_user, type_doc, url_document, date_upload, id_categorie FROM documents_pro WHERE id_doc = $1`, id,
	).Scan(&d.Id_doc, &d.Id_user, &d.Type_doc, &d.Url_document, &d.Date_upload, &d.Id_categorie)
	if err != nil {
		log.Printf("❌ GetDocumentPro - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Document introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(d)
}