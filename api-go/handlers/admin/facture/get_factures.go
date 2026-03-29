package facture

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
)

type FactureDisplay struct {
	Id_facture       int     `json:"id_facture"`
	Id_emetteur      int     `json:"id_emetteur"`
	Id_recepteur     int     `json:"id_recepteur"`
	Id_intervention  *int    `json:"id_intervention"`
	NomEmetteur      string  `json:"nom_emetteur"`
	PrenomEmetteur   string  `json:"prenom_emetteur"`
	NomRecepteur     string  `json:"nom_recepteur"`
	PrenomRecepteur  string  `json:"prenom_recepteur"`
	Montant_ht       float64 `json:"montant_ht"`
	Montant_ttc      float64 `json:"montant_ttc"`
	Commission_sh    float64 `json:"commission_sh"`
	Pdf_url          string  `json:"pdf_url"`
}

func GetAllFactures(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	query := `
		SELECT 
			f.id_facture, f.id_emetteur, f.id_recepteur, f.id_intervention,
			COALESCE(pp.nom, u1.email) as nom_emetteur,
			COALESCE(pp.prenom, '') as prenom_emetteur,
			COALESCE(ps.nom, u2.email) as nom_recepteur,
			COALESCE(ps.prenom, '') as prenom_recepteur,
			f.montant_ht, f.montant_ttc, f.commission_sh, f.pdf_url
		FROM facture f
		LEFT JOIN users u1 ON f.id_emetteur = u1.id_user
		LEFT JOIN users u2 ON f.id_recepteur = u2.id_user
		LEFT JOIN profile_pro pp ON f.id_emetteur = pp.id_user
		LEFT JOIN profile_senior ps ON f.id_recepteur = ps.id_user
		ORDER BY f.id_facture DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	factures := []FactureDisplay{}
	for rows.Next() {
		var f FactureDisplay
		rows.Scan(
			&f.Id_facture, &f.Id_emetteur, &f.Id_recepteur, &f.Id_intervention,
			&f.NomEmetteur, &f.PrenomEmetteur,
			&f.NomRecepteur, &f.PrenomRecepteur,
			&f.Montant_ht, &f.Montant_ttc, &f.Commission_sh, &f.Pdf_url,
		)
		factures = append(factures, f)
	}
	json.NewEncoder(w).Encode(factures)
}

func GetFacture(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	query := `
		SELECT 
			f.id_facture, f.id_emetteur, f.id_recepteur, f.id_intervention,
			COALESCE(pp.nom, u1.email) as nom_emetteur,
			COALESCE(pp.prenom, '') as prenom_emetteur,
			COALESCE(ps.nom, u2.email) as nom_recepteur,
			COALESCE(ps.prenom, '') as prenom_recepteur,
			f.montant_ht, f.montant_ttc, f.commission_sh, f.pdf_url
		FROM facture f
		LEFT JOIN users u1 ON f.id_emetteur = u1.id_user
		LEFT JOIN users u2 ON f.id_recepteur = u2.id_user
		LEFT JOIN profile_pro pp ON f.id_emetteur = pp.id_user
		LEFT JOIN profile_senior ps ON f.id_recepteur = ps.id_user
		WHERE f.id_facture = $1
	`

	var f FactureDisplay
	err := database.DB.QueryRow(query, id).Scan(
		&f.Id_facture, &f.Id_emetteur, &f.Id_recepteur, &f.Id_intervention,
		&f.NomEmetteur, &f.PrenomEmetteur,
		&f.NomRecepteur, &f.PrenomRecepteur,
		&f.Montant_ht, &f.Montant_ttc, &f.Commission_sh, &f.Pdf_url,
	)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(f)
}