package type_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateTypePrestataire(w http.ResponseWriter, r *http.Request) {
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
		Id_type  int    `json:"id_type"`
		Nom_type string `json:"nom_type"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_type == 0 || req.Nom_type == "" {
		http.Error(w, `{"erreur": "ID et nom sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(`UPDATE type_prestataire SET nom_type = $1 WHERE id_type = $2`, req.Nom_type, req.Id_type)
	if err != nil {
		log.Printf("❌ UpdateTypePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Type prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Type prestataire %d mis à jour", req.Id_type)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}