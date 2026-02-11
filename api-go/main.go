package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bienvenue sur l'API Go de Silver Happy !")
	})

	fmt.Println("API Go lancée sur le port 8081...")
	http.ListenAndServe(":8081", nil)
}