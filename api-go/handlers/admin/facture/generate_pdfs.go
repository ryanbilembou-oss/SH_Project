package facture

import (
	"encoding/json"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/pdf"
)

func GenerateMissingPDFs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	rows, err := database.DB.Query(`SELECT id_facture FROM facture WHERE pdf_url IS NULL OR pdf_url = ''`)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var ids []int
	for rows.Next() {
		var id int
		rows.Scan(&id)
		ids = append(ids, id)
	}

	for _, id := range ids {
		pdf.GenerateAndAttach(id, database.DB)
	}

	json.NewEncoder(w).Encode(map[string]interface{}{"generated": len(ids)})
}