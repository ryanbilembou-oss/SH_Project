package categorie_service

import (
	"encoding/json"
	"net/http"
	"strconv"
	"silver-happy-api/database"
)

func DeleteCategorieService(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE, OPTIONS")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	idStr := r.URL.Query().Get("id")
	idToDelete, err := strconv.Atoi(idStr)
	if err != nil {
		sendError(w, "id", "ID de catégorie invalide.", http.StatusBadRequest)
		return
	}

	var idAutre int
	err = database.DB.QueryRow("SELECT id_categorie FROM categorie_services WHERE nom_categorie = 'Autre'").Scan(&idAutre)
	
	if err != nil {

		err = database.DB.QueryRow("INSERT INTO categorie_services (nom_categorie) VALUES ('Autre') RETURNING id_categorie").Scan(&idAutre)
		if err != nil {
			sendError(w, "global", "Erreur lors de la préparation de la catégorie 'Autre'.", http.StatusInternalServerError)
			return
		}
	}


	if idToDelete == idAutre {
		sendError(w, "id", "Impossible de supprimer la catégorie de secours 'Autre'.", http.StatusForbidden)
		return
	}


	tx, err := database.DB.Begin()
	if err != nil {
		sendError(w, "global", "Erreur de base de données.", http.StatusInternalServerError)
		return
	}

	
	_, err = tx.Exec("UPDATE service SET id_categorie = $1 WHERE id_categorie = $2", idAutre, idToDelete)
	if err != nil {
		tx.Rollback() 
		sendError(w, "global", "Erreur lors du transfert des services.", http.StatusInternalServerError)
		return
	}


	res, err := tx.Exec("DELETE FROM categorie_services WHERE id_categorie = $1", idToDelete)
	if err != nil {
		tx.Rollback()
		sendError(w, "global", "Erreur lors de la suppression.", http.StatusInternalServerError)
		return
	}


	rows, _ := res.RowsAffected()
	if rows == 0 {
		tx.Rollback()
		sendError(w, "id", "Catégorie non trouvée.", http.StatusNotFound)
		return
	}

	tx.Commit()

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"status": "success",
		"message": "Catégorie supprimée, services transférés vers 'Autre'",
	})
}