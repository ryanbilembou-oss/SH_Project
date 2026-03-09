package payments

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/stripe/stripe-go/v84"
	"github.com/stripe/stripe-go/v84/checkout/session"
)

// CheckoutArticleRequest : Structure d'entrée (On ne fait confiance qu'à l'ID)
type CheckoutArticleRequest struct {
	ArticleID int `json:"article_id"`
}

func CreateArticleCheckout(w http.ResponseWriter, r *http.Request) {
	// Configuration CORS basique
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 1. Clé secrète (À passer en variable d'environnement os.Getenv en prod)
	stripe.Key = "sk_test_51T7HX8PoI0jgtoigDEGYH0Y7w8V98EfduUuEQNmB41zrcaQdCekbYLYgVGkEQiNCds6g1QzIaXkq6GLZSiczwOpf00SXtcU7Rj"

	// 2. Décodage du payload JS
	var req CheckoutArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Payload JSON invalide", http.StatusBadRequest)
		return
	}

	// 3. VÉRIFICATION SQL (Source de vérité)
	// En production : SELECT nom, prix_euros FROM articles WHERE id = req.ArticleID
	// Simulation pour valider le flux :
	nomArticle := "Montre Connectée Silver Happy"
	prixEuros := int64(120) // 120 Euros

	// 4. Configuration de la session Stripe
	domaineBase := "http://localhost:80" // L'URL de ton serveur PHP

	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		Mode:               stripe.String(string(stripe.CheckoutSessionModePayment)), // Mode achat unique
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("eur"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String(nomArticle),
					},
					// Piège technique : Stripe facture en centimes. Toujours multiplier par 100.
					UnitAmount: stripe.Int64(prixEuros * 100),
				},
				Quantity: stripe.Int64(1),
			},
		},
		SuccessURL: stripe.String(domaineBase + "/paiement_succes.php?session_id={CHECKOUT_SESSION_ID}"),
		CancelURL:  stripe.String(domaineBase + "/article_test.php?erreur=annulation"),
	}

	// 5. Génération de l'URL chez Stripe
	s, err := session.New(params)
	if err != nil {
		log.Printf("❌ Erreur de l'API Stripe : %v", err)
		http.Error(w, "Erreur lors de l'initialisation du paiement", http.StatusInternalServerError)
		return
	}

	// 6. Renvoi de l'URL au client JS
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"url": s.URL,
	})
}