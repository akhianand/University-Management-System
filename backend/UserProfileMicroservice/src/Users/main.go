package main

import (
	"log"
	"net/http"

	app "Users/go"
)

func main() {
	log.Printf("Server Started on Port 8000")
	router := app.NewRouter()
	log.Fatal(http.ListenAndServe(":8000", router))
}
