package categorie_evenement

import (
    "encoding/json"
    "log"
    "net/http"
    "silver-happy-api/database"
)

type UpdateCategorieRequest struct {
    IDCategorie  int    `json:"id_categorie"`
    NomCategorie string `json:"nom_categorie"`
}

func UpdateCategorieEvenement(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")

    if r.Method == "OPTIONS" {
        w.WriteHeader(http.StatusOK)
        return
    }

    var req UpdateCategorieRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        w.WriteHeader(http.StatusBadRequest)
        json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
        return
    }

    _, err := database.DB.Exec(
        `UPDATE categorie_evenement SET nom_categorie = $1 WHERE id_categorie = $2`,
        req.NomCategorie, req.IDCategorie,
    )
    if err != nil {
        log.Printf("❌ Erreur SQL update catégorie : %v", err)
        w.WriteHeader(http.StatusInternalServerError)
        json.NewEncoder(w).Encode(map[string]string{"error": "Erreur serveur"})
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}