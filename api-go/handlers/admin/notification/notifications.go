package notification

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"silver-happy-api/database"
	"time"
)

type Notification struct {
	Id              int        `json:"id"`
	IdUser          int        `json:"id_user"`
	Titre           string     `json:"titre"`
	Message         string     `json:"message"`
	Type            string     `json:"type"`
	EstLu           bool       `json:"est_lu"`
	LienRedirection *string    `json:"lien_redirection"`
	DateCreation    time.Time  `json:"date_creation"`
}

func GetByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	idUser := r.URL.Query().Get("id_user")
	if idUser == "" { w.WriteHeader(400); return }

	rows, err := database.DB.Query(`
		SELECT id, id_user, titre, message, type, est_lu, lien_redirection, date_creation
		FROM notification WHERE id_user = $1
		ORDER BY date_creation DESC LIMIT 50
	`, idUser)
	if err != nil {
		log.Printf("GetByUser error: %v", err)
		w.WriteHeader(500)
		return
	}
	defer rows.Close()

	var notifs []Notification
	for rows.Next() {
		var n Notification
		if err := rows.Scan(&n.Id, &n.IdUser, &n.Titre, &n.Message, &n.Type, &n.EstLu, &n.LienRedirection, &n.DateCreation); err != nil {
			log.Printf("GetByUser scan error: %v", err)
			continue
		}
		notifs = append(notifs, n)
	}
	if notifs == nil { notifs = []Notification{} }
	json.NewEncoder(w).Encode(notifs)
}

func MarquerLu(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	var req struct {
		IdUser int `json:"id_user"`
	}
	json.NewDecoder(r.Body).Decode(&req)
	database.DB.Exec(`UPDATE notification SET est_lu = true WHERE id_user = $1`, req.IdUser)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func SavePlayerID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	var req struct {
		IdUser   int    `json:"id_user"`
		PlayerID string `json:"player_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400); return
	}

	database.DB.Exec(`UPDATE users SET onesignal_player_id = $1 WHERE id_user = $2`, req.PlayerID, req.IdUser)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func EnvoyerNotification(idUser int, titre, message, typeNotif, lien string) {
	var playerID sql.NullString
	err := database.DB.QueryRow(`SELECT onesignal_player_id FROM users WHERE id_user = $1`, idUser).Scan(&playerID)
	if err != nil { return }

	_, err = database.DB.Exec(`
		INSERT INTO notification (id_user, titre, message, type, lien_redirection)
		VALUES ($1, $2, $3, $4, NULLIF($5, ''))
	`, idUser, titre, message, typeNotif, lien)
	if err != nil {
		log.Printf("EnvoyerNotification INSERT error: %v", err)
	}

	if !playerID.Valid || playerID.String == "" { return }

	appID := os.Getenv("ONESIGNAL_APP_ID")
	apiKey := os.Getenv("ONESIGNAL_API_KEY")
	if appID == "" || apiKey == "" { return }

	payload := map[string]interface{}{
		"app_id":             appID,
		"include_player_ids": []string{playerID.String},
		"headings":           map[string]string{"en": titre, "fr": titre},
		"contents":           map[string]string{"en": message, "fr": message},
		"url":                fmt.Sprintf("*%s", lien),
	}

	body, _ := json.Marshal(payload)
	req, _ := http.NewRequest("POST", "https://onesignal.com/api/v1/notifications", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Basic "+apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("OneSignal error: %v", err)
		return
	}
	defer resp.Body.Close()
	log.Printf("OneSignal notif envoyee: user=%d titre=%s status=%d", idUser, titre, resp.StatusCode)
}

func EnvoyerATous(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }

	var req struct {
		Titre   string `json:"titre"`
		Message string `json:"message"`
		Role    string `json:"role"`
		Lien    string `json:"lien"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400); return
	}

	var rows *sql.Rows
	var err error
	if req.Role != "" {
		rows, err = database.DB.Query(`SELECT id_user FROM users WHERE role = $1`, req.Role)
	} else {
		rows, err = database.DB.Query(`SELECT id_user FROM users`)
	}
	if err != nil { w.WriteHeader(500); return }
	defer rows.Close()

	count := 0
	for rows.Next() {
		var idUser int
		rows.Scan(&idUser)
		go EnvoyerNotification(idUser, req.Titre, req.Message, "admin", req.Lien)
		count++
	}

	log.Printf("Notifications envoyees a %d utilisateurs", count)
	json.NewEncoder(w).Encode(map[string]interface{}{"success": true, "count": count})
}