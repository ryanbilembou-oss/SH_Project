package intervention

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func GetIntervention(w http.ResponseWriter, r *http.Request) {
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

	var i InterventionDisplay
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
		WHERE i.id = $1
	`

	err := database.DB.QueryRow(query, id).Scan(
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
		log.Printf("❌ GetIntervention - ID %s introuvable : %v", id, err)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Intervention introuvable"})
		return
	}

	json.NewEncoder(w).Encode(i)
}