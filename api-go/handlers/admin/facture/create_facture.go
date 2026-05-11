package facture

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type FactureRequest struct {
	Id_emetteur     int      `json:"id_emetteur"`
	Id_recepteur    int      `json:"id_recepteur"`
	Id_intervention *int     `json:"id_intervention"`
	Montant_ht      float64  `json:"montant_ht"`
	Montant_ttc     float64  `json:"montant_ttc"`
	Commission_sh   float64  `json:"commission_sh"`
	Pdf_url         string   `json:"pdf_url"`
}

func CreateFacture(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	var req FactureRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	if req.Id_emetteur == 0 || req.Id_recepteur == 0 || req.Pdf_url == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "id_emetteur, id_recepteur et pdf_url sont obligatoires"})
		return
	}

	var newId int
	query := `
		INSERT INTO facture (id_emetteur, id_recepteur, id_intervention, montant_ht, montant_ttc, commission_sh, pdf_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_facture`
	
	err := database.DB.QueryRow(query,
		req.Id_emetteur, req.Id_recepteur, req.Id_intervention,
		req.Montant_ht, req.Montant_ttc, req.Commission_sh, req.Pdf_url,
	).Scan(&newId)

	if err != nil {
		log.Printf("❌ CreateFacture - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "id": newId})
}