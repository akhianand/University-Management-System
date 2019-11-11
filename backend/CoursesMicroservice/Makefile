all: clean

clean: 
	find . -name 'coursesMS' -type f -exec rm -f {} \; 
	go clean 
	
go-get:
	rm -rf src/github.com
	go get -v github.com/unrolled/render
	go get -v github.com/gorilla/mux

build:
	go build coursesMS

start:
	./coursesMS

test-ping:
	curl localhost:8080/ping