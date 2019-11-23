FROM golang:1.13.4

RUN apt-get -y update && apt-get -y install software-properties-common

RUN git clone https://github.com/edenhill/librdkafka.git && cd librdkafka && ./configure --prefix /usr && make && make install

WORKDIR /
COPY main.go main.go
RUN go get -d github.com/gorilla/mux && go get -u gopkg.in/confluentinc/confluent-kafka-go.v1/kafka && go get github.com/gorilla/handlers

CMD ["go","run","main.go"]