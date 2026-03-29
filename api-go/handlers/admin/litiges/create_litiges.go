package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type LitigeRequest struct {
	Id_intervention int    `json:"id_intervention"`
	Motif           string `json:"motif"`
	Statut          string `json:"statut"`
}

func CreateLitige(w http.ResponseWriter, r *http.Request) {
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

	var req LitigeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_intervention == 0 || req.Motif == "" {
		http.Error(w, `{"erreur": "id_intervention et motif sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.Statut == "" {
		req.Statut = "ouvert"
	}

	_, err := database.DB.Exec(
		`INSERT INTO litiges (id_intervention, motif, statut, date_ouverture) VALUES ($1, $2, $3, NOW())`,
		req.Id_intervention, req.Motif, req.Statut,
	)
	if err != nil {
		log.Printf("❌ CreateLitige - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Litige créé pour intervention %d", req.Id_intervention)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}