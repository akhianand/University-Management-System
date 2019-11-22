package users

import (
	"encoding/json"
	"fmt"
	"log"
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

// ConsumeAnnouncementFromKafka consumes kafka message from Announcement topic and increments seats enrolled
func ConsumeAnnouncementFromKafka() {
	log.Printf("Inside StartKafka Consumer")
	c, err := kafka.NewConsumer(&kafka.ConfigMap{
		"bootstrap.servers": kafkaServer,
		"group.id":          "userprofilems_group",
		"auto.offset.reset": "earliest",
	})
	defer c.Close()
	if err != nil {
		logErrorWithoutFailing(err, "Kafka Announcement Consumer")
	}
	fmt.Printf("Subscribing to %s topic", kafkaAnnouncementTopic)
	c.SubscribeTopics([]string{kafkaAnnouncementTopic}, nil)

	for {
		log.Printf("Listening to queue...")
		msg, err := c.ReadMessage(-1)
		if err == nil {
			// fmt.Printf("Message on %s: %s\n", msg.TopicPartition, string(msg.Value))
			log.Printf("Message from kafka %s", string(msg.Value))

			//retrieve object from message
			bytes := []byte(string(msg.Value))
			var announcement Announcement
			json.Unmarshal(bytes, &announcement)
			// Add Announcement to UserProfile 
			addAnnouncementToUserProfile(announcement)
		} else {
			// The client will automatically try to recover from all errors.
			fmt.Printf("Consumer error: %v (%v)\n", err, msg)
		}
	}
}


func addAnnouncementToUserProfile(announcement Announcement) error {
	fmt.Printf(announcement.Announcement)
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		logErrorWithoutFailing(err, "Mongo Dial Error")
		return err
	}
	defer session.Close()
	c := session.DB(database).C(collection)
	if  _, err := c.UpdateAll(nil, bson.M{"$push":bson.M{"announcements":announcement}}); 
	err != nil {
		logErrorWithoutFailing(err, "Mongo Update Error")
		return err
	
	}	
	return nil
}
