package virement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"time"
)

func TriggerVirement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	idIntervention := r.URL.Query().Get("id_intervention")
	if idIntervention == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "id_intervention obligatoire"})
		return
	}

	var statut string
	err := database.DB.QueryRow(
		`SELECT statut FROM intervention WHERE id = $1`, idIntervention,
	).Scan(&statut)
	if err != nil || statut != "terminee" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Intervention non terminee"})
		return
	}

	var litigeOuvert bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM litiges WHERE id_intervention = $1 AND statut = 'ouvert')`,
		idIntervention,
	).Scan(&litigeOuvert)
	if litigeOuvert {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Litige ouvert en cours"})
		return
	}

	var idFacture, idPro int
	var gainNet float64
	err = database.DB.QueryRow(`
		SELECT f.id_facture, f.id_emetteur, f.montant_ht - f.commission_sh
		FROM facture f
		WHERE f.id_intervention = $1
	`, idIntervention).Scan(&idFacture, &idPro, &gainNet)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Facture introuvable"})
		return
	}

	var dejaExiste bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM virement WHERE id_facture = $1 AND statut = 'effectue')`,
		idFacture,
	).Scan(&dejaExiste)
	if dejaExiste {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Virement deja effectue"})
		return
	}

	now := time.Now()
	var idVirement int
	err = database.DB.QueryRow(`
		INSERT INTO virement (id_pro, id_facture, id_intervention, montant, statut, date_virement)
		VALUES ($1, $2, $3, $4, 'effectue', $5)
		RETURNING id_virement
	`, idPro, idFacture, idIntervention, gainNet, now).Scan(&idVirement)
	if err != nil {
		log.Printf("TriggerVirement erreur INSERT: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Printf("Virement effectue: pro=%d facture=%d montant=%.2f", idPro, idFacture, gainNet)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":     true,
		"id_virement": idVirement,
		"montant":     gainNet,
		"date":        now,
	})
}

func GetVirementsByPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	idPro := r.URL.Query().Get("id_pro")
	if idPro == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	rows, err := database.DB.Query(`
		SELECT v.id_virement, v.montant, v.statut, v.date_creation, v.date_virement,
			   s.nom as nom_service, i.date_heure_debut,
			   ps.nom as nom_senior, ps.prenom as prenom_senior
		FROM virement v
		LEFT JOIN intervention i ON v.id_intervention = i.id
		LEFT JOIN service s ON i.id_service = s.id
		LEFT JOIN profile_senior ps ON i.id_senior = ps.id_user
		WHERE v.id_pro = $1
		ORDER BY v.date_creation DESC
	`, idPro)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type VirementRow struct {
		IdVirement    int      `json:"id_virement"`
		Montant       float64  `json:"montant"`
		Statut        string   `json:"statut"`
		DateCreation  string   `json:"date_creation"`
		DateVirement  *string  `json:"date_virement"`
		NomService    *string  `json:"nom_service"`
		DateIntervention *string `json:"date_intervention"`
		NomSenior     *string  `json:"nom_senior"`
		PrenomSenior  *string  `json:"prenom_senior"`
	}

	var virements []VirementRow
	for rows.Next() {
		var v VirementRow
		rows.Scan(
			&v.IdVirement, &v.Montant, &v.Statut, &v.DateCreation, &v.DateVirement,
			&v.NomService, &v.DateIntervention, &v.NomSenior, &v.PrenomSenior,
		)
		virements = append(virements, v)
	}
	if virements == nil {
		virements = []VirementRow{}
	}
	json.NewEncoder(w).Encode(virements)
}

func GetAllVirements(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, err := database.DB.Query(`
		SELECT v.id_virement, v.montant, v.statut, v.date_creation, v.date_virement,
			   pp.nom as nom_pro, pp.prenom as prenom_pro,
			   s.nom as nom_service
		FROM virement v
		LEFT JOIN profile_pro pp ON v.id_pro = pp.id_user
		LEFT JOIN intervention i ON v.id_intervention = i.id
		LEFT JOIN service s ON i.id_service = s.id
		ORDER BY v.date_creation DESC
	`)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type VirementAdmin struct {
		IdVirement   int      `json:"id_virement"`
		Montant      float64  `json:"montant"`
		Statut       string   `json:"statut"`
		DateCreation string   `json:"date_creation"`
		DateVirement *string  `json:"date_virement"`
		NomPro       *string  `json:"nom_pro"`
		PrenomPro    *string  `json:"prenom_pro"`
		NomService   *string  `json:"nom_service"`
	}

	var virements []VirementAdmin
	for rows.Next() {
		var v VirementAdmin
		rows.Scan(
			&v.IdVirement, &v.Montant, &v.Statut, &v.DateCreation, &v.DateVirement,
			&v.NomPro, &v.PrenomPro, &v.NomService,
		)
		virements = append(virements, v)
	}
	if virements == nil {
		virements = []VirementAdmin{}
	}
	json.NewEncoder(w).Encode(virements)
}