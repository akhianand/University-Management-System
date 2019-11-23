package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"github.com/gorilla/handlers"
)

type GradesMessage struct {
	ID          string `json:"_id"`
	Studentid   int    `json:"studentid"`
	Studentname string `json:"studentname"`
	Courseid    int    `json:"courseid"`
	Coursename  string `json:"coursename"`
	Term        string `json:"term"`
	Grade       string `json:"grade"`
}

type SearchMessage struct {
	CourseID       int         `json:"CourseID"`
	CourseName     string      `json:"CourseName"`
	Instructor     string      `json:"Instructor"`
	ClassTime      []ClassTime `json:"ClassTime"`
	Capacity       int64       `json:"Capacity"`
	SeatsEnrolled  int64       `json:"SeatsEnrolled"`
	Credit         int64       `json:"Credit"`
	Term           string      `json:"Term"`
	DepartmentName string      `json:"DepartmentName"`
	Fees           int64       `json:"Fees"`
}

type ClassTime struct {
	Day          string `json:"Day"`
	StartHour    int64  `json:"StartHour"`
	StartMinutes int64  `json:"StartMinutes"`
	EndHour      int64  `json:"EndHour"`
	EndMinutes   int64  `json:"EndMinutes"`
}

type KeyList struct {
	Keys []string
}

type ClickResponse struct {
	Response []ClickBody
}

type ClickBody struct {
	CourseID   string
	CourseName string
	Clicks     string
}

func pingHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("Announcements API is running!")
}

func clickCount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	keys := KeyList{}
	clickResponse := ClickResponse{}

	response, err := http.Get("http://172.20.39.6:8098/buckets/click-counters/keys?keys=true")
	if err != nil {
		fmt.Printf("The HTTP request for fetching all keys failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)

		err := json.Unmarshal(data, &keys)
		if err != nil {
			fmt.Println(err)
		}
	}

	for _, key := range keys.Keys {
		response, err = http.Get("http://172.20.39.6:8098/buckets/click-counters/counters/" + key)
		if err != nil {
			fmt.Printf("The HTTP request to get counter value failed with error %s\n", err)
		} else {

			data, _ := ioutil.ReadAll(response.Body)
			courseInfoVTag, err := http.Get("http://172.20.39.6:8098/buckets/click-counters/keys/" + key)

			if err != nil {
				fmt.Printf("The HTTP request to get courseInfo from Riak failed with error %s\n", err)
			}

			courseInfoVTagData, _ := ioutil.ReadAll(courseInfoVTag.Body)

			splits := strings.Split(string(courseInfoVTagData), "\n")
			vTag := splits[len(splits)-2]

			courseInfoResponse, err := http.Get("http://172.20.39.6:8098/buckets/click-counters/keys/" + key + "?vtag=" + vTag)

			if err != nil {
				fmt.Printf("The HTTP request to get courseInfo with vTag failed with error %s\n", err)
			}

			courseInfoData, _ := ioutil.ReadAll(courseInfoResponse.Body)

			courseInfo := SearchMessage{}

			err = json.Unmarshal(courseInfoData, &courseInfo)

			if err != nil {
				fmt.Println("Unmarshalling of courseInfo failed.\n", err)
			}
			clickBody := ClickBody{
				CourseID:   key,
				Clicks:     string(data),
				CourseName: courseInfo.CourseName,
			}
			clickResponse.Response = append(clickResponse.Response, clickBody)
		}

	}

	json.NewEncoder(w).Encode(clickResponse)
}

func bestPerformingCourses(w http.ResponseWriter, r *http.Request) {

}

func publishAnnouncement(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "54.91.195.100"})
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

	err = p.Produce(&kafka.Message{
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


	headersOk := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	router := mux.NewRouter()
	router.HandleFunc("/ping", pingHandler).Methods("GET")

	router.HandleFunc("/click-count", clickCount).Methods("GET")

	router.HandleFunc("/best-performing-courses", bestPerformingCourses).Methods("GET")

	router.HandleFunc("/publish-announcement", publishAnnouncement).Methods("POST")

	go consumeMessages()

	go consumeGradeMessages()

	http.ListenAndServe(":8080", handlers.CORS(originsOk, headersOk, methodsOk)(router))

}

func consumeGradeMessages() {

	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "54.91.195.100",
		"group.id":          "grades-consumer-group",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create consumer: %s\n", err)
		os.Exit(1)
	}

	fmt.Printf("Created Consumer %v\n", c)

	err = c.SubscribeTopics([]string{"grades-topic"}, nil)

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))

			data := &GradesMessage{}

			err := json.Unmarshal([]byte(string(msg.Value)), data)
			if err != nil {
				fmt.Println(err)
			}

			client := &http.Client{}
			req, err := http.NewRequest(http.MethodPut, "http://172.20.39.6:8098/buckets/grades-content/keys/"+strconv.Itoa(data.Courseid), bytes.NewBuffer(msg.Value))
			if err != nil {
				panic(err)
			}

			req.Header.Set("Content-Type", "application/json")
			resp, err := client.Do(req)
			if err != nil {
				panic(err)
			}
			fmt.Println("Creation of object in grades bucket with key: ", resp.StatusCode)

			_, err = http.Post("http://172.20.39.6:8098/buckets/grades/counters/"+strconv.Itoa(data.Courseid), "text/plain", bytes.NewBuffer([]byte("1")))
			if err != nil {
				fmt.Println("Failed while incrementing counter for grade", err)
			}

			gradeCountResp, err := http.Get("http://172.20.39.6:8098/buckets/grades/counters/" + strconv.Itoa(data.Courseid))
			gradeCount, _ := ioutil.ReadAll(gradeCountResp.Body)
			fmt.Println("count --- ", string(gradeCount))





			ifCourseRecorded, err := http.Get("http://172.20.39.6:8098/buckets/grades-content/keys/" + strconv.Itoa(data.Courseid))
			if err != nil {
				fmt.Println("Failed while checking if grade is already recorded", err)
			}
			courseInfoVTagData, _ := ioutil.ReadAll(ifCourseRecorded.Body)

			splits := strings.Split(string(courseInfoVTagData), "\n")

			fmt.Println("len....", len(splits))

			fmt.Println("splits----", splits)

			endIndex := len(splits)-2
			for i := 1; i <= endIndex ; i++ {
				fmt.Println(i, "------", splits[i])
			}

		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}

}

func consumeMessages() {
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "54.91.195.100",
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
			//fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))

			data := &SearchMessage{}

			err := json.Unmarshal([]byte(string(msg.Value)), data)
			if err != nil {
				fmt.Println(err)
			}

			client := &http.Client{}
			req, err := http.NewRequest(http.MethodPut, "http://172.20.39.6:8098/buckets/click-counters/keys/"+strconv.Itoa(data.CourseID), bytes.NewBuffer(msg.Value))
			if err != nil {
				panic(err)
			}

			// set the request header Content-Type for json
			req.Header.Set("Content-Type", "application/json")
			resp, err := client.Do(req)
			if err != nil {
				panic(err)
			}
			fmt.Println(resp.StatusCode)

			incrementClickCounter(data.CourseID)
		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}

func incrementClickCounter(id int) {
	response, err := http.Post("http://172.20.39.6:8098/buckets/click-counters/counters/"+strconv.Itoa(id), "text/plain", bytes.NewBuffer([]byte("1")))
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		fmt.Println(string(data))
		fmt.Println("Counter incremented in function")
	}
}
