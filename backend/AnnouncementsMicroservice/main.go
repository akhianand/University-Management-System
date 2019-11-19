package main

import (
	"github.com/gorilla/mux"
	"net/http"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"os"
	"bytes"
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
		json.NewEncoder(w).Encode(string(data))
    }
  }

  
func main() {
router := mux.NewRouter()
router.HandleFunc("/ping", pingHandler).Methods("GET")

router.HandleFunc("/search-count", searchCount).Methods("GET")

consumeMessages()


http.ListenAndServe(":8080", router)
}

func consumeMessages() {
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "52.55.27.64",
		"group.id":          "search-consumer-group",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create consumer: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("Created Consumer %v\n", c)

	err = c.SubscribeTopics([]string{"search-counter"}, nil)

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
			incrementSearchCounter()
		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}

func incrementSearchCounter() {
	response, err := http.Post("http://172.20.35.213:8098/buckets/search-counter/counters/count", "text/plain", bytes.NewBuffer([]byte("1")))
	if err != nil {
        fmt.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
		fmt.Println("Counter incremented in function")
    }
}