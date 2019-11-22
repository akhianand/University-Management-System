package main

import (
	app "Users/go"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

func main() {
	log.Printf("Server Started on Port 8000")
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	router := app.NewRouter()
   	
	go app.ConsumeAnnouncementFromKafka()

	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
