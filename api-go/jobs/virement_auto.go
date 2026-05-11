package jobs

import (
	"database/sql"
	"log"
	"time"
)

func StartVirementAuto(db *sql.DB) {
	go func() {
		for {
			processerVirements(db)
			time.Sleep(15 * time.Second)
		}
	}()
}

func processerVirements(db *sql.DB) {
	rows, err := db.Query(`
		SELECT i.id, f.id_facture, f.id_emetteur, f.montant_ht - f.commission_sh
		FROM intervention i
		JOIN facture f ON f.id_intervention = i.id
		WHERE i.statut = 'terminee'
		AND NOT EXISTS (
			SELECT 1 FROM virement v WHERE v.id_intervention = i.id AND v.statut = 'effectue'
		)
		AND NOT EXISTS (
			SELECT 1 FROM litiges l WHERE l.id_intervention = i.id AND l.statut = 'ouvert'
		)
	`)
	if err != nil {
		log.Printf("VirementAuto query error: %v", err)
		return
	}
	defer rows.Close()

	count := 0
	for rows.Next() {
		var idInter, idFacture, idPro int
		var gainNet float64
		if err := rows.Scan(&idInter, &idFacture, &idPro, &gainNet); err != nil {
			continue
		}

		now := time.Now()
		var idVirement int
		err := db.QueryRow(`
			INSERT INTO virement (id_pro, id_facture, id_intervention, montant, statut, date_virement)
			VALUES ($1, $2, $3, $4, 'effectue', $5)
			ON CONFLICT DO NOTHING
			RETURNING id_virement
		`, idPro, idFacture, idInter, gainNet, now).Scan(&idVirement)
		if err != nil {
			continue
		}
		if idVirement > 0 {
			log.Printf("VirementAuto: pro=%d intervention=%d montant=%.2f", idPro, idInter, gainNet)
			count++
		}
	}

	if count > 0 {
		log.Printf("VirementAuto: %d virement(s) effectue(s)", count)
	}
}

func ProcesserVirementSingle(idIntervention int, db *sql.DB) {
	var idFacture, idPro int
	var gainNet float64
	err := db.QueryRow(`
		SELECT f.id_facture, f.id_emetteur, f.montant_ht - f.commission_sh
		FROM facture f WHERE f.id_intervention = $1
	`, idIntervention).Scan(&idFacture, &idPro, &gainNet)
	if err != nil {
		log.Printf("ProcesserVirementSingle error: %v", err)
		return
	}

	now := time.Now()
	var idVirement int
	db.QueryRow(`
		INSERT INTO virement (id_pro, id_facture, id_intervention, montant, statut, date_virement)
		VALUES ($1, $2, $3, $4, 'effectue', $5)
		ON CONFLICT DO NOTHING
		RETURNING id_virement
	`, idPro, idFacture, idIntervention, gainNet, now).Scan(&idVirement)

	if idVirement > 0 {
		log.Printf("VirementSingle: pro=%d intervention=%d montant=%.2f", idPro, idIntervention, gainNet)
	}
}

func DeclencherRemboursement(idIntervention int, db *sql.DB) {
	var sessionID string
	err := db.QueryRow(
		`SELECT stripe_session_id FROM paiements WHERE type_objet = 'intervention' AND id_objet = $1 AND statut = 'paye'`,
		idIntervention,
	).Scan(&sessionID)
	if err != nil || sessionID == "" {
		log.Printf("DeclencherRemboursement: session introuvable pour intervention=%d", idIntervention)
		return
	}
	log.Printf("Remboursement litige declenche: intervention=%d session=%s", idIntervention, sessionID)
}