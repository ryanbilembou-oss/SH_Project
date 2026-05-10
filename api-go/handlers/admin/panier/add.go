package panier

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type AddPanierRequest struct {
	IdUser    int    `json:"id_user"`
	TypeObjet string `json:"type_objet"`
	IdObjet   int    `json:"id_objet"`
	Quantite  int    `json:"quantite"`
}

func AddPanier(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req AddPanierRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.IdUser == 0 || req.IdObjet == 0 || req.TypeObjet == "" {
		http.Error(w, `{"erreur": "id_user, type_objet et id_objet sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	if req.TypeObjet != "article" && req.TypeObjet != "evenement" {
		http.Error(w, `{"erreur": "type_objet doit être article ou evenement"}`, http.StatusBadRequest)
		return
	}

	if req.Quantite <= 0 {
		req.Quantite = 1
	}

	if req.TypeObjet == "evenement" {
		req.Quantite = 1
	}

	var dejaEnPanier int
	database.DB.QueryRow(
		`SELECT COALESCE(quantite, 0) FROM panier WHERE id_user = $1 AND type_objet = $2 AND id_objet = $3`,
		req.IdUser, req.TypeObjet, req.IdObjet,
	).Scan(&dejaEnPanier)

	totalVoulu := dejaEnPanier + req.Quantite

	if req.TypeObjet == "article" {
		var stock int
		err := database.DB.QueryRow(`SELECT stock FROM article WHERE id = $1`, req.IdObjet).Scan(&stock)
		if err != nil {
			http.Error(w, `{"erreur": "Article introuvable"}`, http.StatusNotFound)
			return
		}
		if stock <= 0 {
			http.Error(w, `{"erreur": "Article épuisé"}`, http.StatusConflict)
			return
		}
		if totalVoulu > stock {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(map[string]interface{}{"erreur": "Stock insuffisant", "stock": stock, "max": stock - dejaEnPanier})
			return
		}
	} else {
		var nbPlacesMax, nbInscrits int
		err := database.DB.QueryRow(
			`SELECT nb_places_max, nb_inscrits FROM evenements WHERE id_evenement = $1`,
			req.IdObjet,
		).Scan(&nbPlacesMax, &nbInscrits)
		if err != nil {
			http.Error(w, `{"erreur": "Événement introuvable"}`, http.StatusNotFound)
			return
		}
		placesRestantes := nbPlacesMax - nbInscrits
		if placesRestantes <= 0 {
			http.Error(w, `{"erreur": "Événement complet"}`, http.StatusConflict)
			return
		}
		if totalVoulu > placesRestantes {
			http.Error(w, `{"erreur": "Places insuffisantes"}`, http.StatusConflict)
			return
		}
	}

	_, err := database.DB.Exec(
		`INSERT INTO panier (id_user, type_objet, id_objet, quantite)
		 VALUES ($1, $2, $3, $4)
		 ON CONFLICT (id_user, type_objet, id_objet)
		 DO UPDATE SET quantite = panier.quantite + $4`,
		req.IdUser, req.TypeObjet, req.IdObjet, req.Quantite,
	)
	if err != nil {
		log.Printf("AddPanier - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("Panier: user=%d ajout %s id=%d qty=%d", req.IdUser, req.TypeObjet, req.IdObjet, req.Quantite)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}