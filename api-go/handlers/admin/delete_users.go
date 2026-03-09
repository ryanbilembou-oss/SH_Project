package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// 1. Définition des headers CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json") // Retour en JSON

	// 2. Preflight (OPTIONS)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 3. Validation de la méthode HTTP
	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	// 4. Extraction de l'ID via Query Param
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID utilisateur manquant"}`, http.StatusBadRequest)
		return
	}

	// 5. La Transaction SQL (Fondamental pour la suppression)
	tx, err := database.DB.Begin()
	if err != nil {
		log.Printf("❌ DeleteUser - Erreur au démarrage de la transaction: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	// 6. Nettoyage des tables enfants (On tue les profils pour libérer le parent)
	// On ignore les erreurs ici car si l'utilisateur n'est ni Senior, ni Pro, l'opération supprimera 0 ligne, ce qui est normal.
	_, _ = tx.Exec("DELETE FROM profile_pro WHERE id_user = $1", id)
	_, _ = tx.Exec("DELETE FROM profile_senior WHERE id_user = $1", id)
	_, _ = tx.Exec("DELETE FROM profile_admin WHERE id_user = $1", id)

	// 7. Suppression finale de la ligne parent dans 'users'
	query := "DELETE FROM users WHERE id_user = $1"
	result, err := tx.Exec(query, id)
	
	if err != nil {
		tx.Rollback() // En cas de crash, on annule toutes les étapes précédentes
		log.Printf("❌ DeleteUser - Erreur lors de la suppression du user ID %s : %v", id, err)
		http.Error(w, `{"erreur": "Impossible de supprimer l'utilisateur"}`, http.StatusInternalServerError)
		return
	}

	// 8. Vérification que la ligne existait bien
	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		tx.Rollback()
		http.Error(w, `{"erreur": "Utilisateur non trouvé en base de données"}`, http.StatusNotFound)
		return
	}

	log.Printf("Utilisateur ID %s supprimé avec succès", id)
	// 9. Commit final
	if err := tx.Commit(); err != nil {
		log.Printf("❌ DeleteUser - Erreur au commit : %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la validation en base"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Succès: Utilisateur %s et tous ses profils associés ont été supprimés.", id)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Utilisateur supprimé avec succès"})
}