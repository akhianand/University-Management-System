package courses

import (
	"encoding/json"
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func saveCourseToKafka(course Course) {

	fmt.Println("save to kafka")

	jsonString, err := json.Marshal(course)

	courseString := string(jsonString)
	fmt.Print(courseString)

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": kafkaServer})
	if err != nil {
		panic(err)
	}

	// Produce messages to topic (asynchronously)
	topic := kafkaClickTopic
	for _, word := range []string{string(courseString)} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}
}
