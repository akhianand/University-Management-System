FROM golang:1.13.4

WORKDIR /
COPY main.go main.go
RUN go get -d github.com/gorilla/mux

CMD ["go","run","main.go"]