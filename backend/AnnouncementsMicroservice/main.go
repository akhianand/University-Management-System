package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"encoding/json"
	"fmt"
	"io/ioutil"
  )

  func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("Announcements API is running!")
  }

  func searchCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response, err := http.Get("http://172.20.35.213:8098/buckets/search-counter/counters/count")
	if err != nil {
        fmt.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
        fmt.Println(string(data))
    }

	json.NewEncoder(w).Encode("Announcements API is running!")
  }

  
func main() {
router := mux.NewRouter()
router.HandleFunc("/ping", pingHandler).Methods("GET")

router.HandleFunc("/search-count", searchCount).Methods("GET")


http.ListenAndServe(":8080", router)
}

