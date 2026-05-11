package messagerie

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	var m models.Messagerie
	err := database.DB.QueryRow(
		`SELECT id, id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie FROM messagerie WHERE id = $1`, id,
	).Scan(&m.Id, &m.Id_expediteur, &m.Id_destinataire, &m.Contenu, &m.Date_envoi, &m.Lu, &m.Id_objet_lie)
	if err != nil {
		log.Printf("❌ GetMessage - ID %s introuvable: %v", id, err)
		http.Error(w, `{"erreur": "Message introuvable"}`, http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(m)
}