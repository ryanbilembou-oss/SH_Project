package profile_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
	notification "silver-happy-api/handlers/admin/notification"
)

type UpdateStatutRequest struct {
	Id_user           int    `json:"id_user"`
	Statut_validation string `json:"statut_validation"`
}

func UpdateStatutValidation(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" { w.WriteHeader(http.StatusOK); return }
	if r.Method != http.MethodPut {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, http.StatusMethodNotAllowed)
		return
	}

	var req UpdateStatutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Id_user == 0 || req.Statut_validation == "" {
		http.Error(w, `{"erreur": "id_user et statut_validation sont obligatoires"}`, http.StatusBadRequest)
		return
	}

	_, err := database.DB.Exec(
		`UPDATE profile_pro SET statut_validation = $1 WHERE id_user = $2`,
		req.Statut_validation, req.Id_user,
	)
	if err != nil {
		log.Printf("UpdateStatutValidation error: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	}

	switch req.Statut_validation {
	case "valide":
		go notification.EnvoyerNotification(
			req.Id_user,
			"Compte valide !",
			"Votre compte prestataire a ete valide. Vous pouvez maintenant proposer vos services.",
			"success",
			"/users/pro/accueil_pro.php",
		)
	case "refuse":
		go notification.EnvoyerNotification(
			req.Id_user,
			"Compte refuse",
			"Votre dossier a ete refuse. Contactez l'administration pour plus d'informations.",
			"error",
			"/users/pro/profil_pro.php",
		)
	}

	log.Printf("ProfilePro %d → statut_validation: %s", req.Id_user, req.Statut_validation)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}