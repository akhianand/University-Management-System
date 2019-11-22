FROM golang:latest 
EXPOSE 8000
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
ENV GOPATH /app
RUN mkdir dependency; cd dependency; git clone https://github.com/edenhill/librdkafka.git ; cd librdkafka; ./configure --prefix /usr; make;  make install; go get -u gopkg.in/confluentinc/confluent-kafka-go.v1/kafka
RUN make clean
RUN make go-get
RUN make build
CMD make start >> userprofile.log

