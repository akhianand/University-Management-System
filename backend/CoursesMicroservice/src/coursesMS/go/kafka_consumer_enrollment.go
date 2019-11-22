package courses

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

// ConsumeEnrollmentFromKafka consumes kafka message from enrollment topic and increments seats enrolled
func ConsumeEnrollmentFromKafka() {
	log.Printf("Inside StartKafka Consumer")
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": kafkaServer,
		"group.id":          "courses_ms_group",
		"auto.offset.reset": "earliest",
	})
	defer c.Close()
	if err != nil {
		logErrorWithoutFailing(err, "Kafka Enrollment Consumer")
	}
	fmt.Printf("Subscribing to %s topic", kafkaEnrollmentTopic)
	c.SubscribeTopics([]string{kafkaEnrollmentTopic}, nil)

	for {
		log.Printf("Listening to queue...")
		msg, err := c.ReadMessage(-1)
		if err == nil {
			// fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
			log.Printf("Message from kafka %s", string(msg.Value))

			//retrieve object from message
			bytes := []byte(string(msg.Value))
			var courseEnrollment CourseEnrollment
			json.Unmarshal(bytes, &courseEnrollment)
			// Increment Student Enrollment of course
			incrementStudentEnrollment(courseEnrollment)
		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}

func incrementStudentEnrollment(courseEnrollment CourseEnrollment) {
	course, err := retrieveCourseMongo(courseEnrollment.CourseID)
	if err == nil {
		if (*course).SeatsEnrolled < course.Capacity {
			fmt.Printf("incrementing enrollment in Course: %d", courseEnrollment.CourseID)
			(*course).SeatsEnrolled = ((*course).SeatsEnrolled + 1)
			updateCourse(courseEnrollment.CourseID, *course)
		}
	}
}
