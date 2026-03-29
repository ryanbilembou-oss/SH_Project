package categorie_article

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DeleteCategorieRequest struct {
	IDCategorie int `json:"id_categorie"`
}

func DeleteCategorieArticle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req DeleteCategorieRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	var nonClasseID int
	err := database.DB.QueryRow(
		`SELECT id_categorie FROM categorie_article WHERE nom_categorie = 'Non classé' LIMIT 1`,
	).Scan(&nonClasseID)
	if err != nil {
		log.Printf("❌ Catégorie 'Non classé' introuvable : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Catégorie 'Non classé' manquante en BDD"})
		return
	}

	_, err = database.DB.Exec(
		`UPDATE article SET id_categorie = $1 WHERE id_categorie = $2`,
		nonClasseID, req.IDCategorie,
	)
	if err != nil {
		log.Printf("❌ Erreur réassignation : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur lors de la réassignation"})
		return
	}

	_, err = database.DB.Exec(
		`DELETE FROM categorie_article WHERE id_categorie = $1`, req.IDCategorie,
	)
	if err != nil {
		log.Printf("❌ Erreur SQL delete : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}