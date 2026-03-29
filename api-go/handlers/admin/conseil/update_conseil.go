package conseil

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateConseil(w http.ResponseWriter, r *http.Request) {
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
		Id_conseil int    `json:"id_conseil"`
		Categorie  string `json:"categorie"`
		Titre      string `json:"titre"`
		Contenu    string `json:"contenu"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_conseil == 0 || req.Titre == "" || req.Contenu == "" {
		http.Error(w, `{"erreur": "ID, titre et contenu sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	query := `UPDATE conseil SET categorie = NULLIF($1, ''), titre = $2, contenu = $3 WHERE id_conseil = $4`
	result, err := database.DB.Exec(query, req.Categorie, req.Titre, req.Contenu, req.Id_conseil)
	if err != nil {
		log.Printf("❌ UpdateConseil - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Conseil introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Conseil %d mis à jour", req.Id_conseil)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}