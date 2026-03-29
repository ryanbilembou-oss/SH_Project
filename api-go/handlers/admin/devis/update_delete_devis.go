package devis

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func UpdateDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPut {
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
	if req.Id_devis == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	query := `
		UPDATE devis
		SET id_pro=$1, id_senior=$2, id_service=$3, id_intervention=$4,
			montant_ht=$5, montant_ttc=$6, taux_commission=$7,
			date_validite=$8, statut=COALESCE($9, statut)
		WHERE id_devis=$10
	`

	result, err := database.DB.Exec(query,
		req.Id_pro, req.Id_senior, req.Id_service, req.Id_intervention,
		req.Montant_ht, req.Montant_ttc, req.Taux_commission,
		req.Date_validite, req.Statut, req.Id_devis,
	)
	if err != nil {
		log.Printf("❌ UpdateDevis - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Devis introuvable"})
		return
	}

	log.Printf("✅ UpdateDevis - ID %d mis à jour", req.Id_devis)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Devis mis à jour avec succès",
	})
}

func DeleteDevis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodDelete {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	result, err := database.DB.Exec("DELETE FROM devis WHERE id_devis = $1", id)
	if err != nil {
		log.Printf("❌ DeleteDevis - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Devis introuvable"})
		return
	}

	log.Printf("✅ DeleteDevis - ID %s supprimé", id)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Devis supprimé avec succès",
	})
}