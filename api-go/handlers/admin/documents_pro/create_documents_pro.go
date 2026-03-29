package documents_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DocumentProRequest struct {
	Id_user      int    `json:"id_user"`
	Type_doc     string `json:"type_doc"`
	Url_document string `json:"url_document"`
	Id_categorie int    `json:"id_categorie"`
}

func CreateDocumentPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req DocumentProRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Type_doc == "" || req.Url_document == "" {
		http.Error(w, `{"erreur": "id_user, type_doc et url_document sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO documents_pro (id_user, type_doc, url_document, date_upload, id_categorie) VALUES ($1, $2, $3, NOW(), NULLIF($4, 0))`,
		req.Id_user, req.Type_doc, req.Url_document, req.Id_categorie,
	)
	if err != nil {
		log.Printf("❌ CreateDocumentPro - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ DocumentPro créé pour user %d", req.Id_user)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}