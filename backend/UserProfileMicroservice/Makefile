all: clean

clean: 
	find . -name 'Users' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
	go get -v golang.org/x/crypto/bcrypt
	go get -v github.com/gorilla/handlers
	go get -v github.com/confluentinc/confluent-kafka-go/kafka
build:
	go build Users

start:
	./Users

test-ping:
	curl localhost:8000/ping

network-create:
	docker network create userprofilemicroservice_network

docker-build:
	docker build -t userprofilems .

startup: network-create
	docker-compose scale node=5

teardown:
	docker-compose down
