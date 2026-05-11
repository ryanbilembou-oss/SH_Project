package admin

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"time"
)

type BanRequest struct {
	IdUser int    `json:"id_user"`
	Type   string `json:"type"`
	Raison string `json:"raison"`
	Jours  int    `json:"jours"`
}

func BanUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req BanRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		return
	}

	if req.Type == "definitif" {
		_, err := database.DB.Exec(
			`UPDATE users SET est_banni = true, ban_jusqu_au = NULL, ban_raison = $1 WHERE id_user = $2`,
			req.Raison, req.IdUser,
		)
		if err != nil {
			log.Printf("BanUser error: %v", err)
			w.WriteHeader(500)
			return
		}
	} else {
		if req.Jours <= 0 { req.Jours = 7 }
		banJusquAu := time.Now().AddDate(0, 0, req.Jours)
		_, err := database.DB.Exec(
			`UPDATE users SET est_banni = true, ban_jusqu_au = $1, ban_raison = $2 WHERE id_user = $3`,
			banJusquAu, req.Raison, req.IdUser,
		)
		if err != nil {
			log.Printf("BanUser error: %v", err)
			w.WriteHeader(500)
			return
		}
	}

	log.Printf("Ban: user=%d type=%s", req.IdUser, req.Type)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}

func UnbanUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "OPTIONS" { w.WriteHeader(200); return }
	if r.Method != "POST" { w.WriteHeader(405); return }

	var req struct{ IdUser int `json:"id_user"` }
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(400)
		return
	}

	database.DB.Exec(
		`UPDATE users SET est_banni = false, ban_jusqu_au = NULL, ban_raison = NULL WHERE id_user = $1`,
		req.IdUser,
	)

	log.Printf("Unban: user=%d", req.IdUser)
	json.NewEncoder(w).Encode(map[string]bool{"success": true})
}