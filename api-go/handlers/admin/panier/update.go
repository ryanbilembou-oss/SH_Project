package panier

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type UpdateQuantiteRequest struct {
	IdPanier int `json:"id_panier"`
	Quantite int `json:"quantite"`
}

func UpdateQuantite(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req UpdateQuantiteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.IdPanier == 0 || req.Quantite <= 0 {
		http.Error(w, `{"erreur": "id_panier et quantite (>0) sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	var typeObjet string
	var idObjet int
	err := database.DB.QueryRow(
		`SELECT type_objet, id_objet FROM panier WHERE id_panier = $1`,
		req.IdPanier,
	).Scan(&typeObjet, &idObjet)
	if err != nil {
		http.Error(w, `{"erreur": "Item introuvable"}`, http.StatusNotFound)
		return
	}

	if typeObjet == "article" {
		var stock int
		database.DB.QueryRow(`SELECT stock FROM article WHERE id = $1`, idObjet).Scan(&stock)
		if req.Quantite > stock {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"erreur": "Stock insuffisant",
				"stock":  stock,
			})
			return
		}
	} else if typeObjet == "evenement" {
		var nbPlacesMax, nbInscrits int
		database.DB.QueryRow(
			`SELECT nb_places_max, nb_inscrits FROM evenements WHERE id_evenement = $1`,
			idObjet,
		).Scan(&nbPlacesMax, &nbInscrits)
		placesRestantes := nbPlacesMax - nbInscrits
		if req.Quantite > placesRestantes {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"erreur": "Places insuffisantes",
				"stock":  placesRestantes,
			})
			return
		}
	}

	result, err := database.DB.Exec(
		`UPDATE panier SET quantite = $1 WHERE id_panier = $2`,
		req.Quantite, req.IdPanier,
	)
	if err != nil {
		log.Printf("UpdateQuantite - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		http.Error(w, `{"erreur": "Item introuvable"}`, http.StatusNotFound)
		return
	}

	log.Printf("Panier: update id_panier=%d quantite=%d", req.IdPanier, req.Quantite)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}