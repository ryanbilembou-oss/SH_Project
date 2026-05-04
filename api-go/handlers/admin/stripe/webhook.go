package stripe

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"
	"silver-happy-api/database"
	"silver-happy-api/pdf"
)

func Webhook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, `{"erreur": "Méthode non autorisée"}`, 405)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil { http.Error(w, "", 400); return }

	var event map[string]interface{}
	if err := json.Unmarshal(body, &event); err != nil { http.Error(w, "", 400); return }

	eventType, _ := event["type"].(string)
	if eventType != "checkout.session.completed" { w.WriteHeader(200); return }

	data, _ := event["data"].(map[string]interface{})
	obj, _ := data["object"].(map[string]interface{})
	metadata, _ := obj["metadata"].(map[string]interface{})

	typeAchat, _      := metadata["type"].(string)
	idUserStr, _      := metadata["id_user"].(string)
	idPaiementStr, _  := metadata["id_paiement"].(string)
	idUser, _         := strconv.Atoi(idUserStr)
	idPaiement, _     := strconv.Atoi(idPaiementStr)
	subscriptionID, _ := obj["subscription"].(string)
	sessionID, _      := obj["id"].(string)
	amountTotal, _    := obj["amount_total"].(float64)

	database.DB.Exec(`UPDATE paiements SET statut = 'paye', stripe_session_id = $1 WHERE id_paiement = $2`, sessionID, idPaiement)

	var adminID int
	database.DB.QueryRow(`SELECT id_user FROM users WHERE role = 'admin' LIMIT 1`).Scan(&adminID)

	switch typeAchat {

	case "abonnement":
		typeAbo, _ := metadata["type_abonnement"].(string)
		var prix float64
		var dateFin time.Time
		now := time.Now()

		var hadAbo bool
		database.DB.QueryRow(`SELECT EXISTS(SELECT 1 FROM abonnement WHERE id_user = $1)`, idUser).Scan(&hadAbo)
		database.DB.Exec(`DELETE FROM abonnement WHERE id_user = $1`, idUser)

		switch typeAbo {
		case "mensuel":
			prix = 4.00; if hadAbo { prix = 3.00 }
			dateFin = now.AddDate(0, 1, 0)
		case "annuel":
			prix = 40.00; if hadAbo { prix = 30.00 }
			dateFin = now.AddDate(1, 0, 0)
		}

		_, err := database.DB.Exec(`
			INSERT INTO abonnement (id_user, type_abonnement, prix_abonnement, date_debut, date_fin, statut, stripe_subscription_id)
			VALUES ($1, $2, $3, $4, $5, 'actif', $6)
		`, idUser, typeAbo, prix, now, dateFin, subscriptionID)
		if err != nil { log.Printf("Webhook abonnement: %v", err); break }

		res, _ := database.DB.Exec(`UPDATE profile_senior SET is_subscription_valid = true WHERE id_user = $1`, idUser)
		rows, _ := res.RowsAffected()
		if rows == 0 { database.DB.Exec(`UPDATE profile_pro SET is_subscription_valid = true WHERE id_user = $1`, idUser) }

		montantHT := prix / 1.20
		label := "Abonnement mensuel Silver Happy"
		if typeAbo == "annuel" { label = "Abonnement annuel Silver Happy" }
		details, _ := json.Marshal(map[string]interface{}{
			"type": "abonnement", "label": label, "type_abonnement": typeAbo,
		})

		var factureID int
		database.DB.QueryRow(`
			INSERT INTO facture (id_emetteur, id_recepteur, montant_ht, montant_ttc, commission_sh, type_achat, details_json)
			VALUES ($1, $2, $3, $4, 0, 'abonnement', $5) RETURNING id_facture
		`, adminID, idUser, montantHT, prix, string(details)).Scan(&factureID)
		if factureID > 0 {
			go pdf.GenerateAndAttach(factureID, database.DB)
		}

		log.Printf("Webhook abonnement: user=%d type=%s", idUser, typeAbo)

	case "panier":
		itemsJSON, _ := metadata["items"].(string)
		var items []struct {
			TypeObjet string  `json:"type_objet"`
			IDObjet   int     `json:"id_objet"`
			Nom       string  `json:"nom"`
			Prix      float64 `json:"prix"`
			Quantite  int     `json:"quantite"`
		}
		json.Unmarshal([]byte(itemsJSON), &items)

		for _, item := range items {
			switch item.TypeObjet {
			case "evenement":
				for i := 0; i < item.Quantite; i++ {
					database.DB.Exec(`INSERT INTO inscription_evenement (id_user, id_evenement, statut) VALUES ($1, $2, 'confirme')`, idUser, item.IDObjet)
				}
				database.DB.Exec(`UPDATE evenements SET nb_inscrits = nb_inscrits + $1 WHERE id_evenement = $2`, item.Quantite, item.IDObjet)
			case "article":
				database.DB.Exec(`UPDATE articles SET stock = stock - $1 WHERE id = $2 AND stock >= $1`, item.Quantite, item.IDObjet)
			}
		}
		database.DB.Exec(`DELETE FROM panier WHERE id_user = $1`, idUser)

		totalTTC := amountTotal / 100
		totalHT  := totalTTC / 1.20
		details, _ := json.Marshal(map[string]interface{}{"type": "panier", "items": items})

		var factureID int
		database.DB.QueryRow(`
			INSERT INTO facture (id_emetteur, id_recepteur, montant_ht, montant_ttc, commission_sh, type_achat, details_json)
			VALUES ($1, $2, $3, $4, 0, 'panier', $5) RETURNING id_facture
		`, adminID, idUser, totalHT, totalTTC, string(details)).Scan(&factureID)
		if factureID > 0 {
			go pdf.GenerateAndAttach(factureID, database.DB)
		}

		log.Printf("Webhook panier: user=%d facture=%d", idUser, factureID)

	case "evenement":
		idItemStr, _ := metadata["id_item"].(string)
		qteStr, _    := metadata["quantite"].(string)
		idItem, _    := strconv.Atoi(idItemStr)
		qte, _       := strconv.Atoi(qteStr)
		if qte <= 0 { qte = 1 }

		for i := 0; i < qte; i++ {
			database.DB.Exec(`INSERT INTO inscription_evenement (id_user, id_evenement, statut) VALUES ($1, $2, 'confirme')`, idUser, idItem)
		}
		database.DB.Exec(`UPDATE evenements SET nb_inscrits = nb_inscrits + $1 WHERE id_evenement = $2`, qte, idItem)

		var nomEvenement string
		database.DB.QueryRow(`SELECT titre FROM evenements WHERE id_evenement = $1`, idItem).Scan(&nomEvenement)

		totalTTC := amountTotal / 100
		totalHT  := totalTTC / 1.20
		details, _ := json.Marshal(map[string]interface{}{
			"type": "evenement", "id_evenement": idItem,
			"nom": nomEvenement, "quantite": qte,
			"prix_unitaire": totalTTC / float64(qte),
		})

		var factureID int
		database.DB.QueryRow(`
			INSERT INTO facture (id_emetteur, id_recepteur, montant_ht, montant_ttc, commission_sh, type_achat, id_achat, details_json)
			VALUES ($1, $2, $3, $4, 0, 'evenement', $5, $6) RETURNING id_facture
		`, adminID, idUser, totalHT, totalTTC, idItem, string(details)).Scan(&factureID)
		if factureID > 0 {
			go pdf.GenerateAndAttach(factureID, database.DB)
		}

		log.Printf("Webhook evenement: user=%d event=%d qty=%d facture=%d", idUser, idItem, qte, factureID)

	case "article":
		idItemStr, _ := metadata["id_item"].(string)
		qteStr, _    := metadata["quantite"].(string)
		idItem, _    := strconv.Atoi(idItemStr)
		qte, _       := strconv.Atoi(qteStr)
		if qte <= 0 { qte = 1 }

		database.DB.Exec(`UPDATE articles SET stock = stock - $1 WHERE id = $2 AND stock >= $1`, qte, idItem)

		var nomArticle string
		database.DB.QueryRow(`SELECT titre FROM articles WHERE id = $1`, idItem).Scan(&nomArticle)

		totalTTC := amountTotal / 100
		totalHT  := totalTTC / 1.20
		details, _ := json.Marshal(map[string]interface{}{
			"type": "article", "id_article": idItem,
			"nom": nomArticle, "quantite": qte,
			"prix_unitaire": totalTTC / float64(qte),
		})

		var factureID int
		database.DB.QueryRow(`
			INSERT INTO facture (id_emetteur, id_recepteur, montant_ht, montant_ttc, commission_sh, type_achat, id_achat, details_json)
			VALUES ($1, $2, $3, $4, 0, 'article', $5, $6) RETURNING id_facture
		`, adminID, idUser, totalHT, totalTTC, idItem, string(details)).Scan(&factureID)
		if factureID > 0 {
			go pdf.GenerateAndAttach(factureID, database.DB)
		}

		log.Printf("Webhook article: user=%d article=%d qty=%d facture=%d", idUser, idItem, qte, factureID)

	case "referencement":
		idRefStr, _ := metadata["id_ref"].(string)
		idRef, _    := strconv.Atoi(idRefStr)
		if idRef > 0 {
			database.DB.Exec(`UPDATE referencement SET actif = true WHERE id = $1`, idRef)
			log.Printf("Webhook referencement active: id=%d pro=%d", idRef, idUser)
		}

	case "intervention":
		idDevisStr, _ := metadata["id_devis"].(string)
		idInterStr, _ := metadata["id_intervention"].(string)
		idProStr, _   := metadata["id_pro"].(string)
		idDevis, _    := strconv.Atoi(idDevisStr)
		idInter, _    := strconv.Atoi(idInterStr)
		idPro, _      := strconv.Atoi(idProStr)

		database.DB.Exec(`UPDATE devis SET statut = 'paye' WHERE id_devis = $1`, idDevis)

		var montantHT, montantTTC, commission float64
		database.DB.QueryRow(`
			SELECT montant_ht, montant_ttc, (montant_ht * taux_commission / 100)
			FROM devis WHERE id_devis = $1
		`, idDevis).Scan(&montantHT, &montantTTC, &commission)

		var factureID int
		database.DB.QueryRow(`
			INSERT INTO facture (id_emetteur, id_recepteur, id_intervention, montant_ht, montant_ttc, commission_sh, type_achat)
			VALUES ($1, $2, $3, $4, $5, $6, 'intervention')
			ON CONFLICT DO NOTHING RETURNING id_facture
		`, idPro, idUser, idInter, montantHT, montantTTC, commission).Scan(&factureID)
		if factureID > 0 {
			go pdf.GenerateAndAttach(factureID, database.DB)
		}

		log.Printf("Webhook intervention: devis=%d inter=%d senior=%d pro=%d facture=%d", idDevis, idInter, idUser, idPro, factureID)
	}

	w.WriteHeader(200)
	json.NewEncoder(w).Encode(map[string]string{"received": "true"})
}