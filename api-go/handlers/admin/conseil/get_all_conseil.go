package conseil

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/models"
)

func GetAllConseils(w http.ResponseWriter, r *http.Request) {
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

	rows, err := database.DB.Query(`SELECT id_conseil, categorie, titre, contenu FROM conseil`)
	if err != nil {
		log.Printf("❌ GetAllConseils - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var conseils []models.Conseil
	for rows.Next() {
		var c models.Conseil
		if err := rows.Scan(&c.Id_conseil, &c.Categorie, &c.Titre, &c.Contenu); err != nil {
			log.Printf("⚠️ GetAllConseils - Erreur scan: %v", err)
			continue
		}
		conseils = append(conseils, c)
	}

	if conseils == nil {
		conseils = []models.Conseil{}
	}

	json.NewEncoder(w).Encode(conseils)
}