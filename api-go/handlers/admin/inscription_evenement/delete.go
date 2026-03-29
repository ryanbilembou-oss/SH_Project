package inscription_evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteInscription(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	idUser := r.URL.Query().Get("id_user")
	idEvenement := r.URL.Query().Get("id_evenement")

	if idUser == "" || idEvenement == "" {
		http.Error(w, `{"erreur": "id_user et id_evenement sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	// Change statut en annule
	_, err = tx.Exec(
		`UPDATE inscription_evenement SET statut = 'annule' WHERE id_user = $1 AND id_evenement = $2`,
		idUser, idEvenement,
	)
	if err != nil {
		tx.Rollback()
		log.Printf("❌ DeleteInscription - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur annulation"}`, http.StatusInternalServerError)
		return
	}

	// Décrémente nb_inscrits
	_, err = tx.Exec(
		`UPDATE evenements SET nb_inscrits = GREATEST(nb_inscrits - 1, 0) WHERE id_evenement = $1`,
		idEvenement,
	)
	if err != nil {
		tx.Rollback()
		http.Error(w, `{"erreur": "Erreur mise à jour places"}`, http.StatusInternalServerError)
		return
	}

	tx.Commit()
	log.Printf("✅ Inscription annulée user %s → événement %s", idUser, idEvenement)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}