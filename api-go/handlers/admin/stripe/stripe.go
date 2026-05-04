package stripe

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

func getStripeKey() string {
	return os.Getenv("STRIPE_SECRET_KEY")
}

func createCheckoutSession(params url.Values) (string, string, error) {
	req, err := http.NewRequest("POST", "https://api.stripe.com/v1/checkout/sessions", strings.NewReader(params.Encode()))
	if err != nil {
		return "", "", err
	}
	req.Header.Set("Authorization", "Bearer "+getStripeKey())
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		return "", "", fmt.Errorf("Stripe erreur %d: %s", resp.StatusCode, string(body))
	}

	var result map[string]interface{}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", "", err
	}

	sessionURL, _ := result["url"].(string)
	sessionID, _ := result["id"].(string)
	return sessionURL, sessionID, nil
}

func setCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
}