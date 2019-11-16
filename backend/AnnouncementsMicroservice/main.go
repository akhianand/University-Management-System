package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"encoding/json"
  )

  func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("Announcements API is running!")
  }

  
func main() {
router := mux.NewRouter()
router.HandleFunc("/ping", pingHandler).Methods("GET")


http.ListenAndServe(":8080", router)
}

