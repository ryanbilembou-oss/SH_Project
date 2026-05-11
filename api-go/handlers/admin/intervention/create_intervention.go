package intervention

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type InterventionRequest struct {
	Id               int     `json:"id"`
	Id_pro           int     `json:"id_pro"`
	Id_senior        int     `json:"id_senior"`
	Id_service       int     `json:"id_service"`
	Bio_intervention *string `json:"bio_intervention"`
	DateHeureDebut   string  `json:"date_heure_debut"`
	DateHeureFin     string  `json:"date_heure_fin"`
	Lieu             string  `json:"lieu"`
	Statut           *string `json:"statut"`
	CommissionMontant float64 `json:"commission_montant"`
	Prix             float64 `json:"prix"`
	EstMedical       bool    `json:"est_medical"`
}

func CreateIntervention(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
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

	var req InterventionRequest
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
	if req.Lieu == "" || req.DateHeureDebut == "" || req.DateHeureFin == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "lieu, date_heure_debut et date_heure_fin sont obligatoires"})
		return
	}
	if req.Prix < 0 || req.CommissionMontant < 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "prix et commission_montant ne peuvent pas être négatifs"})
		return
	}

	query := `
		INSERT INTO intervention (id_pro, id_senior, id_service, bio_intervention, date_heure_debut, date_heure_fin, lieu, statut, commission_montant, prix, est_medical)
		VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, 'planifiee'), $9, $10, $11)
		RETURNING id
	`

	var newId int
	err := database.DB.QueryRow(query,
		req.Id_pro, req.Id_senior, req.Id_service, req.Bio_intervention,
		req.DateHeureDebut, req.DateHeureFin, req.Lieu, req.Statut,
		req.CommissionMontant, req.Prix, req.EstMedical,
	).Scan(&newId)

	if err != nil {
		log.Printf("❌ CreateIntervention - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	log.Printf("✅ CreateIntervention - ID %d créé", newId)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "message": "Intervention créée avec succès", "id": newId})
}