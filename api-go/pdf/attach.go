package pdf

import (
	"database/sql"
	"fmt"
	"log"
)

func GenerateAndAttach(factureID int, db *sql.DB) {
	var data FacturePDFData
	data.IdFacture = factureID

	var nomEntreprise, siret, adresse, tel, nomService, nomCat, dateDebut, dateFin, lieu, details, typeAchat sql.NullString
	var commissionSH, gainNet sql.NullFloat64

	err := db.QueryRow(`
		SELECT
			COALESCE(pp.nom, u1.email), COALESCE(pp.prenom, ''),
			pp.nom_entreprise, pp.siret, pp.adresse_pro, pp.telephone_pro,
			COALESCE(ps.nom, u2.email), COALESCE(ps.prenom, ''),
			s.nom, cs.nom_categorie,
			i.date_heure_debut::text, i.date_heure_fin::text,
			i.lieu,
			f.montant_ht, f.montant_ttc, f.commission_sh,
			f.montant_ht - f.commission_sh,
			f.type_achat, f.details_json
		FROM facture f
		LEFT JOIN users u1 ON f.id_emetteur = u1.id_user
		LEFT JOIN users u2 ON f.id_recepteur = u2.id_user
		LEFT JOIN profile_pro pp ON f.id_emetteur = pp.id_user
		LEFT JOIN profile_senior ps ON f.id_recepteur = ps.id_user
		LEFT JOIN intervention i ON f.id_intervention = i.id
		LEFT JOIN service s ON i.id_service = s.id
		LEFT JOIN categorie_services cs ON s.id_categorie = cs.id_categorie
		WHERE f.id_facture = $1
	`, factureID).Scan(
		&data.NomEmetteur, &data.PrenomEmetteur,
		&nomEntreprise, &siret, &adresse, &tel,
		&data.NomRecepteur, &data.PrenomRecepteur,
		&nomService, &nomCat,
		&dateDebut, &dateFin, &lieu,
		&data.MontantHT, &data.MontantTTC, &commissionSH,
		&gainNet,
		&typeAchat, &details,
	)
	if err != nil {
		log.Printf("pdf.GenerateAndAttach query error facture %d: %v", factureID, err)
		return
	}

	if nomEntreprise.Valid {
		data.NomEntreprise = nomEntreprise.String
	}
	if siret.Valid {
		data.SiretEmetteur = siret.String
	}
	if adresse.Valid {
		data.AdresseEmetteur = adresse.String
	}
	if tel.Valid {
		data.TelEmetteur = tel.String
	}
	if nomService.Valid {
		data.NomService = nomService.String
	}
	if nomCat.Valid {
		data.NomCategorie = nomCat.String
	}
	if dateDebut.Valid {
		data.DateDebut = dateDebut.String
	}
	if dateFin.Valid {
		data.DateFin = dateFin.String
	}
	if lieu.Valid {
		data.Lieu = lieu.String
	}
	if commissionSH.Valid {
		data.CommissionSH = commissionSH.Float64
	}
	if gainNet.Valid {
		data.GainNet = gainNet.Float64
	}
	if typeAchat.Valid {
    data.TypeAchat = typeAchat.String
	}
	if details.Valid {
		data.DetailsJson = details.String
	}

	filePath := fmt.Sprintf("/app/uploads/factures/facture_%d.pdf", factureID)
	pdfURL := fmt.Sprintf("/uploads/factures/facture_%d.pdf", factureID)

	if err := Generate(data, filePath); err != nil {
		log.Printf("pdf.GenerateAndAttach generate error facture %d: %v", factureID, err)
		return
	}

	_, err = db.Exec(`UPDATE facture SET pdf_url = $1 WHERE id_facture = $2`, pdfURL, factureID)
	if err != nil {
		log.Printf("pdf.GenerateAndAttach update error facture %d: %v", factureID, err)
	}

	log.Printf("PDF facture %d genere : %s", factureID, pdfURL)
}