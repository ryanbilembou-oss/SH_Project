package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type LitigeRequest struct {
	IdIntervention int    `json:"id_intervention"`
	IdSenior       int    `json:"id_senior"`
	IdPro          int    `json:"id_pro"`
	Motif          string `json:"motif"`
	OuvertPar      string `json:"ouvert_par"`
}

func CreateLitige(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req LitigeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Format invalide"})
		return
	}

	if req.IdIntervention == 0 || req.Motif == "" {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "id_intervention et motif obligatoires"})
		return
	}

	if req.OuvertPar == "" {
		req.OuvertPar = "senior"
	}

	var dejaExiste bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM litiges WHERE id_intervention = $1 AND statut = 'ouvert')`,
		req.IdIntervention,
	).Scan(&dejaExiste)
	if dejaExiste {
		w.WriteHeader(409)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Un litige est déjà ouvert pour cette intervention"})
		return
	}

	var idLitige int
	err := database.DB.QueryRow(`
		INSERT INTO litiges (id_intervention, id_senior, id_pro, motif, statut, ouvert_par, statut_detail)
		VALUES ($1, $2, $3, $4, 'ouvert', $5, 'ouvert')
		RETURNING id_litige
	`, req.IdIntervention, req.IdSenior, req.IdPro, req.Motif, req.OuvertPar).Scan(&idLitige)
	if err != nil {
		log.Printf("CreateLitige error: %v", err)
		w.WriteHeader(500)
		return
	}

	log.Printf("Litige cree: id=%d intervention=%d", idLitige, req.IdIntervention)
	w.WriteHeader(201)
	json.NewEncoder(w).Encode(map[string]interface{}{"id_litige": idLitige})
}