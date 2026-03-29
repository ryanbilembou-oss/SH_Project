package categorie_document

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetCategorieDocument(w http.ResponseWriter, r *http.Request) {
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

	var c models.CategorieDocument
	err := database.DB.QueryRow(
		`SELECT id_categorie, id_type, nom_categorie FROM categorie_document WHERE id_categorie = $1`, id,
	).Scan(&c.Id_categorie, &c.Id_type, &c.Nom_categorie)
	if err != nil {
		log.Printf("❌ GetCategorieDocument - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Catégorie document introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(c)
}