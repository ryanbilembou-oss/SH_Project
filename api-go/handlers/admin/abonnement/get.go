package abonnement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type AbonnementDisplay struct {
	ID                    int      `json:"id_abonnement"`
	IDUser                int      `json:"id_user"`
	TypeAbonnement        string   `json:"type_abonnement"`
	PrixAbonnement        float64  `json:"prix_abonnement"`
	DateDebut             string   `json:"date_debut"`
	DateFin               string   `json:"date_fin"`
	Statut                string   `json:"statut"`
	DateResiliation       *string  `json:"date_resiliation"`
	StripeSubscriptionID  *string  `json:"stripe_subscription_id"`
}

func GetByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://172.16.90.10:8080")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID utilisateur manquant"}`, 400)
		return
	}

	var a AbonnementDisplay
	err := database.DB.QueryRow(`
		SELECT id_abonnement, id_user, type_abonnement, prix_abonnement,
			   date_debut, date_fin, statut, date_resiliation, stripe_subscription_id
		FROM abonnement
		WHERE id_user = $1
		ORDER BY date_fin DESC
		LIMIT 1
	`, id).Scan(&a.ID, &a.IDUser, &a.TypeAbonnement, &a.PrixAbonnement,
		&a.DateDebut, &a.DateFin, &a.Statut, &a.DateResiliation, &a.StripeSubscriptionID)

	if err != nil {
		log.Printf("⚠️ GetByUser abonnement: %v", err)
		json.NewEncoder(w).Encode(nil)
		return
	}

	json.NewEncoder(w).Encode(a)
}