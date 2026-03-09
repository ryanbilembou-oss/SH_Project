package evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)


type EvenementDisplay struct {
	ID           int     `json:"id_evenement"`
	Titre        string  `json:"titre"`
	DateHeure    string  `json:"date_heure"`
	Lieu         string  `json:"lieu"`
	PrixTicket   float64 `json:"prix_ticket"`
	NbPlacesMax  int     `json:"nb_places_max"`
	NbInscrits   int     `json:"nb_inscrits"`
	NomCategorie string  `json:"nom_categorie"`
}

func GetAllEvenements(w http.ResponseWriter, r *http.Request) {
	
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    w.Header().Set("Content-Type", "application/json")


	if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }


	query := `
		SELECT 
			e.id_evenement, e.titre, e.date_heure, e.lieu, 
			e.prix_ticket, e.nb_places_max, e.nb_inscrits,
			c.nom_categorie
		FROM evenements e
		INNER JOIN categorie_evenement c ON e.id_categorie = c.id_categorie
		ORDER BY e.date_heure ASC
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		log.Printf("❌ Erreur SQL GET: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, 500)
		return
	}
	defer rows.Close()

	events := []EvenementDisplay{} 

	for rows.Next() {
		var e EvenementDisplay
		err := rows.Scan(
			&e.ID, &e.Titre, &e.DateHeure, &e.Lieu, 
			&e.PrixTicket, &e.NbPlacesMax, &e.NbInscrits, 
			&e.NomCategorie,
		)
		if err != nil {
			log.Printf("⚠️ Erreur Scan: %v", err)
			continue
		}
		events = append(events, e)
	}


	json.NewEncoder(w).Encode(events)
}