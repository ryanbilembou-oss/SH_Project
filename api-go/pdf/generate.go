package pdf

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/jung-kurt/gofpdf"
)

type FacturePDFData struct {
	IdFacture       int
	NomEmetteur     string
	PrenomEmetteur  string
	NomEntreprise   string
	SiretEmetteur   string
	AdresseEmetteur string
	TelEmetteur     string
	NomRecepteur    string
	PrenomRecepteur string
	NomService      string
	NomCategorie    string
	DateDebut       string
	DateFin         string
	Lieu            string
	MontantHT       float64
	MontantTTC      float64
	CommissionSH    float64
	GainNet         float64
	TypeAchat       string
	DetailsJson     string
}

func toISO(s string) string {
	var buf bytes.Buffer
	for _, r := range s {
		if r < 256 {
			buf.WriteByte(byte(r))
		} else {
			buf.WriteByte('?')
		}
	}
	return buf.String()
}

func Generate(data FacturePDFData, filePath string) error {
	if err := os.MkdirAll(filepath.Dir(filePath), 0755); err != nil {
		return err
	}

	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.SetMargins(20, 20, 20)
	pdf.AddPage()

	pdf.SetFillColor(26, 43, 73)
	pdf.Rect(0, 0, 210, 35, "F")
	pdf.SetTextColor(255, 255, 255)
	pdf.SetFont("Arial", "B", 22)
	pdf.SetXY(20, 10)
	pdf.Cell(100, 15, toISO("Silver Happy"))
	pdf.SetFont("Arial", "", 10)
	pdf.SetXY(130, 10)
	pdf.Cell(60, 7, toISO(fmt.Sprintf("Facture N %d", data.IdFacture)))
	pdf.SetXY(130, 17)
	pdf.Cell(60, 7, toISO("Date : "+time.Now().Format("02/01/2006")))
	pdf.SetXY(130, 24)
	pdf.Cell(60, 7, toISO("Silver Happy - 244 rue Faubourg Saint-Antoine"))

	pdf.SetTextColor(30, 30, 30)

	pdf.SetFont("Arial", "B", 11)
	pdf.SetXY(20, 45)
	pdf.CellFormat(80, 8, toISO("EMETTEUR"), "0", 0, "L", false, 0, "")
	pdf.SetXY(110, 45)
	pdf.CellFormat(80, 8, toISO("DESTINATAIRE"), "0", 0, "L", false, 0, "")

	pdf.SetFont("Arial", "", 10)
	pdf.SetXY(20, 55)
	pdf.MultiCell(85, 6, toISO(buildEmetteurText(data)), "0", "L", false)

	pdf.SetFont("Arial", "", 10)
	pdf.SetXY(110, 55)
	pdf.MultiCell(85, 6, toISO(data.PrenomRecepteur+" "+data.NomRecepteur), "0", "L", false)

	y := 95.0
	pdf.SetDrawColor(200, 200, 200)
	pdf.Line(20, y, 190, y)
	y += 8

	y = renderDetails(pdf, data, y)

	pdf.Line(20, y, 190, y)
	y += 8

	pdf.SetFont("Arial", "B", 11)
	pdf.SetXY(20, y)
	pdf.Cell(170, 7, toISO("Recapitulatif financier"))
	y += 10

	financialRows := [][2]string{
		{"Montant HT", fmt.Sprintf("%.2f EUR", data.MontantHT)},
		{"TVA (20%)", fmt.Sprintf("%.2f EUR", data.MontantTTC-data.MontantHT)},
		{"Montant TTC", fmt.Sprintf("%.2f EUR", data.MontantTTC)},
	}
	if data.CommissionSH > 0 {
		financialRows = append(financialRows,
			[2]string{"Commission Silver Happy", fmt.Sprintf("%.2f EUR", data.CommissionSH)},
			[2]string{"Gain net prestataire", fmt.Sprintf("%.2f EUR", data.GainNet)},
		)
	}

	for _, row := range financialRows {
		pdf.SetXY(20, y)
		pdf.SetFont("Arial", "B", 10)
		pdf.Cell(100, 7, toISO(row[0]))
		pdf.SetFont("Arial", "", 10)
		pdf.Cell(70, 7, toISO(row[1]))
		y += 8
	}

	pdf.SetFillColor(26, 43, 73)
	pdf.SetTextColor(255, 255, 255)
	pdf.Rect(20, y+5, 170, 10, "F")
	pdf.SetFont("Arial", "B", 11)
	pdf.SetXY(20, y+5)
	pdf.Cell(100, 10, toISO("Total TTC"))
	pdf.Cell(70, 10, toISO(fmt.Sprintf("%.2f EUR", data.MontantTTC)))

	pdf.SetTextColor(150, 150, 150)
	pdf.SetFont("Arial", "I", 8)
	pdf.SetXY(20, 270)
	pdf.Cell(170, 6, toISO("Silver Happy - 244 rue du Faubourg Saint-Antoine, 75011 Paris - contact@silverhappy.fr"))

	return pdf.OutputFileAndClose(filePath)
}

