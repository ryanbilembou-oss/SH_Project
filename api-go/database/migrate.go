package database

import (
	"log"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

func RunMigrations() {
	_, err := DB.Exec(`
		CREATE TABLE IF NOT EXISTS migrations (
			id SERIAL PRIMARY KEY,
			filename VARCHAR(255) UNIQUE NOT NULL,
			applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Fatalf("❌ Erreur création table migrations : %v", err)
	}

	files, err := filepath.Glob("migrations/*.sql")
	if err != nil {
		log.Fatalf("❌ Erreur lecture migrations : %v", err)
	}
	sort.Strings(files)

	for _, file := range files {
		filename := filepath.Base(file)

		var count int
		err := DB.QueryRow(
			`SELECT COUNT(*) FROM migrations WHERE filename = $1`, filename,
		).Scan(&count)
		if err != nil {
			log.Printf("⚠️ Erreur vérification migration %s : %v", filename, err)
			continue
		}

		if count > 0 {
			log.Printf("✅ Migration déjà appliquée : %s", filename)
			continue
		}

		content, err := os.ReadFile(file)
		if err != nil {
			log.Printf("⚠️ Erreur lecture fichier %s : %v", filename, err)
			continue
		}

		hasError := false
		statements := strings.Split(string(content), ";")
		for _, stmt := range statements {
			stmt = strings.TrimSpace(stmt)
			if stmt == "" {
				continue
			}
			if _, err := DB.Exec(stmt); err != nil {
				log.Printf("⚠️ Erreur statement dans %s : %v", filename, err)
				hasError = true
			}
		}

		if hasError {
			log.Printf("⚠️ Migration %s appliquée avec des erreurs, enregistrée quand même", filename)
		}

		_, err = DB.Exec(
			`INSERT INTO migrations (filename) VALUES ($1)`, filename,
		)
		if err != nil {
			log.Printf("⚠️ Erreur enregistrement migration %s : %v", filename, err)
			continue
		}

		log.Printf("✅ Migration appliquée : %s", filename)
	}
}