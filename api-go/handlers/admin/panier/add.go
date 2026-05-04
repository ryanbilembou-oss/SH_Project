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
 
	var exists bool
	if req.TypeObjet == "article" {
		database.DB.QueryRow(`SELECT EXISTS(SELECT 1 FROM article WHERE id = $1)`, req.IdObjet).Scan(&exists)
	} else {
		database.DB.QueryRow(`SELECT EXISTS(SELECT 1 FROM evenements WHERE id_evenement = $1)`, req.IdObjet).Scan(&exists)
	}
	if !exists {
		http.Error(w, `{"erreur": "Objet introuvable"}`, http.StatusNotFound)
		return
	}
 
	_, err := database.DB.Exec(
		`INSERT INTO panier (id_user, type_objet, id_objet, quantite)
		 VALUES ($1, $2, $3, $4)
		 ON CONFLICT (id_user, type_objet, id_objet)
		 DO UPDATE SET quantite = panier.quantite + $4`,
		req.IdUser, req.TypeObjet, req.IdObjet, req.Quantite,
	)
	if err != nil {
		log.Printf("❌ AddPanier - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur serveur"}`, http.StatusInternalServerError)
		return
	}

	log.Printf("✅ Panier: user=%d ajout %s id=%d qty=%d", req.IdUser, req.TypeObjet, req.IdObjet, req.Quantite)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}