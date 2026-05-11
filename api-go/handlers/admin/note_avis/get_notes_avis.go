package note_avis

import (
	"encoding/json"

	"net/http"
	"silver-happy-api/database"
)

type NoteAvisDisplay struct {
	Id_avis          int     `json:"id_avis"`
	Id_intervention  *int    `json:"id_intervention"`
	Note             int     `json:"note"`
	Commentaire      *string `json:"commentaire"`
	Date_publication string  `json:"date_publication"`
}

func GetAllNotesAvis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, err := database.DB.Query(`SELECT id_avis, id_intervention, note, commentaire, date_publication FROM note_avis ORDER BY date_publication DESC`)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	avis := []NoteAvisDisplay{}
	for rows.Next() {
		var a NoteAvisDisplay
		rows.Scan(&a.Id_avis, &a.Id_intervention, &a.Note, &a.Commentaire, &a.Date_publication)
		avis = append(avis, a)
	}
	json.NewEncoder(w).Encode(avis)
}

func GetNoteAvis(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id := r.URL.Query().Get("id")
	if id == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var a NoteAvisDisplay
	err := database.DB.QueryRow(`SELECT id_avis, id_intervention, note, commentaire, date_publication FROM note_avis WHERE id_avis=$1`, id).
		Scan(&a.Id_avis, &a.Id_intervention, &a.Note, &a.Commentaire, &a.Date_publication)

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(a)
}