package conseil

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ConseilRequest struct {
	Categorie string `json:"categorie"`
	Titre     string `json:"titre"`
	Contenu   string `json:"contenu"`
}

func CreateConseil(w http.ResponseWriter, r *http.Request) {
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

	var req ConseilRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Titre == "" || req.Contenu == "" {
		http.Error(w, `{"erreur": "Titre et contenu sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	query := `INSERT INTO conseil (categorie, titre, contenu) VALUES (NULLIF($1, ''), $2, $3)`
	_, err := database.DB.Exec(query, req.Categorie, req.Titre, req.Contenu)
	if err != nil {
		log.Printf("❌ CreateConseil - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Conseil créé : %s", req.Titre)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}