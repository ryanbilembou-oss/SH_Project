package main

import (
	"fmt"
	"log"
	"net/http"
	"silver-happy-api/database"
	"silver-happy-api/handlers/admin"
	"silver-happy-api/handlers/admin/article"
	"silver-happy-api/handlers/admin/evenement"
	"silver-happy-api/handlers/users"
)


func main() {
	database.Connect()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Bienvenue sur l'API Go de Silver Happy !")
	})
	

	http.HandleFunc("/register", users.RegisterUser)
	http.HandleFunc("/login", users.LoginUser)

	http.HandleFunc("/admin/users", admin.GetAllUsers)
	http.HandleFunc("/admin/users/delete", admin.DeleteUser)
	http.HandleFunc("/admin/users/create", admin.CreateUser)
	http.HandleFunc("/admin/users/update", admin.UpdateUser)
	http.HandleFunc("/admin/users/get", admin.GetUser)

	http.HandleFunc("/admin/evenement/create", evenement.CreateEvenement)
	http.HandleFunc("/admin/evenement/get", evenement.GetAllEvenements)
	http.HandleFunc("/admin/evenement/getone", evenement.GetEvenement)
	http.HandleFunc("/admin/evenement/delete", evenement.DeleteEvenement)
	http.HandleFunc("/admin/evenement/update", evenement.UpdateEvenement)

	http.HandleFunc("/admin/article/get",     article.GetAllArticles)
	http.HandleFunc("/admin/article/getone",  article.GetArticle)
	http.HandleFunc("/admin/article/create",  article.CreateArticle)
	http.HandleFunc("/admin/article/update",  article.UpdateArticle)
	http.HandleFunc("/admin/article/delete",  article.DeleteArticle)



	fmt.Println("🚀 API Go lancée et connectée à MySQL sur le port 8081...")
	log.Fatal(http.ListenAndServe(":8081", nil))
}