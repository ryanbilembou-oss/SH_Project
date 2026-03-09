package admin

import (
	"fmt"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodDelete {
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "ID utilisateur manquant", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM users WHERE id_user = ?"
	result, err := database.DB.Exec(query, id)
	if err != nil {
		log.Printf(" Erreur SQL lors de la suppression: %v", err)
		http.Error(w, "Erreur interne du serveur", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Utilisateur non trouvé", http.StatusNotFound)
		return
	}

	log.Printf("Utilisateur ID %s supprimé avec succès", id)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "Utilisateur supprimé avec succès")
}