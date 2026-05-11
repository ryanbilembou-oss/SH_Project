package messagerie

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllMessages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	rows, err := database.DB.Query(`SELECT id, id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie FROM messagerie`)
	if err != nil {
		log.Printf("❌ GetAllMessages - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []models.Messagerie
	for rows.Next() {
		var m models.Messagerie
		if err := rows.Scan(&m.Id, &m.Id_expediteur, &m.Id_destinataire, &m.Contenu, &m.Date_envoi, &m.Lu, &m.Id_objet_lie); err != nil {
			log.Printf("⚠️ GetAllMessages - Erreur scan: %v", err)
			continue
		}
		messages = append(messages, m)
	}

	if messages == nil {
		messages = []models.Messagerie{}
	}

	json.NewEncoder(w).Encode(messages)
}