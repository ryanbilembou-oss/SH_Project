package stripe

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"silver-happy-api/database"
)

type CheckoutInterventionRequest struct {
	IDSenior       int    `json:"id_senior"`
	IDDevis        int    `json:"id_devis"`
	IDIntervention int    `json:"id_intervention"`
	RedirectURL    string `json:"redirect_url"`
}

func CheckoutIntervention(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req CheckoutInterventionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDSenior == 0 || req.IDDevis == 0 || req.IDIntervention == 0 {
		http.Error(w, `{"erreur": "id_senior, id_devis et id_intervention obligatoires"}`, 400)
		return
	}

	var montantTTC float64
	var nomService string
	var idPro int
	err := database.DB.QueryRow(`
		SELECT d.montant_ttc, COALESCE(s.nom, 'Intervention'), d.id_pro
		FROM devis d
		LEFT JOIN service s ON s.id = d.id_service
		WHERE d.id_devis = $1 AND d.statut = 'accepte'
	`, req.IDDevis).Scan(&montantTTC, &nomService, &idPro)
	if err != nil {
		log.Printf("CheckoutIntervention - Erreur query devis: %v", err)
		http.Error(w, `{"erreur": "Devis introuvable ou non accepte"}`, 404)
		return
	}

	if montantTTC <= 0 {
		log.Printf("CheckoutIntervention - Montant invalide: %.2f", montantTTC)
		http.Error(w, `{"erreur": "Montant invalide"}`, 400)
		return
	}

	montantCentimes := int64(montantTTC * 100)

	var idPaiement int
	err = database.DB.QueryRow(`
		INSERT INTO paiements (id_user, prix, type_objet, id_objet, statut)
		VALUES ($1, $2, 'intervention', $3, 'en_attente')
		RETURNING id_paiement
	`, req.IDSenior, montantTTC, req.IDIntervention).Scan(&idPaiement)
	if err != nil {
		log.Printf("CheckoutIntervention - Erreur INSERT paiement: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	baseURL := req.RedirectURL
	if baseURL == "" {
		baseURL = "http://172.16.90.10:8080/users/seniors/devis.php"
	}

	params := url.Values{}
	params.Set("mode", "payment")
	params.Set("success_url", fmt.Sprintf("%s?success=1&id_paiement=%d", baseURL, idPaiement))
	params.Set("cancel_url", fmt.Sprintf("%s?cancelled=1", baseURL))
	params.Set("line_items[0][price_data][currency]", "eur")
	params.Set("line_items[0][price_data][product_data][name]", fmt.Sprintf("Intervention - %s", nomService))
	params.Set("line_items[0][price_data][unit_amount]", fmt.Sprintf("%d", montantCentimes))
	params.Set("line_items[0][quantity]", "1")
	params.Set("metadata[id_user]", fmt.Sprintf("%d", req.IDSenior))
	params.Set("metadata[type]", "intervention")
	params.Set("metadata[id_devis]", fmt.Sprintf("%d", req.IDDevis))
	params.Set("metadata[id_intervention]", fmt.Sprintf("%d", req.IDIntervention))
	params.Set("metadata[id_pro]", fmt.Sprintf("%d", idPro))
	params.Set("metadata[id_paiement]", fmt.Sprintf("%d", idPaiement))

	sessionURL, sessionID, err := createCheckoutSession(params)
	if err != nil {
		log.Printf("CheckoutIntervention - Erreur Stripe: %v", err)
		database.DB.Exec(`DELETE FROM paiements WHERE id_paiement = $1`, idPaiement)
		http.Error(w, `{"erreur": "Erreur service de paiement"}`, 500)
		return
	}

	database.DB.Exec(`UPDATE paiements SET stripe_session_id = $1 WHERE id_paiement = $2`, sessionID, idPaiement)

	log.Printf("Session Stripe intervention: senior=%d devis=%d intervention=%d montant=%.2f paiement=%d",
		req.IDSenior, req.IDDevis, req.IDIntervention, montantTTC, idPaiement)
	json.NewEncoder(w).Encode(map[string]string{"url": sessionURL})
}