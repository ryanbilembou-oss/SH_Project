package devis

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type DevisRequest struct {
	Id_devis        int      `json:"id_devis"`
	Id_pro          int      `json:"id_pro"`
	Id_senior       int      `json:"id_senior"`
	Id_service      int      `json:"id_service"`
	Id_intervention *int     `json:"id_intervention"`
	Montant_ht      float64  `json:"montant_ht"`
	Montant_ttc     float64  `json:"montant_ttc"`
	Taux_commission float64  `json:"taux_commission"`
	Date_validite   string   `json:"date_validite"`
	Statut          *string  `json:"statut"`
}

func CreateDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	var req DevisRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	if req.Id_pro == 0 || req.Id_senior == 0 || req.Id_service == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "id_pro, id_senior et id_service sont obligatoires"})
		return
	}
	if req.Date_validite == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "date_validite est obligatoire"})
		return
	}

	query := `
		INSERT INTO devis (id_pro, id_senior, id_service, id_intervention, montant_ht, montant_ttc, taux_commission, date_validite, statut)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, 'en_attente'))
		RETURNING id_devis
	`

	var newId int
	err := database.DB.QueryRow(query,
		req.Id_pro, req.Id_senior, req.Id_service, req.Id_intervention,
		req.Montant_ht, req.Montant_ttc, req.Taux_commission, req.Date_validite, req.Statut,
	).Scan(&newId)

	if err != nil {
		log.Printf("❌ CreateDevis - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	log.Printf("✅ CreateDevis - Nouveau devis ID %d créé", newId)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Devis créé avec succès",
		"id":      newId,
	})
}