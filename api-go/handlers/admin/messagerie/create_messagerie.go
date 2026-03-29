package messagerie

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type MessagerieRequest struct {
	Id_expediteur   int    `json:"id_expediteur"`
	Id_destinataire int    `json:"id_destinataire"`
	Contenu         string `json:"contenu"`
	Id_objet_lie    int    `json:"id_objet_lie"`
}

func CreateMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req MessagerieRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format de données invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_expediteur == 0 || req.Id_destinataire == 0 || req.Contenu == "" {
		http.Error(w, `{"erreur": "id_expediteur, id_destinataire et contenu sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`INSERT INTO messagerie (id_expediteur, id_destinataire, contenu, date_envoi, lu, id_objet_lie) 
		VALUES ($1, $2, $3, NOW(), false, NULLIF($4, 0))`,
		req.Id_expediteur, req.Id_destinataire, req.Contenu, req.Id_objet_lie,
	)
	if err != nil {
		log.Printf("❌ CreateMessage - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur lors de la création"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Message créé de %d vers %d", req.Id_expediteur, req.Id_destinataire)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}