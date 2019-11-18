package main

import (
	ctrl "EnrollmentMS/go/controller"
	"fmt"
	"log"
	"net/http"
)

func main() {
	log.Printf("Server started")
	router := ctrl.NewRouter()
	fmt.Println("Enrollment Microservice main method")
	log.Fatal(http.ListenAndServe(":8086", router))
}
