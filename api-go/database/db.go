package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq" // CHANGEMENT : On utilise le driver PostgreSQL
)

var DB *sql.DB

func Connect() {
    
    user := os.Getenv("DB_USER")
    pass := os.Getenv("DB_PASSWORD")
    host := os.Getenv("DB_HOST")
    port := os.Getenv("DB_PORT")
    dbname := os.Getenv("DB_NAME")

    // CHANGEMENT : Le format de connexion (DSN) est différent pour Postgres
    dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", 
        host, port, user, pass, dbname)
    
    var err error
    // CHANGEMENT : On ouvre en mode "postgres"
    DB, err = sql.Open("postgres", dsn)
    if err != nil {
        log.Fatal("Erreur Open:", err)
    }

    if err = DB.Ping(); err != nil {
        log.Fatal("Le conteneur PostgreSQL ne répond pas :", err)
    }

    log.Println("✅ Connexion PostgreSQL sécurisée réussie !")
}