package stripe

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"silver-happy-api/database"
)

type PanierItem struct {
	IDPanier  int     `json:"id_panier"`
	TypeObjet string  `json:"type_objet"`
	IDObjet   int     `json:"id_objet"`
	Nom       string  `json:"nom"`
	Prix      float64 `json:"prix"`
	Quantite  int     `json:"quantite"`
}

type CheckoutPanierRequest struct {
	IDUser int          `json:"id_user"`
	Items  []PanierItem `json:"items"`
}

func CheckoutPanier(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req CheckoutPanierRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDUser == 0 || len(req.Items) == 0 {
		http.Error(w, `{"erreur": "id_user et items obligatoires"}`, 400)
		return
	}
 
	var totalCentimes int64
	for _, item := range req.Items {
		totalCentimes += int64(item.Prix*100) * int64(item.Quantite)
	}
 
	var idPaiement int
	err := database.DB.QueryRow(`
		INSERT INTO paiements (id_user, prix, type_objet, id_objet, statut)
		VALUES ($1, $2, 'panier', 0, 'en_attente')
		RETURNING id_paiement
	`, req.IDUser, float64(totalCentimes)/100.0).Scan(&idPaiement)
	if err != nil {
		log.Printf("❌ CheckoutPanier - Erreur INSERT paiement: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	appURL := os.Getenv("APP_URL")
	if appURL == "" { appURL = "http://localhost:8080" }

 
	params := url.Values{}
	params.Set("mode", "payment")
	params.Set("success_url", fmt.Sprintf("%s/users/seniors/panier/panier.php?success=1&id_paiement=%d", appURL, idPaiement))
	params.Set("cancel_url", fmt.Sprintf("%s/users/seniors/panier/panier.php?cancelled=1", appURL))
	params.Set("metadata[id_user]", fmt.Sprintf("%d", req.IDUser))
	params.Set("metadata[type]", "panier")
	params.Set("metadata[id_paiement]", fmt.Sprintf("%d", idPaiement))
 
	itemsJSON, _ := json.Marshal(req.Items)
	params.Set("metadata[items]", string(itemsJSON))

	for i, item := range req.Items {
		prefix := fmt.Sprintf("line_items[%d]", i)
		params.Set(prefix+"[price_data][currency]", "eur")
		params.Set(prefix+"[price_data][product_data][name]", item.Nom)
		params.Set(prefix+"[price_data][unit_amount]", fmt.Sprintf("%d", int64(item.Prix*100)))
		params.Set(prefix+"[quantity]", fmt.Sprintf("%d", item.Quantite))
	}

	sessionURL, sessionID, err := createCheckoutSession(params)
	if err != nil {
		log.Printf("❌ CheckoutPanier - Erreur Stripe: %v", err)
		database.DB.Exec(`DELETE FROM paiements WHERE id_paiement = $1`, idPaiement)
		http.Error(w, `{"erreur": "Erreur service de paiement"}`, 500)
		return
	}

	database.DB.Exec(`UPDATE paiements SET stripe_session_id = $1 WHERE id_paiement = $2`, sessionID, idPaiement)

	log.Printf("✅ Session Stripe panier: user=%d, %d items, total=%.2f€, paiement=%d", req.IDUser, len(req.Items), float64(totalCentimes)/100.0, idPaiement)
	json.NewEncoder(w).Encode(map[string]string{"url": sessionURL})
}