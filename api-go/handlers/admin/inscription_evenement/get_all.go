package inscription_evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type InscriptionDisplay struct {
	Id              int    `json:"id"`
	Id_user         int    `json:"id_user"`
	Id_evenement    int    `json:"id_evenement"`
	TitreEvenement  string `json:"titre_evenement"`
	DateHeure       string `json:"date_heure"`
	Lieu            string `json:"lieu"`
	Statut          string `json:"statut"`
	Date_inscription string `json:"date_inscription"`
}

func GetAllInscriptions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	query := `
		SELECT ie.id, ie.id_user, ie.id_evenement,
			e.titre, e.date_heure::text, e.lieu,
			ie.statut, ie.date_inscription::text
		FROM inscription_evenement ie
		LEFT JOIN evenements e ON ie.id_evenement = e.id_evenement
		ORDER BY e.date_heure ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ GetAllInscriptions - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	inscriptions := []InscriptionDisplay{}
	for rows.Next() {
		var i InscriptionDisplay
		if err := rows.Scan(&i.Id, &i.Id_user, &i.Id_evenement, &i.TitreEvenement, &i.DateHeure, &i.Lieu, &i.Statut, &i.Date_inscription); err != nil {
			log.Printf("⚠️ GetAllInscriptions - Erreur scan: %v", err)
			continue
		}
		inscriptions = append(inscriptions, i)
	}
	json.NewEncoder(w).Encode(inscriptions)
}

func GetInscriptionsByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"erreur": "ID manquant"}`, http.StatusBadRequest)
		return
	}

	query := `
		SELECT ie.id, ie.id_user, ie.id_evenement,
			e.titre, e.date_heure::text, e.lieu,
			ie.statut, ie.date_inscription::text
		FROM inscription_evenement ie
		LEFT JOIN evenements e ON ie.id_evenement = e.id_evenement
		WHERE ie.id_user = $1
		ORDER BY e.date_heure ASC
	`

	rows, err := database.DB.Query(query, id)
	if err != nil {
		log.Printf("❌ GetInscriptionsByUser - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	inscriptions := []InscriptionDisplay{}
	for rows.Next() {
		var i InscriptionDisplay
		if err := rows.Scan(&i.Id, &i.Id_user, &i.Id_evenement, &i.TitreEvenement, &i.DateHeure, &i.Lieu, &i.Statut, &i.Date_inscription); err != nil {
			continue
		}
		inscriptions = append(inscriptions, i)
	}
	json.NewEncoder(w).Encode(inscriptions)
}