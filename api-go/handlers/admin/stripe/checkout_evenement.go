package stripe

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"silver-happy-api/database"
)

type CheckoutEvenementRequest struct {
	IDUser      int    `json:"id_user"`
	IDEvenement int    `json:"id_evenement"`
	Titre       string `json:"titre"`
	Prix        int64  `json:"prix"`
	Quantite    int    `json:"quantite"`
}

func CheckoutEvenement(w http.ResponseWriter, r *http.Request) {
	setCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(200)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	var req CheckoutEvenementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, 400)
		return
	}

	if req.IDUser == 0 || req.IDEvenement == 0 || req.Prix <= 0 {
		http.Error(w, `{"erreur": "id_user, id_evenement et prix obligatoires"}`, 400)
		return
	}

	if req.Quantite <= 0 {
		req.Quantite = 1
	}

	var idPaiement int
	err := database.DB.QueryRow(`
		INSERT INTO paiements (id_user, prix, type_objet, id_objet, statut)
		VALUES ($1, $2, 'evenement', $3, 'en_attente')
		RETURNING id_paiement
	`, req.IDUser, float64(req.Prix*int64(req.Quantite))/100.0, req.IDEvenement).Scan(&idPaiement)
	if err != nil {
		log.Printf("❌ CheckoutEvenement - Erreur INSERT: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}

	params := url.Values{}
	params.Set("mode", "payment")
	params.Set("success_url", fmt.Sprintf("http://localhost:8080/users/seniors/panier/panier.php?success=1&id_paiement=%d", idPaiement))
	params.Set("cancel_url", "http://localhost:8080/users/seniors/panier/panier.php?cancelled=1")
	params.Set("line_items[0][price_data][currency]", "eur")
	params.Set("line_items[0][price_data][product_data][name]", req.Titre)
	params.Set("line_items[0][price_data][unit_amount]", fmt.Sprintf("%d", req.Prix))
	params.Set("line_items[0][quantity]", fmt.Sprintf("%d", req.Quantite))
	params.Set("metadata[id_user]", fmt.Sprintf("%d", req.IDUser))
	params.Set("metadata[type]", "evenement")
	params.Set("metadata[id_item]", fmt.Sprintf("%d", req.IDEvenement))
	params.Set("metadata[quantite]", fmt.Sprintf("%d", req.Quantite))
	params.Set("metadata[id_paiement]", fmt.Sprintf("%d", idPaiement))

	sessionURL, sessionID, err := createCheckoutSession(params)
	if err != nil {
		log.Printf("❌ CheckoutEvenement - Erreur Stripe: %v", err)
		database.DB.Exec(`DELETE FROM paiements WHERE id_paiement = $1`, idPaiement)
		http.Error(w, `{"erreur": "Erreur service de paiement"}`, 500)
		return
	}

	database.DB.Exec(`UPDATE paiements SET stripe_session_id = $1 WHERE id_paiement = $2`, sessionID, idPaiement)

	log.Printf("✅ Session Stripe événement: user=%d, event=%d, qty=%d", req.IDUser, req.IDEvenement, req.Quantite)
	json.NewEncoder(w).Encode(map[string]string{"url": sessionURL})
}