all: clean

clean: 
	find . -name 'EnrollmentMS' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
	go get -v github.com/confluentinc/confluent-kafka-go/kafka
	go get -v github.com/rs/cors
	go get -v github.com/gorilla/handlers
build:
	go build EnrollmentMS

start:
	./EnrollmentMS

test-ping:
	curl localhost:8080/ping