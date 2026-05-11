package stripe

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"silver-happy-api/database"
)

type CheckoutAbonnementRequest struct {
	IDUser         int    `json:"id_user"`
	TypeAbonnement string `json:"type_abonnement"`
	Prix           int64  `json:"prix"`
	RedirectURL    string `json:"redirect_url"`  
}

func CheckoutAbonnement(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req CheckoutAbonnementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDUser == 0 || req.TypeAbonnement == "" || req.Prix <= 0 {
		http.Error(w, `{"erreur": "id_user, type_abonnement et prix obligatoires"}`, 400)
		return
	}
 
	baseURL := req.RedirectURL
	if baseURL == "" {
		baseURL = "*/users/seniors/abonnement.php"  
	}

	var idPaiement int
	err := database.DB.QueryRow(`
		INSERT INTO paiements (id_user, prix, type_objet, id_objet, statut)
		VALUES ($1, $2, 'abonnement', $1, 'en_attente')
		RETURNING id_paiement
	`, req.IDUser, float64(req.Prix)/100.0).Scan(&idPaiement)
	if err != nil {
		log.Printf("❌ CheckoutAbonnement - Erreur INSERT paiement: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	titre := fmt.Sprintf("Abonnement %s - Silver Happy", req.TypeAbonnement)
	interval := "month"
	if req.TypeAbonnement == "annuel" {
		interval = "year"
	}

	params := url.Values{}
	params.Set("mode", "subscription")
	params.Set("success_url", fmt.Sprintf("%s?success=1&id_paiement=%d", baseURL, idPaiement))
	params.Set("cancel_url", fmt.Sprintf("%s?cancelled=1", baseURL))
	params.Set("line_items[0][price_data][currency]", "eur")
	params.Set("line_items[0][price_data][product_data][name]", titre)
	params.Set("line_items[0][price_data][unit_amount]", fmt.Sprintf("%d", req.Prix))
	params.Set("line_items[0][price_data][recurring][interval]", interval)
	params.Set("line_items[0][quantity]", "1")
	params.Set("metadata[id_user]", fmt.Sprintf("%d", req.IDUser))
	params.Set("metadata[type]", "abonnement")
	params.Set("metadata[type_abonnement]", req.TypeAbonnement)
	params.Set("metadata[id_paiement]", fmt.Sprintf("%d", idPaiement))

	sessionURL, sessionID, err := createCheckoutSession(params)
	if err != nil {
		log.Printf("❌ CheckoutAbonnement - Erreur Stripe: %v", err)
		database.DB.Exec(`DELETE FROM paiements WHERE id_paiement = $1`, idPaiement)
		http.Error(w, `{"erreur": "Erreur service de paiement"}`, 500)
		return
	}

	database.DB.Exec(`UPDATE paiements SET stripe_session_id = $1 WHERE id_paiement = $2`, sessionID, idPaiement)

	log.Printf("✅ Session Stripe abonnement: user=%d, type=%s, paiement=%d", req.IDUser, req.TypeAbonnement, idPaiement)
	json.NewEncoder(w).Encode(map[string]string{"url": sessionURL})
}