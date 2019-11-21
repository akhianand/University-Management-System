package main

import (
	ctrl "FeePaymentMS/go/controller"
	"fmt"
	"log"
	"net/http"
)

func main() {
	log.Printf("Server started")
	router := ctrl.NewRouter()
	fmt.Println("FeePayment Microservice main method")
	log.Fatal(http.ListenAndServe(":8082", router))
}
