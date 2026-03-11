package payments

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/stripe/stripe-go/v84"
	"github.com/stripe/stripe-go/v84/checkout/session"
)

// CheckoutArticleRequest : Structure d'entrée
type CheckoutArticleRequest struct {
	ArticleID int `json:"article_id"`
}

func CreateArticleCheckout(w http.ResponseWriter, r *http.Request) {
	// Configuration CORS pour permettre au JS de communiquer avec Go
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 1. Ta clé secrète Stripe
	stripe.Key = "sk_test_51T7HX8PoI0jgtoigDEGYH0Y7w8V98EfduUuEQNmB41zrcaQdCekbYLYgVGkEQiNCds6g1QzIaXkq6GLZSiczwOpf00SXtcU7Rj"

	// 2. Décodage du JSON envoyé par le bouton "Acheter"
	var req CheckoutArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Payload JSON invalide", http.StatusBadRequest)
		return
	}

	// 3. Simulation des données (à lier à ta BDD plus tard)
	nomArticle := "Montre Connectée Silver Happy"
	prixEuros := int64(120) // 120 Euros

	domaineBase := "http://localhost:80" // L'URL de ton site PHP

	// 4. Configuration de la session de paiement
	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		Mode:               stripe.String(string(stripe.CheckoutSessionModePayment)),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("eur"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String(nomArticle),
					},
					// Stripe travaille en centimes (120€ = 12000 centimes)
					UnitAmount: stripe.Int64(prixEuros * 100),
				},
				Quantity: stripe.Int64(1),
			},
		},
		SuccessURL: stripe.String(domaineBase + "/paiement_succes.php?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:  stripe.String(domaineBase + "/article_test.php?erreur=annulation"),
	}

	// 5. Création de la session chez Stripe
	s, err := session.New(params)
	if err != nil {
		log.Printf("❌ Erreur Stripe : %v", err)
		http.Error(w, "Erreur lors de l'initialisation du paiement", http.StatusInternalServerError)
		return
	}

	// 6. On renvoie l'URL de paiement au JavaScript
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"url": s.URL,
	})
}