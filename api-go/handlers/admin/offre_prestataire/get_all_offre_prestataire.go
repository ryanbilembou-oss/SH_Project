package offre_prestataire

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type OffreDisplay struct {
	Id_offre          int      `json:"id_offre"`
	Id_pro            int      `json:"id_pro"`
	Id_service        int      `json:"id_service"`
	NomPro            string   `json:"nom_pro"`
	PrenomPro         string   `json:"prenom_pro"`
	NomService        string   `json:"nom_service"`
	Prix_personnalise float64  `json:"prix_personnalise"`
	Titre             string   `json:"titre"`
	Bio               *string  `json:"bio"`
}

func GetAllOffresPrestataire(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	query := `
		SELECT o.id_offre, o.id_pro, o.id_service,
			pp.nom, pp.prenom,
			s.nom,
			o.prix_personnalise, o.titre, o.bio
		FROM offre_prestataire o
		LEFT JOIN profile_pro pp ON o.id_pro = pp.id_user
		LEFT JOIN service s ON o.id_service = s.id
		ORDER BY o.id_offre DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllOffresPrestataire - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	offres := []OffreDisplay{}
	for rows.Next() {
		var o OffreDisplay
		if err := rows.Scan(&o.Id_offre, &o.Id_pro, &o.Id_service, &o.NomPro, &o.PrenomPro, &o.NomService, &o.Prix_personnalise, &o.Titre, &o.Bio); err != nil {
			log.Printf("⚠️ GetAllOffresPrestataire - Erreur scan: %v", err)
			continue
		}
		offres = append(offres, o)
	}
	json.NewEncoder(w).Encode(offres)
}