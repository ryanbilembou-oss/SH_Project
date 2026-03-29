package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetOffrePrestataire(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var o models.OffrePrestataire
	err := database.DB.QueryRow(
		`SELECT id_offre, id_pro, id_service, prix_personnalise, titre, bio FROM offre_prestataire WHERE id_offre = $1`, id,
	).Scan(&o.Id_offre, &o.Id_pro, &o.Id_service, &o.Prix_personnalise, &o.Titre, &o.Bio)
	if err != nil {
		log.Printf("❌ GetOffrePrestataire - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Offre prestataire introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(o)
}