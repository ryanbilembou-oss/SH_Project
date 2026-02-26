package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	// Import du driver PostgreSQL (nécessite : go get github.com/lib/pq)
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Connect() {
	// Récupération des variables depuis le .env (chargé via docker-compose)
	user   := os.Getenv("DB_USER")     // postgres
	pass   := os.Getenv("DB_PASSWORD") // root
	host   := os.Getenv("DB_HOST")     // silver_happy_db
	port   := os.Getenv("DB_PORT")     // 5432
	dbname := os.Getenv("DB_NAME")     // silver_happy

	// Format DSN pour PostgreSQL : "host=... port=... user=... password=... dbname=... sslmode=disable"
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, pass, dbname)

	var err error
	// On ouvre la connexion avec le driver "postgres"
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("❌ Erreur lors de l'ouverture de la connexion PostgreSQL :", err)
	}

	// Ping pour vérifier que la base de données est prête
	if err = DB.Ping(); err != nil {
		log.Fatal("❌ Le conteneur PostgreSQL ne répond pas :", err)
	}

	log.Println("✅ Connexion PostgreSQL sécurisée réussie (SQL pur) !")
}