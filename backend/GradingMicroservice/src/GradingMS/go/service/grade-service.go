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
	publishGradeToQueue(grade)
}

//UpsertGrade validates request for submitting grade and upserts in DB
// func UpsertGrade(grade *model.Grade) {

// 	// TODO validation checks
// 	//check student enrolled in course (handled in frontend)
// 	fmt.Println("Inser Submit Grade service method")
// 	fmt.Println("Submit Grade service method dialling up mongo db connection")
// 	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
// 	if err != nil {
// 		fmt.Println("Mongo Dial Error")
// 		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
// 	}
// 	defer session.Close()
// 	session.SetMode(mgo.Monotonic, true)
// 	var filter model.GradeQueryFilter
// 	if grade.StudentID != "" {
// 		id, err := strconv.Atoi(StudentID)
// 		if err != nil {
// 			return nil, util.NewBadRequestError("StudentID must be integer")
// 		}
// 		filter.StudentID = bson.M{"$eq": id}
// 	}
// 	if grade.CourseID != "" {
// 		id, err := strconv.Atoi(CourseID)
// 		if err != nil {
// 			return nil, util.NewBadRequestError("CourseID must be integer")
// 		}
// 		filter.CourseID = bson.M{"$eq": id}
// 	}
// 	if grade.Term != "" {
// 		filter.Term = bson.RegEx{
// 			Pattern: "^" + Term + "$",
// 			Options: "i",
// 		}
// 	}
// 	c := session.DB(os.Getenv("DATABASE")).C("grade")
// 	info, err := c.Upsert(filter, grade)
// 	if err != nil {
// 		fmt.Println("Error in upserting doc")
// 	}
// 	var upsertedGrade model.Grade = model.Grade{}
// 	error = c.Find(filter).One(&upsertedGrade)
// 	if error != nil {
// 		publishToQueue(&upsertedGrade)
// 	}
// }

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

func publishGradeToQueue(grade *model.Grade) {
	log.Printf("publish to queue service method")
	fmt.Println("publishing to queue service method")
	jsonString, err := json.Marshal(grade)
	gradeString := string(jsonString)
	fmt.Println("Logging grade to kafka StudentID:" + strconv.Itoa(grade.StudentID))
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
