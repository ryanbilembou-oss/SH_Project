package main

import (
	"fmt"
	"log"
	"net/http"
	"silver-happy-api/database" 
	"silver-happy-api/handlers"
)

func main() {
	database.Connect()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bienvenue sur l'API Go de Silver Happy !")
	})
	

	http.HandleFunc("/register", handlers.RegisterUser)
	http.HandleFunc("/login", handlers.LoginUser)
	http.HandleFunc("/admin/users", handlers.GetAllUsers)


	fmt.Println("🚀 API Go lancée et connectée à MySQL sur le port 8081...")
	log.Fatal(http.ListenAndServe(":8081", nil))
}