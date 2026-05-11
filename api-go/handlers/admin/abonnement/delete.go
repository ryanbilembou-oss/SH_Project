package abonnement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ResilierRequest struct {
	IDUser int `json:"id_user"`
}

func ResilierAbonnement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://172.16.90.10:8080")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req ResilierRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDUser == 0 {
		http.Error(w, `{"erreur": "id_user obligatoire"}`, 400)
		return
	}

	result, err := database.DB.Exec(`
		UPDATE abonnement
		SET statut = 'resilie', date_resiliation = NOW()
		WHERE id_user = $1 AND statut = 'actif' AND date_fin > NOW()
	`, req.IDUser)

	if err != nil {
		log.Printf("❌ ResilierAbonnement erreur: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Aucun abonnement actif trouvé"}`, 404)
		return
	}

	log.Printf("✅ Abonnement résilié: user=%d", req.IDUser)
	json.NewEncoder(w).Encode(map[string]string{"message": "Abonnement résilié avec succès"})
}