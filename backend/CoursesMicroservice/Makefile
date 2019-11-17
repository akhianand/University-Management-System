all: clean

clean: 
	find . -name 'coursesMS' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
	go get -v github.com/confluentinc/confluent-kafka-go/kafka
build:
	go build coursesMS

start:
	./coursesMS

test-ping:
	curl localhost:8080/ping

network-create:
	docker network create coursesmicroservice_network

docker-build:
	docker build -t course_ms .

startup: network-create
	docker-compose scale node=5

teardown:
	docker-compose down