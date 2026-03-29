package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateLitige(w http.ResponseWriter, r *http.Request) {
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
		Id_litige int    `json:"id_litige"`
		Motif     string `json:"motif"`
		Statut    string `json:"statut"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_litige == 0 || req.Motif == "" || req.Statut == "" {
		http.Error(w, `{"erreur": "id_litige, motif et statut sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE litiges SET motif = $1, statut = $2 WHERE id_litige = $3`,
		req.Motif, req.Statut, req.Id_litige,
	)
	if err != nil {
		log.Printf("❌ UpdateLitige - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Litige introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Litige %d mis à jour", req.Id_litige)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}