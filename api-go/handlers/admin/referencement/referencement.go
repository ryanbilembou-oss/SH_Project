package referencement

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"silver-happy-api/database"
	"strings"
	"time"
)

func GetActifs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
 
	database.DB.Exec(`UPDATE referencement SET actif = false WHERE date_fin < NOW() AND actif = true`)

	rows, err := database.DB.Query(`
		SELECT r.id, r.id_pro, r.type, r.prix, r.date_debut, r.date_fin, r.actif,
		       COALESCE(pp.prenom, '') as prenom, COALESCE(pp.nom, '') as nom,
		       COALESCE(pp.nom_entreprise, '') as nom_entreprise,
		       COALESCE(pp.note_moyenne, 0) as note_moyenne
		FROM referencement r
		LEFT JOIN profile_pro pp ON r.id_pro = pp.id_user
		WHERE r.actif = true
		ORDER BY r.date_debut DESC
	`)
	if err != nil {
		log.Printf("❌ GetActifs referencement: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	type Row struct {
		Id            int       `json:"id"`
		IdPro         int       `json:"id_pro"`
		Type          string    `json:"type"`
		Prix          float64   `json:"prix"`
		DateDebut     time.Time `json:"date_debut"`
		DateFin       time.Time `json:"date_fin"`
		Actif         bool      `json:"actif"`
		Prenom        string    `json:"prenom"`
		Nom           string    `json:"nom"`
		NomEntreprise string    `json:"nom_entreprise"`
		NoteMoyenne   float64   `json:"note_moyenne"`
	}

	var results []Row
	for rows.Next() {
		var row Row
		rows.Scan(&row.Id, &row.IdPro, &row.Type, &row.Prix,
			&row.DateDebut, &row.DateFin, &row.Actif,
			&row.Prenom, &row.Nom, &row.NomEntreprise, &row.NoteMoyenne)
		results = append(results, row)
	}
	if results == nil { results = []Row{} }
	json.NewEncoder(w).Encode(results)
} 
func GetTous(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	database.DB.Exec(`UPDATE referencement SET actif = false WHERE date_fin < NOW() AND actif = true`)

	rows, err := database.DB.Query(`
		SELECT r.id, r.id_pro, r.type, r.prix, r.date_debut, r.date_fin, r.actif,
		       COALESCE(pp.prenom, '') as prenom, COALESCE(pp.nom, '') as nom,
		       COALESCE(pp.nom_entreprise, '') as nom_entreprise
		FROM referencement r
		LEFT JOIN profile_pro pp ON r.id_pro = pp.id_user
		ORDER BY r.actif DESC, r.date_debut DESC
	`)
	if err != nil {
		log.Printf("❌ GetTous referencement: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	type Row struct {
		Id            int       `json:"id"`
		IdPro         int       `json:"id_pro"`
		Type          string    `json:"type"`
		Prix          float64   `json:"prix"`
		DateDebut     time.Time `json:"date_debut"`
		DateFin       time.Time `json:"date_fin"`
		Actif         bool      `json:"actif"`
		Prenom        string    `json:"prenom"`
		Nom           string    `json:"nom"`
		NomEntreprise string    `json:"nom_entreprise"`
	}

	var results []Row
	for rows.Next() {
		var row Row
		rows.Scan(&row.Id, &row.IdPro, &row.Type, &row.Prix,
			&row.DateDebut, &row.DateFin, &row.Actif,
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
 
	database.DB.Exec(`UPDATE referencement SET actif = false WHERE date_fin < NOW() AND actif = true AND id_pro = $1`, id)

	rows, err := database.DB.Query(`
		SELECT id, id_pro, type, prix, date_debut, date_fin, actif
		FROM referencement WHERE id_pro = $1
		ORDER BY date_debut DESC
	`, id)
	if err != nil { w.WriteHeader(500); return }
	defer rows.Close()

	type Row struct {
		Id        int       `json:"id"`
		IdPro     int       `json:"id_pro"`
		Type      string    `json:"type"`
		Prix      float64   `json:"prix"`
		DateDebut time.Time `json:"date_debut"`
		DateFin   time.Time `json:"date_fin"`
		Actif     bool      `json:"actif"`
	}

	var results []Row
	for rows.Next() {
		var row Row
		rows.Scan(&row.Id, &row.IdPro, &row.Type, &row.Prix, &row.DateDebut, &row.DateFin, &row.Actif)
		results = append(results, row)
	}
	if results == nil { results = []Row{} }
	json.NewEncoder(w).Encode(results)
}
 
func Checkout(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req struct {
		IdPro int    `json:"id_pro"`
		Type  string `json:"type"`  
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "Format invalide"})
		return
	}

	var prix int64
	var duree time.Duration
	var label string

	switch req.Type {
	case "semaine":
		prix  = 500   
		duree = 7 * 24 * time.Hour
		label = "Référencement Silver Happy — 1 semaine"
	case "mois":
		prix  = 1500  
		duree = 30 * 24 * time.Hour
		label = "Référencement Silver Happy — 1 mois"
	default:
		w.WriteHeader(400)
		json.NewEncoder(w).Encode(map[string]string{"error": "type doit être 'semaine' ou 'mois'"})
		return
	}

	dateFin := time.Now().Add(duree)
 
	var newId int
	err := database.DB.QueryRow(`
		INSERT INTO referencement (id_pro, type, prix, date_fin, actif)
		VALUES ($1, $2, $3, $4, false)
		RETURNING id
	`, req.IdPro, req.Type, float64(prix)/100.0, dateFin).Scan(&newId)
	if err != nil {
		log.Printf("❌ Checkout referencement: %v", err)
		w.WriteHeader(500)
		return
	}


	appURL := os.Getenv("APP_URL")
	baseURL := appURL + "/users/pro/referencement_pro.php"
	params  := url.Values{}
	params.Set("mode", "payment")
	params.Set("success_url", fmt.Sprintf("%s?success=1&id_ref=%d", baseURL, newId))
	params.Set("cancel_url",  fmt.Sprintf("%s?cancelled=1", baseURL))
	params.Set("line_items[0][price_data][currency]", "eur")
	params.Set("line_items[0][price_data][product_data][name]", label)
	params.Set("line_items[0][price_data][unit_amount]", fmt.Sprintf("%d", prix))
	params.Set("line_items[0][quantity]", "1")
	params.Set("metadata[id_user]",  fmt.Sprintf("%d", req.IdPro))
	params.Set("metadata[type]",     "referencement")
	params.Set("metadata[id_ref]",   fmt.Sprintf("%d", newId))
	params.Set("metadata[id_paiement]", "0")

	sessionURL, _, err := createCheckoutSession(params)
	if err != nil {
		log.Printf("❌ Stripe referencement: %v", err)
		database.DB.Exec(`DELETE FROM referencement WHERE id = $1`, newId)
		w.WriteHeader(500)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur Stripe"})
		return
	}

	log.Printf("✅ Checkout référencement: pro=%d type=%s id=%d", req.IdPro, req.Type, newId)
	json.NewEncoder(w).Encode(map[string]string{"url": sessionURL})
}
 
func Activer(idRef int) {
	_, err := database.DB.Exec(`UPDATE referencement SET actif = true WHERE id = $1`, idRef)
	if err != nil {
		log.Printf("❌ Activer référencement %d: %v", idRef, err)
	} else {
		log.Printf("✅ Référencement %d activé", idRef)
	}
}
 
func createCheckoutSession(params url.Values) (string, string, error) {
	req, err := http.NewRequest("POST", "https://api.stripe.com/v1/checkout/sessions", strings.NewReader(params.Encode()))
	if err != nil { return "", "", err }
	req.Header.Set("Authorization", "Bearer "+os.Getenv("STRIPE_SECRET_KEY"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil { return "", "", err }
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != 200 {
		return "", "", fmt.Errorf("Stripe %d: %s", resp.StatusCode, string(body))
	}

	var result map[string]interface{}
	json.Unmarshal(body, &result)
	return result["url"].(string), result["id"].(string), nil
}