package conseil

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetConseil(w http.ResponseWriter, r *http.Request) {
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

	var c models.Conseil
	query := `SELECT id_conseil, categorie, titre, contenu FROM conseil WHERE id_conseil = $1`
	err := database.DB.QueryRow(query, id).Scan(&c.Id_conseil, &c.Categorie, &c.Titre, &c.Contenu)
	if err != nil {
		log.Printf("❌ GetConseil - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Conseil introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(c)
}