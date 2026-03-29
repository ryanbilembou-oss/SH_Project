package devis

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DevisDisplay struct {
	Id_devis        int     `json:"id_devis"`
	Id_pro          int     `json:"id_pro"`
	Id_senior       int     `json:"id_senior"`
	Id_service      int     `json:"id_service"`
	NomService      string  `json:"nom_service"`
	NomPro          string  `json:"nom_pro"`
	PrenomPro       string  `json:"prenom_pro"`
	NomSenior       string  `json:"nom_senior"`
	PrenomSenior    string  `json:"prenom_senior"`
	Id_intervention *int    `json:"id_intervention"`
	Montant_ht      float64 `json:"montant_ht"`
	Montant_ttc     float64 `json:"montant_ttc"`
	Taux_commission float64 `json:"taux_commission"`
	Date_validite   string  `json:"date_validite"`
	Statut          string  `json:"statut"`
}

func GetAllDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	query := `
		SELECT d.id_devis, d.id_pro, d.id_senior, d.id_service, s.nom,
			pp.nom, pp.prenom,
			ps.nom, ps.prenom,
			d.id_intervention, d.montant_ht, d.montant_ttc, d.taux_commission,
			d.date_validite::text, d.statut
		FROM devis d
		INNER JOIN service s ON d.id_service = s.id
		LEFT JOIN profile_pro pp ON d.id_pro = pp.id_user
		LEFT JOIN profile_senior ps ON d.id_senior = ps.id_user
		ORDER BY d.date_validite DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllDevis - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}
	defer rows.Close()

	devisList := []DevisDisplay{}
	for rows.Next() {
		var d DevisDisplay
		err := rows.Scan(
			&d.Id_devis, &d.Id_pro, &d.Id_senior, &d.Id_service, &d.NomService,
			&d.NomPro, &d.PrenomPro,
			&d.NomSenior, &d.PrenomSenior,
			&d.Id_intervention, &d.Montant_ht, &d.Montant_ttc, &d.Taux_commission,
			&d.Date_validite, &d.Statut,
		)
		if err != nil {
			log.Printf("⚠️ GetAllDevis - Erreur Scan : %v", err)
			continue
		}
		devisList = append(devisList, d)
	}

	json.NewEncoder(w).Encode(devisList)
}

func GetDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	var d DevisDisplay
	query := `
		SELECT d.id_devis, d.id_pro, d.id_senior, d.id_service, s.nom,
			pp.nom, pp.prenom,
			ps.nom, ps.prenom,
			d.id_intervention, d.montant_ht, d.montant_ttc, d.taux_commission,
			d.date_validite::text, d.statut
		FROM devis d
		INNER JOIN service s ON d.id_service = s.id
		LEFT JOIN profile_pro pp ON d.id_pro = pp.id_user
		LEFT JOIN profile_senior ps ON d.id_senior = ps.id_user
		WHERE d.id_devis = $1
	`

	err := database.DB.QueryRow(query, id).Scan(
		&d.Id_devis, &d.Id_pro, &d.Id_senior, &d.Id_service, &d.NomService,
		&d.NomPro, &d.PrenomPro,
		&d.NomSenior, &d.PrenomSenior,
		&d.Id_intervention, &d.Montant_ht, &d.Montant_ttc, &d.Taux_commission,
		&d.Date_validite, &d.Statut,
	)
	if err != nil {
		log.Printf("❌ GetDevis - ID %s introuvable : %v", id, err)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Devis introuvable"})
		return
	}

	json.NewEncoder(w).Encode(d)
}