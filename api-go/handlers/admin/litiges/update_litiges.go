package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/jobs"
	"time"
)

type UpdateLitigeRequest struct {
	IdLitige int    `json:"id_litige"`
	Statut   string `json:"statut"`
	Decision string `json:"decision"`
}

func UpdateLitige(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "PUT" { w.WriteHeader(405); return }

	var req UpdateLitigeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		return
	}

	now := time.Now()

	if req.Statut == "ferme" {
		_, err := database.DB.Exec(`
			UPDATE litiges SET statut = 'ferme', statut_detail = $1, decision = $2, date_fermeture = $3
			WHERE id_litige = $4
		`, req.Statut, req.Decision, now, req.IdLitige)
		if err != nil {
			log.Printf("UpdateLitige error: %v", err)
			w.WriteHeader(500)
			return
		}

		var idIntervention int
		database.DB.QueryRow(`SELECT id_intervention FROM litiges WHERE id_litige = $1`, req.IdLitige).Scan(&idIntervention)

		if idIntervention > 0 {
			if req.Decision == "pro" {
				go jobs.ProcesserVirementSingle(idIntervention, database.DB)
			} else if req.Decision == "senior" {
				go jobs.DeclencherRemboursement(idIntervention, database.DB)
			}
		}
	} else {
		database.DB.Exec(`
			UPDATE litiges SET statut_detail = $1 WHERE id_litige = $2
		`, req.Statut, req.IdLitige)
	}

	log.Printf("Litige %d mis a jour: statut=%s decision=%s", req.IdLitige, req.Statut, req.Decision)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}