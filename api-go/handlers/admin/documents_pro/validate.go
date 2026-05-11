package documents_pro

import (
	"encoding/json"
	"log"
	"net/http"
	"silver-happy-api/database"
)

type ValidateRequest struct {
	Id_doc int    `json:"id_doc"`
	Statut string `json:"statut"`
}

func ValidateDocument(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var req ValidateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"erreur": "Format invalide"}`, http.StatusBadRequest)
		return
	}

	if req.Statut != "valide" && req.Statut != "refuse" {
		http.Error(w, `{"erreur": "Statut invalide"}`, http.StatusBadRequest)
		return
	}
 
	_, err := database.DB.Exec(`UPDATE documents_pro SET statut = $1 WHERE id_doc = $2`, req.Statut, req.Id_doc)
	if err != nil {
		log.Printf("❌ ValidateDocument - Erreur SQL: %v", err)
		http.Error(w, `{"erreur": "Erreur base de données"}`, http.StatusInternalServerError)
		return
	} 
	var idUser int
	database.DB.QueryRow(`SELECT id_user FROM documents_pro WHERE id_doc = $1`, req.Id_doc).Scan(&idUser)
 
	var totalDocs, validatedDocs int
	database.DB.QueryRow(`SELECT COUNT(*) FROM documents_pro WHERE id_user = $1`, idUser).Scan(&totalDocs)
	database.DB.QueryRow(`SELECT COUNT(*) FROM documents_pro WHERE id_user = $1 AND statut = 'valide'`, idUser).Scan(&validatedDocs)

	dossierComplet := totalDocs > 0 && totalDocs == validatedDocs
	if dossierComplet { 
		database.DB.Exec(`UPDATE profile_pro SET statut_validation = 'valide' WHERE id_user = $1`, idUser)
		log.Printf("✅ Dossier complet pour user %d → statut_validation = valide", idUser)
	} else if req.Statut == "refuse" { 
		var statutActuel string
		database.DB.QueryRow(`SELECT statut_validation FROM profile_pro WHERE id_user = $1`, idUser).Scan(&statutActuel)
		if statutActuel == "valide" {
			database.DB.Exec(`UPDATE profile_pro SET statut_validation = 'en_attente' WHERE id_user = $1`, idUser)
			log.Printf("⚠️ Document refusé pour user %d → statut_validation repassé en en_attente", idUser)
		}
	}

	log.Printf("✅ Document %d → statut: %s", req.Id_doc, req.Statut)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":          "success",
		"dossier_complet": dossierComplet,
	})
}