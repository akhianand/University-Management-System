package courses

import (
	"encoding/json"
	"log"
	"strconv"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func saveCourseToKafka(course Course) {
	jsonString, err := json.Marshal(course)

	courseString := string(jsonString)
	log.Println("Logging Course Search to kafka CourseID:" + strconv.Itoa(course.CourseID))
	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": kafkaServer})
	if err != nil {
		logErrorWithoutFailing(err, "Kafka Click producer")
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
