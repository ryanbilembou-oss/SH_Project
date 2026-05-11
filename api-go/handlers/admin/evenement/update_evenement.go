package evenement

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)


type UpdateEvenementRequest struct {
	Id_evenement  int     `json:"id_evenement"`
	Id_categorie  int     `json:"id_categorie"`
	Titre         string  `json:"titre"`
	Description   *string `json:"description"`
	Date_heure    string  `json:"date_heure"` 
	Lieu          string  `json:"lieu"`
	Prix_ticket   float64 `json:"prix_ticket"`
	Nb_places_max int     `json:"nb_places_max"`
}


func UpdateEvenement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")


	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPut {
		w.WriteHeader(http.StatusMethodNotAllowed)
		json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
		return
	}


	var req UpdateEvenementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
		return
	}

	
	if req.Id_evenement == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "id_evenement manquant"})
		return
	}
	if req.Titre == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le titre est obligatoire"})
		return
	}
	if req.Lieu == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le lieu est obligatoire"})
		return
	}
	if req.Nb_places_max <= 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le nombre de places doit être supérieur à 0"})
		return
	}
	if req.Prix_ticket < 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Le prix ne peut pas être négatif"})
		return
	}


	query := `
		UPDATE evenements
		SET
			id_categorie  = $1,
			titre         = $2,
			description   = $3,
			date_heure    = $4,
			lieu          = $5,
			prix_ticket   = $6,
			nb_places_max = $7
		WHERE id_evenement = $8
	`

	result, err := database.DB.Exec(
		query,
		req.Id_categorie,
		req.Titre,
		req.Description,
		req.Date_heure,
		req.Lieu,
		req.Prix_ticket,
		req.Nb_places_max,
		req.Id_evenement,
	)

	if err != nil {
		log.Printf("❌ UpdateEvenement - Erreur SQL : %v", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
		return
	}


	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Événement introuvable"})
		return
	}

	log.Printf("✅ UpdateEvenement - ID %d mis à jour avec succès", req.Id_evenement)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"success": "true",
		"message": "Événement mis à jour avec succès",
	})
}


func GetEvenement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
		return
	}

	var e struct {
		Id_evenement  int     `json:"id_evenement"`
		Id_createur   *int    `json:"id_createur"`
		Id_categorie  int     `json:"id_categorie"`
		Titre         string  `json:"titre"`
		Description   *string `json:"description"`
		Date_heure    string  `json:"date_heure"`
		Lieu          string  `json:"lieu"`
		Prix_ticket   float64 `json:"prix_ticket"`
		Nb_places_max int     `json:"nb_places_max"`
		Nb_inscrits   int     `json:"nb_inscrits"`
	}

	query := `
		SELECT id_evenement, id_createur, id_categorie, titre, description,
		       TO_CHAR(date_heure, 'YYYY-MM-DD"T"HH24:MI') AS date_heure,
		       lieu, prix_ticket, nb_places_max, nb_inscrits
		FROM evenements
		WHERE id_evenement = $1
	`

	err := database.DB.QueryRow(query, id).Scan(
		&e.Id_evenement,
		&e.Id_createur,
		&e.Id_categorie,
		&e.Titre,
		&e.Description,
		&e.Date_heure,
		&e.Lieu,
		&e.Prix_ticket,
		&e.Nb_places_max,
		&e.Nb_inscrits,
	)

	if err != nil {
		log.Printf("❌ GetEvenement - ID %s introuvable : %v", id, err)
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Événement introuvable"})
		return
	}

	json.NewEncoder(w).Encode(e)
}