package messagerie

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateMessage(w http.ResponseWriter, r *http.Request) {
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
		Id      int    `json:"id"`
		Contenu string `json:"contenu"`
		Lu      bool   `json:"lu"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id == 0 || req.Contenu == "" {
		http.Error(w, `{"erreur": "id et contenu sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE messagerie SET contenu = $1, lu = $2 WHERE id = $3`,
		req.Contenu, req.Lu, req.Id,
	)
	if err != nil {
		log.Printf("❌ UpdateMessage - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Message introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Message %d mis à jour", req.Id)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}