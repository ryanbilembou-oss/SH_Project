package categorie_document

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateCategorieDocument(w http.ResponseWriter, r *http.Request) {
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
		Id_categorie  int    `json:"id_categorie"`
		Id_type       int    `json:"id_type"`
		Nom_categorie string `json:"nom_categorie"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_categorie == 0 || req.Id_type == 0 || req.Nom_categorie == "" {
		http.Error(w, `{"erreur": "id_categorie, id_type et nom_categorie sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE categorie_document SET id_type = $1, nom_categorie = $2 WHERE id_categorie = $3`,
		req.Id_type, req.Nom_categorie, req.Id_categorie,
	)
	if err != nil {
		log.Printf("❌ UpdateCategorieDocument - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Catégorie document introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ CategorieDocument %d mise à jour", req.Id_categorie)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}