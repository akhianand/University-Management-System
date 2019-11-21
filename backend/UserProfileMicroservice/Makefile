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
build:
	go build Users

start:
	./Users

test-ping:
	curl localhost:8000/ping