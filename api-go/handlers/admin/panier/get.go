package panier

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type PanierItem struct {
	IdPanier   int     `json:"id_panier"`
	IdUser     int     `json:"id_user"`
	TypeObjet  string  `json:"type_objet"`
	IdObjet    int     `json:"id_objet"`
	Quantite   int     `json:"quantite"`
	DateAjout  string  `json:"date_ajout"`
	Nom        string  `json:"nom"`
	Prix       float64 `json:"prix"`
	ImageURL   *string `json:"image_url"`
}

func GetPanier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }

	id := r.URL.Query().Get("id_user")
	if id == "" {
		http.Error(w, `{"erreur": "id_user manquant"}`, http.StatusBadRequest)
		return
	}

	query := `
		SELECT p.id_panier, p.id_user, p.type_objet, p.id_objet, p.quantite, p.date_ajout::text,
			CASE
				WHEN p.type_objet = 'article' THEN a.nom
				WHEN p.type_objet = 'evenement' THEN e.titre
			END AS nom,
			CASE
				WHEN p.type_objet = 'article' THEN a.prix
				WHEN p.type_objet = 'evenement' THEN e.prix_ticket
			END AS prix,
			CASE
				WHEN p.type_objet = 'article' THEN a.image_url
				ELSE NULL
			END AS image_url
		FROM panier p
		LEFT JOIN article a ON p.type_objet = 'article' AND p.id_objet = a.id
		LEFT JOIN evenements e ON p.type_objet = 'evenement' AND p.id_objet = e.id_evenement
		WHERE p.id_user = $1
		ORDER BY p.date_ajout DESC
	`

	rows, err := database.DB.Query(query, id)
	if err != nil {
		log.Printf("❌ GetPanier - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	items := []PanierItem{}
	for rows.Next() {
		var item PanierItem
		err := rows.Scan(&item.IdPanier, &item.IdUser, &item.TypeObjet, &item.IdObjet,
			&item.Quantite, &item.DateAjout, &item.Nom, &item.Prix, &item.ImageURL)
		if err != nil {
			log.Printf("⚠️ GetPanier - Erreur Scan: %v", err)
			continue
		}
		items = append(items, item)
	}

	json.NewEncoder(w).Encode(items)
}