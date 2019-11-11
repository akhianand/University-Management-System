package main

import (
	"log"
	"net/http"

	app "./go"
)

func main() {
	log.Printf("Server started")

	router := app.NewRouter()

	log.Fatal(http.ListenAndServe(":8080", router))
}
