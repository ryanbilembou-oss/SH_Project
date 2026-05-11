package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type OffreByServiceDisplay struct {
	IdOffre        int     `json:"id_offre"`
	IdPro          int     `json:"id_pro"`
	IdService      int     `json:"id_service"`
	PrixPerso      float64 `json:"prix_personnalise"`
	Titre          *string `json:"titre"`
	Bio            *string `json:"bio"`
	NomPro         string  `json:"nom_pro"`
	PrenomPro      string  `json:"prenom_pro"`
	NomEntreprise  *string `json:"nom_entreprise"`
	LogoURL        *string `json:"logo_url"`
	NoteMoyenne    float64 `json:"note_moyenne"`
	TelephonePro   *string `json:"telephone_pro"`
}

func GetOffresByService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	idService := r.URL.Query().Get("id_service")
	if idService == "" {
		http.Error(w, `{"erreur": "id_service manquant"}`, http.StatusBadRequest)
		return
	}

	query := `
		SELECT op.id_offre, op.id_pro, op.id_service, op.prix_personnalise,
			op.titre, op.bio,
			pp.nom, pp.prenom, pp.nom_entreprise, pp.logo_url, pp.note_moyenne, pp.telephone_pro
		FROM offre_prestataire op
		INNER JOIN profile_pro pp ON op.id_pro = pp.id_user
		WHERE op.id_service = $1
			AND pp.statut_validation = 'valide'
		ORDER BY pp.note_moyenne DESC
	`

	rows, err := database.DB.Query(query, idService)
	if err != nil {
		log.Printf("❌ GetOffresByService - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	offres := []OffreByServiceDisplay{}
	for rows.Next() {
		var o OffreByServiceDisplay
		err := rows.Scan(&o.IdOffre, &o.IdPro, &o.IdService, &o.PrixPerso,
			&o.Titre, &o.Bio,
			&o.NomPro, &o.PrenomPro, &o.NomEntreprise, &o.LogoURL, &o.NoteMoyenne, &o.TelephonePro)
		if err != nil {
			log.Printf("⚠️ GetOffresByService - Erreur Scan: %v", err)
			continue
		}
		offres = append(offres, o)
	}

	json.NewEncoder(w).Encode(offres)
}