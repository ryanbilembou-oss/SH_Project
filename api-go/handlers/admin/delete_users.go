package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
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
		http.Error(w, `{"erreur": "ID utilisateur manquant"}`, http.StatusBadRequest)
		return
	}

	tx, err := database.DB.Begin()
	if err != nil {
		log.Printf("❌ DeleteUser - Erreur au démarrage de la transaction: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	_, _ = tx.Exec("DELETE FROM profile_pro WHERE id_user = $1", id)
	_, _ = tx.Exec("DELETE FROM profile_senior WHERE id_user = $1", id)
	_, _ = tx.Exec("DELETE FROM profile_admin WHERE id_user = $1", id)

	
	query := "DELETE FROM users WHERE id_user = $1"
	result, err := tx.Exec(query, id)
	
	if err != nil {
		tx.Rollback() 
		log.Printf("❌ DeleteUser - Erreur lors de la suppression du user ID %s : %v", id, err)
		http.Error(w, `{"erreur": "Impossible de supprimer l'utilisateur"}`, http.StatusInternalServerError)
		return
	}


	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		tx.Rollback()
		http.Error(w, `{"erreur": "Utilisateur non trouvé en base de données"}`, http.StatusNotFound)
		return
	}


	if err := tx.Commit(); err != nil {
		log.Printf("❌ DeleteUser - Erreur au commit : %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la validation en base"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Succès: Utilisateur %s et tous ses profils associés ont été supprimés.", id)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Utilisateur supprimé avec succès"})
}