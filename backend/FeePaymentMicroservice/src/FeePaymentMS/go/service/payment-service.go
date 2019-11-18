package service

import (
	"FeePaymentMS/go/model"
	"FeePaymentMS/go/util"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"gopkg.in/mgo.v2"
)

//MakePayment creates the Fee Payment transaction record in DB and publishes the object to queue
func MakePayment(payment *model.Payment) (int, error) {
	log.Printf("Make payment service method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	payment.TransactionID, _ = util.NextSequence("payment")
	if err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("payment")
	if err := c.Insert(payment); err != nil {
		//this will crash the server
		util.LogErrorWithoutFailing(err, "Mongo Insert Error")
	}
	publishToQueue(payment)
	return payment.TransactionID, nil
}

func publishToQueue(payment *model.Payment) {
	log.Printf("publish to queue service method")
	jsonString, err := json.Marshal(payment)
	paymentString := string(jsonString)
	fmt.Print(paymentString)
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVER")})
	if err != nil {
		panic(err)
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
