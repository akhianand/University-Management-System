package service

import (
	"FeePaymentMS/go/model"
	"FeePaymentMS/go/util"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mgo.v2"
)

//MakePayment creates the Fee Payment transaction record in DB and publishes the object to queue
func MakePayment(payment *model.Payment) (int, error) {
	log.Printf("Make payment service method")
	fmt.Println("Make payment service method dialling up mongo db connection")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	payment.TransactionID, _ = util.NextSequence("payment")
	if err != nil {
		fmt.Println("Mongo Dial Error")
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("payment")
	if err := c.Insert(payment); err != nil {
		fmt.Println("Mongo Insert Error")
		util.LogErrorWithoutFailing(err, "Mongo Insert Error")
	}
	publishToQueue(payment)
	return payment.TransactionID, nil
}

func publishToQueue(payment *model.Payment) {
	log.Printf("publish to queue service method")
	fmt.Println("publishing to queue service method")
	jsonString, err := json.Marshal(payment)
	paymentString := string(jsonString)
	fmt.Println("Logging payment to kafka StudentID:" + strconv.Itoa(payment.StudentID))
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVER")})
	if err != nil {
		fmt.Println("Kafka fee submission message")
		util.LogErrorWithoutFailing(err, "Kafka fee submission message")
	}

	// Produce messages to topic (asynchronously)
	topic := os.Getenv("FEE_PAID_TOPIC")
	for _, word := range []string{string(paymentString)} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}
}
