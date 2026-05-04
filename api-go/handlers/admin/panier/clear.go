package panier

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

func ViderPanier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodDelete {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	idUser := r.URL.Query().Get("id_user")
	if idUser == "" {
		http.Error(w, `{"erreur": "id_user manquant"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(`DELETE FROM panier WHERE id_user = $1`, idUser)
	if err != nil {
		log.Printf("❌ ViderPanier - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Panier vidé pour user=%s", idUser)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}