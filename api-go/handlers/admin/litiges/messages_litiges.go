package litiges

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"time"
)

type MessageLitige struct {
	Id        int    `json:"id"`
	IdLitige  int    `json:"id_litige"`
	IdUser    int    `json:"id_user"`
	Message   string `json:"message"`
	DateEnvoi string `json:"date_envoi"`
	NomUser   string `json:"nom_user"`
	PrenomUser string `json:"prenom_user"`
	Role      string `json:"role"`
}

func GetMessages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	idLitige := r.URL.Query().Get("id_litige")
	if idLitige == "" { w.WriteHeader(400); return }

	rows, err := database.DB.Query(`
		SELECT m.id, m.id_litige, m.id_user, m.message, m.date_envoi::text,
			COALESCE(ps.nom, COALESCE(pp.nom, pa.nom, u.email)) as nom,
			COALESCE(ps.prenom, COALESCE(pp.prenom, pa.prenom, '')) as prenom,
			u.role
		FROM litige_message m
		JOIN users u ON m.id_user = u.id_user
		LEFT JOIN profile_senior ps ON u.id_user = ps.id_user
		LEFT JOIN profile_pro pp ON u.id_user = pp.id_user
		LEFT JOIN profile_admin pa ON u.id_user = pa.id_user
		WHERE m.id_litige = $1
		ORDER BY m.date_envoi ASC
	`, idLitige)
	if err != nil {
		log.Printf("GetMessages error: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	var messages []MessageLitige
	for rows.Next() {
		var m MessageLitige
		rows.Scan(&m.Id, &m.IdLitige, &m.IdUser, &m.Message, &m.DateEnvoi, &m.NomUser, &m.PrenomUser, &m.Role)
		messages = append(messages, m)
	}
	if messages == nil { messages = []MessageLitige{} }
	json.NewEncoder(w).Encode(messages)
}

func SendMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req struct {
		IdLitige int    `json:"id_litige"`
		IdUser   int    `json:"id_user"`
		Message  string `json:"message"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		return
	}

	_, err := database.DB.Exec(`
		INSERT INTO litige_message (id_litige, id_user, message, date_envoi)
		VALUES ($1, $2, $3, $4)
	`, req.IdLitige, req.IdUser, req.Message, time.Now())
	if err != nil {
		log.Printf("SendMessage error: %v", err)
		w.WriteHeader(500)
		return
	}

	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}