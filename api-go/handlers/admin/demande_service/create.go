package demande_service

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DemandeRequest struct {
	IdSenior      int    `json:"id_senior"`
	IdOffre       int    `json:"id_offre"`
	DateSouhaitee string `json:"date_souhaitee"`
	Message       string `json:"message"`
}

type DemandeDisplay struct {
	IdDemande     int     `json:"id_demande"`
	IdSenior      int     `json:"id_senior"`
	IdOffre       int     `json:"id_offre"`
	IdPro         int     `json:"id_pro"`
	IdService     int     `json:"id_service"`
	NomService    string  `json:"nom_service"`
	NomPro        string  `json:"nom_pro"`
	PrenomPro     string  `json:"prenom_pro"`
	PrixPerso     float64 `json:"prix_personnalise"`
	DateSouhaitee string  `json:"date_souhaitee"`
	Message       *string `json:"message"`
	Statut        string  `json:"statut"`
	DateCreation  string  `json:"date_creation"`
}

func CreateDemande(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req DemandeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.IdSenior == 0 || req.IdOffre == 0 || req.DateSouhaitee == "" {
		http.Error(w, `{"erreur": "id_senior, id_offre et date_souhaitee sont obligatoires"}`, http.StatusBadRequest)
		return
	}
 
	var exists bool
	database.DB.QueryRow(`SELECT EXISTS(SELECT 1 FROM offre_prestataire WHERE id_offre = $1)`, req.IdOffre).Scan(&exists)
	if !exists {
		http.Error(w, `{"erreur": "Offre introuvable"}`, http.StatusNotFound)
		return
	} 
	var dejaEnCours bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM demande_service WHERE id_senior = $1 AND id_offre = $2 AND statut = 'en_attente')`,
		req.IdSenior, req.IdOffre,
	).Scan(&dejaEnCours)
	if dejaEnCours {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"erreur": "Vous avez déjà une demande en cours pour cette offre"})
		return
	}

	var newId int
	err := database.DB.QueryRow(
		`INSERT INTO demande_service (id_senior, id_offre, date_souhaitee, message)
		 VALUES ($1, $2, $3, $4)
		 RETURNING id_demande`,
		req.IdSenior, req.IdOffre, req.DateSouhaitee, req.Message,
	).Scan(&newId)
	if err != nil {
		log.Printf("❌ CreateDemande - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Demande service créée: id=%d, senior=%d, offre=%d", newId, req.IdSenior, req.IdOffre)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "id_demande": newId})
}

func GetDemandesBySenior(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "id manquant"}`, http.StatusBadRequest)
		return
	}

	query := `
		SELECT ds.id_demande, ds.id_senior, ds.id_offre,
			op.id_pro, op.id_service, s.nom,
			pp.nom, pp.prenom, op.prix_personnalise,
			to_char(ds.date_souhaitee, 'YYYY-MM-DD"T"HH24:MI:SS'),
			ds.message, ds.statut,
			to_char(ds.date_creation, 'YYYY-MM-DD"T"HH24:MI:SS'),
			COALESCE(ps.nom, ''), COALESCE(ps.prenom, '')
		FROM demande_service ds
		INNER JOIN offre_prestataire op ON ds.id_offre = op.id_offre
		INNER JOIN service s ON op.id_service = s.id
		LEFT JOIN profile_pro pp ON op.id_pro = pp.id_user
		LEFT JOIN profile_senior ps ON ds.id_senior = ps.id_user
		WHERE ds.id_senior = $1
		ORDER BY ds.date_creation DESC
	`

	rows, err := database.DB.Query(query, id)
	if err != nil {
		log.Printf("GetDemandesBySenior error: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type DemandeExt struct {
		DemandeDisplay
		NomSenior    string `json:"nom_senior"`
		PrenomSenior string `json:"prenom_senior"`
	}

	demandes := []DemandeExt{}
	for rows.Next() {
		var d DemandeExt
		err := rows.Scan(&d.IdDemande, &d.IdSenior, &d.IdOffre,
			&d.IdPro, &d.IdService, &d.NomService,
			&d.NomPro, &d.PrenomPro, &d.PrixPerso,
			&d.DateSouhaitee, &d.Message, &d.Statut, &d.DateCreation,
			&d.NomSenior, &d.PrenomSenior)
		if err != nil {
			log.Printf("GetDemandesBySenior scan error: %v", err)
			continue
		}
		demandes = append(demandes, d)
	}

	json.NewEncoder(w).Encode(demandes)
}

func GetAllDemandes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	query := `
		SELECT ds.id_demande, ds.id_senior, ds.id_offre,
			op.id_pro, op.id_service, s.nom,
			pp.nom, pp.prenom, op.prix_personnalise,
			to_char(ds.date_souhaitee, 'YYYY-MM-DD"T"HH24:MI:SS'),
			ds.message, ds.statut,
			to_char(ds.date_creation, 'YYYY-MM-DD"T"HH24:MI:SS'),
			COALESCE(ps.nom, ''), COALESCE(ps.prenom, '')
		FROM demande_service ds
		INNER JOIN offre_prestataire op ON ds.id_offre = op.id_offre
		INNER JOIN service s ON op.id_service = s.id
		LEFT JOIN profile_pro pp ON op.id_pro = pp.id_user
		LEFT JOIN profile_senior ps ON ds.id_senior = ps.id_user
		ORDER BY ds.date_creation DESC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("GetAllDemandes error: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	type DemandeExt struct {
		DemandeDisplay
		NomSenior    string `json:"nom_senior"`
		PrenomSenior string `json:"prenom_senior"`
	}

	demandes := []DemandeExt{}
	for rows.Next() {
		var d DemandeExt
		err := rows.Scan(&d.IdDemande, &d.IdSenior, &d.IdOffre,
			&d.IdPro, &d.IdService, &d.NomService,
			&d.NomPro, &d.PrenomPro, &d.PrixPerso,
			&d.DateSouhaitee, &d.Message, &d.Statut, &d.DateCreation,
			&d.NomSenior, &d.PrenomSenior)
		if err != nil {
			log.Printf("GetAllDemandes scan error: %v", err)
			continue
		}
		demandes = append(demandes, d)
	}

	json.NewEncoder(w).Encode(demandes)
}


func UpdateStatutDemande(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		IdDemande int    `json:"id_demande"`
		Statut    string `json:"statut"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.IdDemande == 0 || req.Statut == "" {
		http.Error(w, `{"erreur": "id_demande et statut sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(
		`UPDATE demande_service SET statut = $1 WHERE id_demande = $2`,
		req.Statut, req.IdDemande,
	)
	if err != nil {
		log.Printf("❌ UpdateStatutDemande - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Demande introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Demande %d → statut %s", req.IdDemande, req.Statut)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}

func DeleteDemande(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "id manquant"}`, http.StatusBadRequest)
		return
	}

	result, err := database.DB.Exec(`DELETE FROM demande_service WHERE id_demande = $1`, id)
	if err != nil {
		log.Printf("❌ DeleteDemande - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Demande introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("✅ Demande %s supprimée", id)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}