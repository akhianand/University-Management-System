package main

import (
	ctrl "GradingMS/go/controller"
	"fmt"
	"log"
	"net/http"
)

func main() {
	log.Printf("Server started")
	router := ctrl.NewRouter()
	fmt.Println("Grading Microservice main method")
	log.Fatal(http.ListenAndServe(":8080", router))
}
