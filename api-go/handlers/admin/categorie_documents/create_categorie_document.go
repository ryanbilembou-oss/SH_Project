package categorie_document

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type CategorieDocumentRequest struct {
	Id_type       int    `json:"id_type"`
	Nom_categorie string `json:"nom_categorie"`
}

func CreateCategorieDocument(w http.ResponseWriter, r *http.Request) {
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

	var req CategorieDocumentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_type == 0 || req.Nom_categorie == "" {
		http.Error(w, `{"erreur": "id_type et nom_categorie sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO categorie_document (id_type, nom_categorie) VALUES ($1, $2)`,
		req.Id_type, req.Nom_categorie,
	)
	if err != nil {
		log.Printf("❌ CreateCategorieDocument - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ CategorieDocument créée : %s", req.Nom_categorie)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}