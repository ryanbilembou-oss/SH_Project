package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateOffrePrestataire(w http.ResponseWriter, r *http.Request) {
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
		Id_offre          int     `json:"id_offre"`
		Id_pro            int     `json:"id_pro"`
		Id_service        int     `json:"id_service"`
		Prix_personnalise float64 `json:"prix_personnalise"`
		Titre             string  `json:"titre"`
		Bio               string  `json:"bio"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_offre == 0 || req.Id_pro == 0 || req.Id_service == 0 {
		http.Error(w, `{"erreur": "id_offre, id_pro et id_service sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE offre_prestataire SET id_pro = $1, id_service = $2, prix_personnalise = $3, titre = NULLIF($4, ''), bio = NULLIF($5, '') WHERE id_offre = $6`,
		req.Id_pro, req.Id_service, req.Prix_personnalise, req.Titre, req.Bio, req.Id_offre,
	)
	if err != nil {
		log.Printf("❌ UpdateOffrePrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la mise à jour"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Offre prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ OffrePrestataire %d mise à jour", req.Id_offre)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}