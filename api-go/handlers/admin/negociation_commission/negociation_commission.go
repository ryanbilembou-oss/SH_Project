package negociation_commission

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"time"
)
 
func GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	rows, err := database.DB.Query(`
		SELECT n.id, n.id_pro, n.taux_propose, n.taux_actuel, n.message,
		       n.statut, n.reponse_admin, n.date_demande, n.date_reponse,
		       COALESCE(pp.prenom, '') as prenom, COALESCE(pp.nom, '') as nom,
		       COALESCE(pp.nom_entreprise, '') as nom_entreprise
		FROM negociation_commission n
		LEFT JOIN profile_pro pp ON n.id_pro = pp.id_user
		ORDER BY n.date_demande DESC
	`)
	if err != nil {
		log.Printf("❌ GetAll négociation: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	type Row struct {
		Id             int        `json:"id"`
		Id_pro         int        `json:"id_pro"`
		TauxPropose    float64    `json:"taux_propose"`
		TauxActuel     float64    `json:"taux_actuel"`
		Message        *string    `json:"message"`
		Statut         string     `json:"statut"`
		ReponseAdmin   *string    `json:"reponse_admin"`
		DateDemande    time.Time  `json:"date_demande"`
		DateReponse    *time.Time `json:"date_reponse"`
		Prenom         string     `json:"prenom"`
		Nom            string     `json:"nom"`
		NomEntreprise  string     `json:"nom_entreprise"`
	}

	var results []Row
	for rows.Next() {
		var row Row
		rows.Scan(&row.Id, &row.Id_pro, &row.TauxPropose, &row.TauxActuel,
			&row.Message, &row.Statut, &row.ReponseAdmin,
			&row.DateDemande, &row.DateReponse,
			&row.Prenom, &row.Nom, &row.NomEntreprise)
		results = append(results, row)
	}
	if results == nil { results = []Row{} }
	json.NewEncoder(w).Encode(results)
}
 
func GetByPro(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	id := r.URL.Query().Get("id")
	if id == "" { w.WriteHeader(400); return }

	rows, err := database.DB.Query(`
		SELECT id, id_pro, taux_propose, taux_actuel, message,
		       statut, reponse_admin, date_demande, date_reponse
		FROM negociation_commission WHERE id_pro = $1
		ORDER BY date_demande DESC
	`, id)
	if err != nil { w.WriteHeader(500); return }
	defer rows.Close()

	type Row struct {
		Id           int        `json:"id"`
		Id_pro       int        `json:"id_pro"`
		TauxPropose  float64    `json:"taux_propose"`
		TauxActuel   float64    `json:"taux_actuel"`
		Message      *string    `json:"message"`
		Statut       string     `json:"statut"`
		ReponseAdmin *string    `json:"reponse_admin"`
		DateDemande  time.Time  `json:"date_demande"`
		DateReponse  *time.Time `json:"date_reponse"`
	}

	var results []Row
	for rows.Next() {
		var row Row
		rows.Scan(&row.Id, &row.Id_pro, &row.TauxPropose, &row.TauxActuel,
			&row.Message, &row.Statut, &row.ReponseAdmin,
			&row.DateDemande, &row.DateReponse)
		results = append(results, row)
	}
	if results == nil { results = []Row{} }
	json.NewEncoder(w).Encode(results)
}
 
func Create(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req struct {
		IdPro       int     `json:"id_pro"`
		TauxPropose float64 `json:"taux_propose"`
		Message     string  `json:"message"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "Format invalide"})
		return
	}
	if req.IdPro == 0 || req.TauxPropose <= 0 {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "id_pro et taux_propose obligatoires"})
		return
	}
	if req.TauxPropose < 1 || req.TauxPropose > 30 {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "Taux doit être entre 1% et 30%"})
		return
	}
 
	var exists bool
	database.DB.QueryRow(
		`SELECT EXISTS(SELECT 1 FROM negociation_commission WHERE id_pro = $1 AND statut = 'en_attente')`,
		req.IdPro,
	).Scan(&exists)
	if exists {
		w.WriteHeader(409)
		json.NewEncoder(w).Encode(map[string]string{"error": "Une demande est déjà en attente"})
		return
	}
 
	var tauxActuel float64
	database.DB.QueryRow(`SELECT COALESCE(commission, 15) FROM profile_pro WHERE id_user = $1`, req.IdPro).Scan(&tauxActuel)

	var newId int
	err := database.DB.QueryRow(`
		INSERT INTO negociation_commission (id_pro, taux_propose, taux_actuel, message, statut)
		VALUES ($1, $2, $3, NULLIF($4, ''), 'en_attente')
		RETURNING id
	`, req.IdPro, req.TauxPropose, tauxActuel, req.Message).Scan(&newId)
	if err != nil {
		log.Printf("❌ Create négociation: %v", err)
		w.WriteHeader(500)
		return
	}

	log.Printf("✅ Négociation commission créée: id=%d pro=%d taux=%.1f%%", newId, req.IdPro, req.TauxPropose)
	w.WriteHeader(201)
	json.NewEncoder(w).Encode(map[string]interface{}{"id": newId})
}
 
func Repondre(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "PUT" { w.WriteHeader(405); return }

	var req struct {
		Id           int     `json:"id"`
		Statut       string  `json:"statut"`
		ReponseAdmin string  `json:"reponse_admin"`
		TauxFinal    float64 `json:"taux_final"` 
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		return
	}
	if req.Id == 0 || (req.Statut != "accepte" && req.Statut != "refuse") {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "id et statut (accepte/refuse) obligatoires"})
		return
	}
 
	_, err := database.DB.Exec(`
		UPDATE negociation_commission
		SET statut = $1, reponse_admin = NULLIF($2, ''), date_reponse = NOW()
		WHERE id = $3
	`, req.Statut, req.ReponseAdmin, req.Id)
	if err != nil {
		log.Printf("❌ Repondre négociation: %v", err)
		w.WriteHeader(500)
		return
	}

 
	if req.Statut == "accepte" {
 
		var idPro int
		var tauxPropose float64
		database.DB.QueryRow(
			`SELECT id_pro, taux_propose FROM negociation_commission WHERE id = $1`,
			req.Id,
		).Scan(&idPro, &tauxPropose)
 
		taux := tauxPropose
		if req.TauxFinal > 0 {
			taux = req.TauxFinal
		}

		database.DB.Exec(`UPDATE profile_pro SET commission = $1 WHERE id_user = $2`, taux, idPro)
		log.Printf("✅ Commission mise à jour: pro=%d taux=%.1f%%", idPro, taux)
	}

	log.Printf("✅ Négociation %d → %s", req.Id, req.Statut)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}