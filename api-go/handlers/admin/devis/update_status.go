package devis

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type UpdateStatutRequest struct {
	IdDevis int    `json:"id_devis"`
	Statut  string `json:"statut"`
}

func UpdateStatutDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req UpdateStatutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.IdDevis == 0 || req.Statut == "" {
		http.Error(w, `{"erreur": "id_devis et statut obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE devis SET statut = $1 WHERE id_devis = $2`,
		req.Statut, req.IdDevis,
	)
	if err != nil {
		log.Printf("❌ UpdateStatutDevis - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Devis introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Devis %d → statut %s", req.IdDevis, req.Statut)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}