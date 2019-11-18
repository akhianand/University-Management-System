all: clean

clean: 
	find . -name 'FeePaymentMS' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux
	go get -v gopkg.in/mgo.v2
	go get -v gopkg.in/mgo.v2/bson
build:
	go build FeePaymentMS

start:
	./FeePaymentMS

test-ping:
	curl localhost:8080/ping