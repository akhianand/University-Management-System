package main

import (
	"log"
	"net/http"

	app "coursesMS/go"
)

func main() {
	log.Printf("Server started")

	router := app.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}
