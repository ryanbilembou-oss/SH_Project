package stripe

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"silver-happy-api/database"
	"strings"
)

type RefundRequest struct {
	IDIntervention int `json:"id_intervention"`
	IDSenior       int `json:"id_senior"`
}

func RefundIntervention(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req RefundRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDIntervention == 0 || req.IDSenior == 0 {
		http.Error(w, `{"erreur": "id_intervention et id_senior obligatoires"}`, 400)
		return
	}

	var statut string
	err := database.DB.QueryRow(
		`SELECT statut FROM intervention WHERE id = $1 AND id_senior = $2`,
		req.IDIntervention, req.IDSenior,
	).Scan(&statut)
	if err != nil {
		http.Error(w, `{"erreur": "Intervention introuvable"}`, 404)
		return
	}
	if statut != "planifiee" {
		http.Error(w, `{"erreur": "Remboursement impossible : intervention non planifiee"}`, 400)
		return
	}

	var sessionID string
	err = database.DB.QueryRow(
		`SELECT stripe_session_id FROM paiements WHERE type_objet = 'intervention' AND id_objet = $1 AND statut = 'paye'`,
		req.IDIntervention,
	).Scan(&sessionID)
	if err != nil || sessionID == "" {
		http.Error(w, `{"erreur": "Paiement introuvable"}`, 404)
		return
	}

	paymentIntent, err := getPaymentIntentFromSession(sessionID)
	if err != nil {
		log.Printf("RefundIntervention - getPaymentIntent error: %v", err)
		http.Error(w, `{"erreur": "Impossible de recuperer le paiement Stripe"}`, 500)
		return
	}

	if err := createRefund(paymentIntent); err != nil {
		log.Printf("RefundIntervention - createRefund error: %v", err)
		http.Error(w, `{"erreur": "Erreur lors du remboursement Stripe"}`, 500)
		return
	}

	database.DB.Exec(
		`UPDATE paiements SET statut = 'rembourse' WHERE type_objet = 'intervention' AND id_objet = $1`,
		req.IDIntervention,
	)
	database.DB.Exec(
		`UPDATE intervention SET statut = 'annulee' WHERE id = $1`,
		req.IDIntervention,
	)
	database.DB.Exec(
		`UPDATE devis SET statut = 'annule' WHERE id_intervention = $1`,
		req.IDIntervention,
	)

	log.Printf("Remboursement effectue: intervention=%d senior=%d", req.IDIntervention, req.IDSenior)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Remboursement effectue",
	})
}

func getPaymentIntentFromSession(sessionID string) (string, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("https://api.stripe.com/v1/checkout/sessions/%s", sessionID), nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+getStripeKey())

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var result struct {
		PaymentIntent string `json:"payment_intent"`
		PaymentStatus string `json:"payment_status"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("parse error: %v", err)
	}

	if result.PaymentStatus != "paid" {
		return "", fmt.Errorf("paiement non confirme (statut: %s)", result.PaymentStatus)
	}

	if result.PaymentIntent == "" {
		return "", fmt.Errorf("payment_intent introuvable pour cette session")
	}

	return result.PaymentIntent, nil
}

func createRefund(paymentIntentID string) error {
	params := url.Values{}
	params.Set("payment_intent", paymentIntentID)

	req, err := http.NewRequest("POST", "https://api.stripe.com/v1/refunds", strings.NewReader(params.Encode()))
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", "Bearer "+getStripeKey())
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("Stripe refund error %d: %s", resp.StatusCode, string(body))
	}
	return nil
}