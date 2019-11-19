package service

import (
	model "GradingMS/go/model"
	"GradingMS/go/util"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mgo.v2"
)

//SubmitGrade validates request for submitting grade and inserts in DB
func SubmitGrade(grade *model.Grade) {

	// TODO validation checks
	//check student enrolled in course (handled in frontend)
	fmt.Println("Inser Submit Grade service method")
	fmt.Println("Submit Grade service method dialling up mongo db connection")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		fmt.Println("Mongo Dial Error")
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	if err := c.Insert(grade); err != nil {
		fmt.Println("Mongo Insert Error")
		util.LogErrorWithoutFailing(err, "Mongo Insert Error")
	}
	publishToQueue(grade)
}

//GetGrades returns slice of grades for the query
func GetGrades(gradeQueryFilter *model.GradeQueryFilter) (error, []model.Grade) {
	fmt.Println("Get Grades service method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		fmt.Println("Mongo Dial Error")
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	var grades []model.Grade = []model.Grade{}
	err = c.Find(gradeQueryFilter).All(&grades)
	if err != nil {
		return util.NewInternalServerError("Mongo find Error " + err.Error()), nil
	}
	return nil, grades
}

func publishToQueue(grade *model.Grade) {
	log.Printf("publish to queue service method")
	fmt.Println("publishing to queue service method")
	jsonString, err := json.Marshal(grade)
	gradeString := string(jsonString)
	fmt.Println("Logging payment to kafka StudentID:" + strconv.Itoa(grade.StudentID))
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVER")})
	if err != nil {
		fmt.Println("Kafka fee submission message")
		util.LogErrorWithoutFailing(err, "Kafka fee submission message")
	}
	// Produce messages to topic (asynchronously)
	topic := os.Getenv("GRADE_SUBMIT_TOPIC")
	for _, word := range []string{string(gradeString)} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}
}
