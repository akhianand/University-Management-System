package service

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/util"
	"fmt"
	"log"
	"os"
	"encoding/json"
	"strconv"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AddCourseToCart(cartItem *model.CourseEnrollment) (error) {
	log.Printf("Add Course To Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	//session, err := mgo.Dial(os.Getenv("localhost:27017"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	log.Printf("Cart item ", cartItem)
	if err := c.Insert(cartItem); err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Insert Error")
	}

	return nil

}

func GetCart(studentId int) ([]model.CourseEnrollment) {
	log.Printf("Get Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	var cartItems []model.CourseEnrollment = []model.CourseEnrollment{}
	err = c.Find(bson.M{"StudentId": studentId, "isenrolled": false}).All(&cartItems)
	
	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo find Error ")
	}
	
	return cartItems	
}

func EnrollCourse(studentId int, courseId int) (error) {
	log.Printf("Enroll Course service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")

	// get courseEnrollment 
	var courseEnrollment model.CourseEnrollment
	err = c.Find(bson.M{"StudentId": studentId, "CourseId": courseId}).One(&courseEnrollment)
	courseEnrollment.IsEnrolled = true
	
	// update isEnrolled	
	err = c.Update(bson.M{"StudentId": studentId, "CourseId": courseId}, courseEnrollment)

	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo Update Error")
	}
	
	// publish course to queue
	publishCourseEnrollment(courseEnrollment)
	return nil
	// add course to enrollmentCollection

}

func publishCourseEnrollment(courseEnrollment model.CourseEnrollment) {
	log.Printf("Inside Publish Course enrollment service method")
	jsonString, err := json.Marshal(courseEnrollment)
	courseEnrollmentString := string(jsonString)
	fmt.Println("Logging enrollment to kafka StudentID:" + strconv.Itoa(courseEnrollment.StudentId))
	log.Printf("Logging enrollment to kafka StudentID:" + strconv.Itoa(courseEnrollment.StudentId))
	// p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVER")})
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVER")})

	if err != nil {
		fmt.Println("Kafka fee submission message")
		util.LogErrorWithoutFailing(err, "Kafka fee submission message")
	}

	// Produce messages to topic (asynchronously)
	// topic := os.Getenv("FEE_PAID_TOPIC")
	topic := "ENROLLMENT_TOPIC"
	for _, word := range []string{string(courseEnrollmentString)} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}	
}

func GetEnrollments(studentId int) ([]model.CourseEnrollment) {
	log.Printf("Get Enrollments service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	var enrolledCourses []model.CourseEnrollment = []model.CourseEnrollment{}
	err = c.Find(bson.M{"StudentId": studentId, "isenrolled": true}).All(&enrolledCourses)
	
	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo find Error ")
	}
	
	return enrolledCourses	
}

func GetAllEnrollments() ([]model.CourseEnrollment) {
	log.Printf("Get All Enrollments service method")

	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	
	var enrollments []model.CourseEnrollment = []model.CourseEnrollment{}

	err = c.Find(bson.M{}).All(&enrollments)
	
	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo find Error ")
	}
	
	return enrollments
}

func GetEnrollmentsByCourse(courseId int) ([]model.CourseEnrollment) {
	log.Printf("Get All Enrollments service method")

	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	
	var enrollments []model.CourseEnrollment = []model.CourseEnrollment{}

	err = c.Find(bson.M{"CourseId" : courseId}).All(&enrollments)
	
	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo find Error ")
	}
	
	return enrollments
}



func DropCourse(studentId int, courseId int) (error) {
	log.Printf("Drop Course service method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")

	// delete course
	err = c.Remove(bson.M{"StudentId": studentId, "CourseId": courseId})

	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo Delete Error")
	}

	return nil

}

func updateFeePayment(studentId int, courseId int) (error) {

	log.Printf("Inside Update Fee Payment service method ", studentId , courseId)		
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
		return nil;
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")

	// get course Enrollment 
	var courseEnrollment model.CourseEnrollment
	err = c.Find(bson.M{"StudentId": studentId, "CourseId": courseId}).One(&courseEnrollment)
	
	// update isEnrolled
	courseEnrollment.HasFeesPaid = true	
	err = c.Update(bson.M{"StudentId": studentId, "CourseId": courseId}, courseEnrollment)

	if err != nil {
		util.LogErrorWithoutFailing(err, "Mongo Update Error")
	}
	
	return nil


}

func StartKafkaConsumer() (error){
	log.Printf("Inside StartKafka Consumer")
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": "54.91.195.100:9092",
		"group.id":          "EnrollmentGroup",
		"auto.offset.reset": "earliest",
	})

	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{"PAYMENT_TOPIC"}, nil)

	for {
		log.Printf("Listening to queue...")
		msg, err := c.ReadMessage(-1)
		if err == nil {
			// fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
			log.Printf("Message from kafka ", string(msg.Value))
			
			//retrieve object from message
			bytes := []byte(string(msg.Value))
			var data model.CourseEnrollment
			json.Unmarshal(bytes, &data)			
			log.Printf("courseEnrollment from kafka ", data)
			updateFeePayment(data.StudentId, data.CourseId)

		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}

	c.Close()
	return nil
}