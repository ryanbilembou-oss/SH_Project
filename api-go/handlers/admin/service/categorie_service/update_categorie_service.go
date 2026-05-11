package categorie_service

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"silver-happy-api/database"
)

func UpdateCategorieService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	idStr := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		sendError(w, "id", "ID de catégorie invalide.", http.StatusBadRequest)
		return
	}

	var req CategorieRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "global", "Format de données invalide.", http.StatusBadRequest)
		return
	}

	if strings.TrimSpace(req.Nom_categorie) == "" {
		sendError(w, "nom_categorie", "Le nom est obligatoire.", http.StatusBadRequest)
		return
	}

	query := `UPDATE categorie_services SET nom_categorie = $1 WHERE id_categorie = $2`
	result, err := database.DB.Exec(query, req.Nom_categorie, id)
	if err != nil {
		sendError(w, "nom_categorie", "Erreur lors de la mise à jour.", http.StatusConflict)
		return
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		sendError(w, "id", "Catégorie non trouvée.", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}