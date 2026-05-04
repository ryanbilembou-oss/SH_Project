package pdf

import (
	"bytes"
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
	pdf.Cell(60, 7, toISO(fmt.Sprintf("Facture N° %d", data.IdFacture)))
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

	if data.NomService != "" {
		pdf.SetFont("Arial", "B", 11)
		pdf.SetXY(20, y)
		pdf.Cell(170, 7, toISO("Detail de la prestation"))
		y += 10

		rows := [][2]string{}
		if data.NomCategorie != "" {
			rows = append(rows, [2]string{"Categorie", data.NomCategorie})
		}
		rows = append(rows, [2]string{"Service", data.NomService})
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
	}

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