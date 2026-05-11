package intervention

import (
  "encoding/json"
  "log"
  "net/http"
  "silver-happy-api/database"
)

func UpdateIntervention(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
  w.Header().Set("Content-Type", "application/json")

  if r.Method == http.MethodOptions {
    w.WriteHeader(http.StatusOK)
    return
  }
  if r.Method != http.MethodPut {
    w.WriteHeader(http.StatusMethodNotAllowed)
    json.NewEncoder(w).Encode(map[string]string{"error": "Méthode non autorisée"})
    return
  }

  var req InterventionRequest
  if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
    w.WriteHeader(http.StatusBadRequest)
    json.NewEncoder(w).Encode(map[string]string{"error": "JSON invalide"})
    return
  }

  if req.Id == 0 {
    w.WriteHeader(http.StatusBadRequest)
    json.NewEncoder(w).Encode(map[string]string{"error": "ID manquant"})
    return
  }

  query := `
    UPDATE intervention
    SET id_pro=$1, id_senior=$2, id_service=$3, bio_intervention=$4,
      date_heure_debut=$5, date_heure_fin=$6, lieu=$7,
      statut=COALESCE($8, statut), commission_montant=$9, prix=$10, est_medical=$11
    WHERE id=$12
  `


  _, err := database.DB.Exec(query,
    req.Id_pro,          
    req.Id_senior,       
    req.Id_service,      
    req.Bio_intervention, 
    req.DateHeureDebut,  
    req.DateHeureFin,     
    req.Lieu,             
    req.Statut,          
    req.CommissionMontant, 
    req.Prix,             
    req.EstMedical,       
    req.Id,               
  )

  if err != nil {
    log.Printf("❌ UpdateIntervention - Erreur SQL : %v", err)
    w.WriteHeader(http.StatusInternalServerError)
    json.NewEncoder(w).Encode(map[string]string{"error": "Erreur base de données"})
    return
  }



  log.Printf("✅ UpdateIntervention - ID %d mis à jour", req.Id)
  w.WriteHeader(http.StatusOK)
  json.NewEncoder(w).Encode(map[string]interface{}{
    "success": true,
    "message": "Intervention mise à jour avec succès",
  })
}