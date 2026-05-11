package facture

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"log"
)

type FactureDisplay struct {
	Id_facture        int      `json:"id_facture"`
	Id_emetteur       int      `json:"id_emetteur"`
	Id_recepteur      int      `json:"id_recepteur"`
	Id_intervention   *int     `json:"id_intervention"`
	NomEmetteur       string   `json:"nom_emetteur"`
	PrenomEmetteur    string   `json:"prenom_emetteur"`
	TelephoneEmetteur *string  `json:"telephone_emetteur"`
	AdresseEmetteur   *string  `json:"adresse_emetteur"`
	SiretEmetteur     *string  `json:"siret_emetteur"`
	NomEntreprise     *string  `json:"nom_entreprise"`
	NomRecepteur      string   `json:"nom_recepteur"`
	PrenomRecepteur   string   `json:"prenom_recepteur"`
	NomService        *string  `json:"nom_service"`
	NomCategorie      *string  `json:"nom_categorie"`
	DateHeureDebut    *string  `json:"date_heure_debut"`
	DateHeureFin      *string  `json:"date_heure_fin"`
	Lieu              *string  `json:"lieu"`
	BioIntervention   *string  `json:"bio_intervention"`
	Montant_ht        float64  `json:"montant_ht"`
	Montant_ttc       float64  `json:"montant_ttc"`
	Commission_sh     float64  `json:"commission_sh"`
	GainNet           float64  `json:"gain_net"`
	TypeAchat         *string  `json:"type_achat"`
	IdAchat           *int     `json:"id_achat"`
	DetailsJson       *string  `json:"details_json"`
	Pdf_url           *string  `json:"pdf_url"`
}

var factureQuery = `
	SELECT 
		f.id_facture, f.id_emetteur, f.id_recepteur, f.id_intervention,
		COALESCE(pp.nom, u1.email),
		COALESCE(pp.prenom, ''),
		pp.telephone_pro,
		pp.adresse_pro,
		pp.siret,
		pp.nom_entreprise,
		COALESCE(ps.nom, u2.email),
		COALESCE(ps.prenom, ''),
		s.nom,
		cs.nom_categorie,
		i.date_heure_debut::text,
		i.date_heure_fin::text,
		i.lieu,
		i.bio_intervention,
		f.montant_ht, f.montant_ttc, f.commission_sh,
		f.montant_ht - f.commission_sh as gain_net,
		f.type_achat,
		f.id_achat,
		f.details_json,
		f.pdf_url
	FROM facture f
	LEFT JOIN users u1 ON f.id_emetteur = u1.id_user
	LEFT JOIN users u2 ON f.id_recepteur = u2.id_user
	LEFT JOIN profile_pro pp ON f.id_emetteur = pp.id_user
	LEFT JOIN profile_senior ps ON f.id_recepteur = ps.id_user
	LEFT JOIN intervention i ON f.id_intervention = i.id
	LEFT JOIN service s ON i.id_service = s.id
	LEFT JOIN categorie_services cs ON s.id_categorie = cs.id_categorie
`

func scanFacture(rows interface{ Scan(...interface{}) error }) (FactureDisplay, error) {
	var f FactureDisplay
	err := rows.Scan(
		&f.Id_facture, &f.Id_emetteur, &f.Id_recepteur, &f.Id_intervention,
		&f.NomEmetteur, &f.PrenomEmetteur,
		&f.TelephoneEmetteur, &f.AdresseEmetteur, &f.SiretEmetteur, &f.NomEntreprise,
		&f.NomRecepteur, &f.PrenomRecepteur,
		&f.NomService, &f.NomCategorie,
		&f.DateHeureDebut, &f.DateHeureFin,
		&f.Lieu, &f.BioIntervention,
		&f.Montant_ht, &f.Montant_ttc, &f.Commission_sh, &f.GainNet,
		&f.TypeAchat, &f.IdAchat, &f.DetailsJson,
		&f.Pdf_url,
	)
	return f, err
}

func GetAllFactures(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	rows, err := database.DB.Query(factureQuery + " ORDER BY f.id_facture DESC")
	if err != nil {
		log.Printf("❌ GetAllFactures: %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	factures := []FactureDisplay{}
	for rows.Next() {
		f, err := scanFacture(rows)
		if err != nil { log.Printf("⚠️ GetAllFactures scan: %v", err); continue }
		factures = append(factures, f)
	}
	json.NewEncoder(w).Encode(factures)
}

func GetFacture(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	id := r.URL.Query().Get("id")
	if id == "" { w.WriteHeader(http.StatusBadRequest); return }

	row := database.DB.QueryRow(factureQuery+" WHERE f.id_facture = $1", id)
	f, err := scanFacture(row)
	if err != nil {
		log.Printf("❌ GetFacture ID %s: %v", id, err)
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(f)
}