func renderDetails(pdf *gofpdf.Fpdf, data FacturePDFData, y float64) float64 {
	var details map[string]interface{}
	if data.DetailsJson != "" {
		json.Unmarshal([]byte(data.DetailsJson), &details)
	}

	switch data.TypeAchat {
	case "intervention":
		pdf.SetFont("Arial", "B", 11)
		pdf.SetXY(20, y)
		pdf.Cell(170, 7, toISO("Detail de la prestation"))
		y += 10

		rows := [][2]string{}
		if data.NomCategorie != "" {
			rows = append(rows, [2]string{"Categorie", data.NomCategorie})
		}
		if data.NomService != "" {
			rows = append(rows, [2]string{"Service", data.NomService})
		}
		if data.DateDebut != "" {
			rows = append(rows, [2]string{"Debut", formatDate(data.DateDebut)})
		}
		if data.DateFin != "" {
			rows = append(rows, [2]string{"Fin", formatDate(data.DateFin)})
		}
		if data.Lieu != "" {
			rows = append(rows, [2]string{"Lieu", data.Lieu})
		}
		for _, row := range rows {
			pdf.SetXY(20, y)
			pdf.SetFont("Arial", "B", 10)
			pdf.Cell(50, 6, toISO(row[0]+" :"))
			pdf.SetFont("Arial", "", 10)
			pdf.Cell(120, 6, toISO(row[1]))
			y += 7
		}
		y += 5

	case "abonnement":
		pdf.SetFont("Arial", "B", 11)
		pdf.SetXY(20, y)
		pdf.Cell(170, 7, toISO("Detail de l'abonnement"))
		y += 10

		label := ""
		typeAbo := ""
		if details != nil {
			if v, ok := details["label"].(string); ok {
				label = v
			}
			if v, ok := details["type_abonnement"].(string); ok {
				typeAbo = v
			}
		}
		rows := [][2]string{
			{"Formule", label},
			{"Type", typeAbo},
		}
		for _, row := range rows {
			if row[1] == "" {
				continue
			}
			pdf.SetXY(20, y)
			pdf.SetFont("Arial", "B", 10)
			pdf.Cell(50, 6, toISO(row[0]+" :"))
			pdf.SetFont("Arial", "", 10)
			pdf.Cell(120, 6, toISO(row[1]))
			y += 7
		}
		y += 5

	case "panier", "article", "evenement":
		pdf.SetFont("Arial", "B", 11)
		pdf.SetXY(20, y)
		pdf.Cell(170, 7, toISO("Detail de la commande"))
		y += 10

		var items []map[string]interface{}
		if details != nil {
			if v, ok := details["items"].([]interface{}); ok {
				for _, raw := range v {
					if item, ok := raw.(map[string]interface{}); ok {
						items = append(items, item)
					}
				}
			} else {
				item := map[string]interface{}{}
				if v, ok := details["nom"].(string); ok {
					item["nom"] = v
				}
				if v, ok := details["quantite"]; ok {
					item["quantite"] = v
				}
				if v, ok := details["prix_unitaire"]; ok {
					item["prix_unitaire"] = v
				}
				if v, ok := details["type_objet"].(string); ok {
					item["type_objet"] = v
				} else {
					item["type_objet"] = data.TypeAchat
				}
				items = append(items, item)
			}
		}

		pdf.SetFont("Arial", "B", 10)
		pdf.SetXY(20, y)
		pdf.CellFormat(90, 7, toISO("Article / Evenement"), "B", 0, "L", false, 0, "")
		pdf.CellFormat(25, 7, toISO("Type"), "B", 0, "C", false, 0, "")
		pdf.CellFormat(25, 7, toISO("Qte"), "B", 0, "C", false, 0, "")
		pdf.CellFormat(30, 7, toISO("Prix unit."), "B", 0, "R", false, 0, "")
		y += 8

		pdf.SetFont("Arial", "", 10)
		for _, item := range items {
			nom := ""
			typeObjet := ""
			qte := 0.0
			prix := 0.0

			if v, ok := item["nom"].(string); ok {
				nom = v
			}
			if v, ok := item["type_objet"].(string); ok {
				typeObjet = v
			}
			if v, ok := item["quantite"].(float64); ok {
				qte = v
			}
			if v, ok := item["prix"].(float64); ok {
				prix = v
			} else if v, ok := item["prix_unitaire"].(float64); ok {
				prix = v
			}

			typeLabel := "Article"
			if typeObjet == "evenement" {
				typeLabel = "Evenement"
			}

			pdf.SetXY(20, y)
			pdf.CellFormat(90, 6, toISO(nom), "0", 0, "L", false, 0, "")
			pdf.CellFormat(25, 6, toISO(typeLabel), "0", 0, "C", false, 0, "")
			pdf.CellFormat(25, 6, toISO(fmt.Sprintf("%.0f", qte)), "0", 0, "C", false, 0, "")
			pdf.CellFormat(30, 6, toISO(fmt.Sprintf("%.2f EUR", prix)), "0", 0, "R", false, 0, "")
			y += 7
		}
		y += 5

	case "referencement":
		pdf.SetFont("Arial", "B", 11)
		pdf.SetXY(20, y)
		pdf.Cell(170, 7, toISO("Detail du referencement"))
		y += 10

		typeRef := ""
		if details != nil {
			if v, ok := details["type"].(string); ok {
				typeRef = v
			}
		}
		if typeRef != "" {
			pdf.SetXY(20, y)
			pdf.SetFont("Arial", "B", 10)
			pdf.Cell(50, 6, toISO("Type :"))
			pdf.SetFont("Arial", "", 10)
			pdf.Cell(120, 6, toISO(typeRef))
			y += 7
		}
		y += 5
	}

	return y
}

func buildEmetteurText(data FacturePDFData) string {
	text := data.PrenomEmetteur + " " + data.NomEmetteur
	if data.NomEntreprise != "" {
		text += "\n" + data.NomEntreprise
	}
	if data.SiretEmetteur != "" {
		text += "\nSIRET : " + data.SiretEmetteur
	}
	if data.AdresseEmetteur != "" {
		text += "\n" + data.AdresseEmetteur
	}
	if data.TelEmetteur != "" {
		text += "\nTel : " + data.TelEmetteur
	}
	return text
}

func formatDate(s string) string {
	t, err := time.Parse(time.RFC3339, s)
	if err != nil {
		t, err = time.Parse("2006-01-02T15:04:05.999999-07:00", s)
		if err != nil {
			return s
		}
	}
	return t.Format("02/01/2006 15:04")
}