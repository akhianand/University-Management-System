package main

import (
	ctrl "EnrollmentMS/go/controller"
	service "EnrollmentMS/go/service"
	"fmt"
	"log"
	"net/http"
	"github.com/rs/cors"
)

func main() {
	log.Printf("Server started")
	router := ctrl.NewRouter()
	// mux := ctrl.NewServeMux()
    router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte("{\"hello\": \"world\"}"))
    })
	handler := cors.Default().Handler(router)
	fmt.Println("Enrollment Microservice main method")
	go service.StartKafkaConsumer()
	log.Fatal(http.ListenAndServe(":8086", handler))
	
}
