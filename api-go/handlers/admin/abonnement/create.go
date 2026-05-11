package abonnement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"time"
)

type CreateAbonnementRequest struct {
	IDUser         int    `json:"id_user"`
	TypeAbonnement string `json:"type_abonnement"`
}

func CreateAbonnement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://172.16.90.10:8080")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req CreateAbonnementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDUser == 0 || req.TypeAbonnement == "" {
		http.Error(w, `{"erreur": "id_user et type_abonnement obligatoires"}`, 400)
		return
	}
 
	var exists bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM abonnement WHERE id_user = $1 AND date_fin > NOW() AND statut = 'actif')`,
		req.IDUser,
	).Scan(&exists)

	if exists {
		http.Error(w, `{"erreur": "Vous avez déjà un abonnement actif"}`, 409)
		return
	}
 
	var hadAbonnement bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM abonnement WHERE id_user = $1)`,
		req.IDUser,
	).Scan(&hadAbonnement)
 
	var prix float64
	var dateFin time.Time
	now := time.Now()

	switch req.TypeAbonnement {
	case "mensuel":
		if hadAbonnement {
			prix = 3.00
		} else {
			prix = 4.00
		}
		dateFin = now.AddDate(0, 1, 0)
	case "annuel":
		if hadAbonnement {
			prix = 30.00
		} else {
			prix = 40.00
		}
		dateFin = now.AddDate(1, 0, 0)
	default:
		http.Error(w, `{"erreur": "type_abonnement doit être 'mensuel' ou 'annuel'"}`, 400)
		return
	}
 
	database.DB.Exec(`DELETE FROM abonnement WHERE id_user = $1`, req.IDUser)
 
	var id int
	err := database.DB.QueryRow(`
		INSERT INTO abonnement (id_user, type_abonnement, prix_abonnement, date_debut, date_fin, statut)
		VALUES ($1, $2, $3, $4, $5, 'actif')
		RETURNING id_abonnement
	`, req.IDUser, req.TypeAbonnement, prix, now, dateFin).Scan(&id)

	if err != nil {
		log.Printf(" CreateAbonnement erreur: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	log.Printf(" Abonnement créé: id=%d, user=%d, type=%s, prix=%.2f, renouvellement=%v", id, req.IDUser, req.TypeAbonnement, prix, hadAbonnement)

	json.NewEncoder(w).Encode(map[string]interface{}{
		"id_abonnement":  id,
		"type_abonnement": req.TypeAbonnement,
		"prix":           prix,
		"date_fin":       dateFin.Format("2006-01-02"),
		"renouvellement": hadAbonnement,
	})
}