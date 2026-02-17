package database

import (
    "database/sql"
    "fmt"
    "log"
    "os" // Pour lire les variables d'environnement

    _ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
    
    user := os.Getenv("DB_USER")
    pass := os.Getenv("DB_PASSWORD")
    host := os.Getenv("DB_HOST")
    port := os.Getenv("DB_PORT")
    dbname := os.Getenv("DB_NAME")

    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=true", 
        user, pass, host, port, dbname)
    
    var err error
    DB, err = sql.Open("mysql", dsn)
    if err != nil {
        log.Fatal("Erreur Open:", err)
    }

    if err = DB.Ping(); err != nil {
        log.Fatal("Le conteneur MySQL ne répond pas :", err)
    }

    log.Println("✅ Connexion MySQL sécurisée réussie !")
}