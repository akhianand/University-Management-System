package main

import (
	ctrl "GradingMS/go/controller"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
)

func main() {
	var mongoURL string = os.Getenv("MONGO_URL")
	//	var database string = os.Getenv("DATABASE")
	//	var collection string = os.Getenv("COLLECTION")
	log.Printf(mongoURL)
	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	log.Printf("Server started")
	router := ctrl.NewRouter()
	log.Printf("Grading Microservice main method")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
