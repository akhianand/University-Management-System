all: clean

clean: 
	find . -name 'GradingMS' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
	go get -v github.com/confluentinc/confluent-kafka-go/kafka
	go get -v github.com/gorilla/handlers
build:
	go build GradingMS

start:
	./GradingMS

test-ping:
	curl localhost:8080/ping

network-create:
	docker network create gradingmicroservice_network

docker-build:
	docker build -t grading_ms .

startup: network-create
	docker-compose scale node=1

teardown:
	docker-compose down	