package profile_senior

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteProfileSenior(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	tx, err := database.DB.Begin()
	if err != nil {
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}


	_, _ = tx.Exec("DELETE FROM planning_senior WHERE id_senior = $1", id)
	_, _ = tx.Exec("DELETE FROM note_avis WHERE id_intervention IN (SELECT id FROM intervention WHERE id_senior = $1)", id)
	_, _ = tx.Exec("DELETE FROM facture WHERE id_intervention IN (SELECT id FROM intervention WHERE id_senior = $1)", id)
	_, _ = tx.Exec("DELETE FROM devis WHERE id_senior = $1", id)
	_, _ = tx.Exec("DELETE FROM litiges WHERE id_intervention IN (SELECT id FROM intervention WHERE id_senior = $1)", id)
	_, _ = tx.Exec("DELETE FROM intervention WHERE id_senior = $1", id)


	result, err := tx.Exec("DELETE FROM profile_senior WHERE id_user = $1", id)
	if err != nil {
		tx.Rollback()
		log.Printf("❌ DeleteProfileSenior - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la suppression"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		tx.Rollback()
		http.Error(w, `{"erreur": "Profil senior introuvable"}`, http.StatusNotFound)
		return
	}

	tx.Commit()
	log.Printf("✅ ProfileSenior %s supprimé", id)
	json.NewEncoder(w).Encode(map[string]string{"message": "Profil senior supprimé avec succès"})
}