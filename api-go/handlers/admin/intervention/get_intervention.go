package intervention

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type InterventionDisplay struct {
	Id                 int     `json:"id"`
	Id_pro             int     `json:"id_pro"`
	Id_senior          int     `json:"id_senior"`
	Id_service         int     `json:"id_service"`
	NomService         string  `json:"nom_service"`
	NomPro             string  `json:"nom_pro"`
	PrenomPro          string  `json:"prenom_pro"`
	NomSenior          string  `json:"nom_senior"`
	PrenomSenior       string  `json:"prenom_senior"`
	Bio_intervention   *string `json:"bio_intervention"`
	Date_heure_debut   string  `json:"date_heure_debut"`
	Date_heure_fin     string  `json:"date_heure_fin"`
	Lieu               string  `json:"lieu"`
	Statut             string  `json:"statut"`
	Commission_montant float64 `json:"commission_montant"`
	Prix               float64 `json:"prix"`
	Est_medical        bool    `json:"est_medical"`
}

func GetAllInterventions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	query := `
		SELECT 
			i.id, i.id_pro, i.id_senior, i.id_service,
			s.nom,
			pp.nom, pp.prenom,
			ps.nom, ps.prenom,
			i.bio_intervention,
			i.date_heure_debut::text,
			i.date_heure_fin::text,
			i.lieu, i.statut,
			i.commission_montant, i.prix, i.est_medical
		FROM intervention i
		INNER JOIN service s ON i.id_service = s.id
		LEFT JOIN profile_pro pp ON i.id_pro = pp.id_user
		LEFT JOIN profile_senior ps ON i.id_senior = ps.id_user
		ORDER BY i.date_heure_debut DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllInterventions - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
		return
	}
	defer rows.Close()

	interventions := []InterventionDisplay{}
	for rows.Next() {
		var i InterventionDisplay
		err := rows.Scan(
			&i.Id, &i.Id_pro, &i.Id_senior, &i.Id_service,
			&i.NomService,
			&i.NomPro, &i.PrenomPro,
			&i.NomSenior, &i.PrenomSenior,
			&i.Bio_intervention,
			&i.Date_heure_debut,
			&i.Date_heure_fin,
			&i.Lieu, &i.Statut,
			&i.Commission_montant, &i.Prix, &i.Est_medical,
		)
		if err != nil {
			log.Printf("⚠️ GetAllInterventions - Erreur Scan : %v", err)
			continue
		}
		interventions = append(interventions, i)
	}

	json.NewEncoder(w).Encode(interventions)
}