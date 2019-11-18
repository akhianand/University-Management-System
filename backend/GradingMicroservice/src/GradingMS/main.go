package main

import (
	ctrl "GradingMS/go/controller"
	"log"
	"net/http"
	"os"
)

func main() {
	var mongoURL string = os.Getenv("MONGO_URL")
	//	var database string = os.Getenv("DATABASE")
	//	var collection string = os.Getenv("COLLECTION")
	log.Printf(mongoURL)
	log.Printf("Server started")
	router := ctrl.NewRouter()
	log.Printf("Grading Microservice main method")
	log.Fatal(http.ListenAndServe(":8080", router))
}
