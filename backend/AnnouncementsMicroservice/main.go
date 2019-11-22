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
	"log"
  )

  func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("Announcements API is running!")
  }

  func searchCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	response, err := http.Get("http://172.20.39.6:8098/buckets/search-counter/counters/count")
	if err != nil {
        fmt.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
		json.NewEncoder(w).Encode(string(data))
    }
  }

  func publishAnnouncement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "54.144.3.194"})
	if err != nil {
		panic(err)
	}

	defer p.Close()

	topic := "announcements"

	bodyBytes, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
    }
    bodyString := string(bodyBytes)
	
	err  = p.Produce(&kafka.Message{
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Value:          []byte(bodyString),
	}, nil)

	event := <-p.Events()
	switch e := event.(type) {
	case kafka.Error:
		pErr := e
		fmt.Println("producer error", pErr.String())
	default:
		fmt.Println("Kafka producer event", e)
	}
	json.NewEncoder(w).Encode("Announcement pushed to queue: ")
  }

  
func main() {
router := mux.NewRouter()
router.HandleFunc("/ping", pingHandler).Methods("GET")

router.HandleFunc("/search-count", searchCount).Methods("GET")

router.HandleFunc("/publish-announcement", publishAnnouncement).Methods("POST")

go consumeMessages()

http.ListenAndServe(":8080", router)



}

func consumeMessages() {
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "54.144.3.194",
		"group.id":          "search-consumer-group",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create consumer: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("Created Consumer %v\n", c)

	err = c.SubscribeTopics([]string{"search-topic"}, nil)

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
	response, err := http.Post("http://172.20.39.6:8098/buckets/search-counter/counters/count", "text/plain", bytes.NewBuffer([]byte("1")))
	if err != nil {
        fmt.Printf("The HTTP request failed with error %s\n", err)
    } else {
        data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
		fmt.Println("Counter incremented in function")
    }
}