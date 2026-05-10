package litiges

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type LitigeDisplay struct {
	IdLitige        int     `json:"id_litige"`
	IdIntervention  int     `json:"id_intervention"`
	IdSenior        *int    `json:"id_senior"`
	IdPro           *int    `json:"id_pro"`
	NomSenior       string  `json:"nom_senior"`
	PrenomSenior    string  `json:"prenom_senior"`
	NomPro          string  `json:"nom_pro"`
	PrenomPro       string  `json:"prenom_pro"`
	NomService      string  `json:"nom_service"`
	DateIntervention string `json:"date_intervention"`
	PrixIntervention float64 `json:"prix_intervention"`
	Lieu            string  `json:"lieu"`
	Motif           string  `json:"motif"`
	Statut          string  `json:"statut"`
	StatutDetail    string  `json:"statut_detail"`
	OuvertPar       string  `json:"ouvert_par"`
	Decision        *string `json:"decision"`
	DateOuverture   string  `json:"date_ouverture"`
	DateFermeture   *string `json:"date_fermeture"`
}

var litigeQuery = `
	SELECT
		l.id_litige, l.id_intervention,
		l.id_senior, l.id_pro,
		COALESCE(ps.nom, ''), COALESCE(ps.prenom, ''),
		COALESCE(pp.nom, ''), COALESCE(pp.prenom, ''),
		COALESCE(s.nom, ''),
		i.date_heure_debut::text,
		i.prix, i.lieu,
		l.motif, l.statut,
		COALESCE(l.statut_detail, 'ouvert'),
		COALESCE(l.ouvert_par, 'senior'),
		l.decision,
		l.date_ouverture::text,
		l.date_fermeture::text
	FROM litiges l
	LEFT JOIN intervention i ON l.id_intervention = i.id
	LEFT JOIN service s ON i.id_service = s.id
	LEFT JOIN profile_senior ps ON l.id_senior = ps.id_user
	LEFT JOIN profile_pro pp ON l.id_pro = pp.id_user
`

func scanLitige(row interface{ Scan(...interface{}) error }) (LitigeDisplay, error) {
	var l LitigeDisplay
	var dateFermeture sql.NullString
	err := row.Scan(
		&l.IdLitige, &l.IdIntervention,
		&l.IdSenior, &l.IdPro,
		&l.NomSenior, &l.PrenomSenior,
		&l.NomPro, &l.PrenomPro,
		&l.NomService,
		&l.DateIntervention,
		&l.PrixIntervention, &l.Lieu,
		&l.Motif, &l.Statut,
		&l.StatutDetail, &l.OuvertPar,
		&l.Decision,
		&l.DateOuverture,
		&dateFermeture,
	)
	if dateFermeture.Valid {
		l.DateFermeture = &dateFermeture.String
	}
	return l, err
}

func GetAllLitiges(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	rows, err := database.DB.Query(litigeQuery + " ORDER BY l.date_ouverture DESC")
	if err != nil {
		log.Printf("GetAllLitiges error: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	var litiges []LitigeDisplay
	for rows.Next() {
		l, err := scanLitige(rows)
		if err != nil { log.Printf("scan error: %v", err); continue }
		litiges = append(litiges, l)
	}
	if litiges == nil { litiges = []LitigeDisplay{} }
	json.NewEncoder(w).Encode(litiges)
}

func GetLitigesByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	idUser := r.URL.Query().Get("id_user")
	role := r.URL.Query().Get("role")
	if idUser == "" { w.WriteHeader(400); return }

	var query string
	if role == "pro" {
		query = litigeQuery + " WHERE l.id_pro = $1 ORDER BY l.date_ouverture DESC"
	} else {
		query = litigeQuery + " WHERE l.id_senior = $1 ORDER BY l.date_ouverture DESC"
	}

	rows, err := database.DB.Query(query, idUser)
	if err != nil {
		log.Printf("GetLitigesByUser error: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	var litiges []LitigeDisplay
	for rows.Next() {
		l, err := scanLitige(rows)
		if err != nil { continue }
		litiges = append(litiges, l)
	}
	if litiges == nil { litiges = []LitigeDisplay{} }
	json.NewEncoder(w).Encode(litiges)
}

func GetOneLitige(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	if id == "" { w.WriteHeader(400); return }

	row := database.DB.QueryRow(litigeQuery+" WHERE l.id_litige = $1", id)
	l, err := scanLitige(row)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	json.NewEncoder(w).Encode(l)
}