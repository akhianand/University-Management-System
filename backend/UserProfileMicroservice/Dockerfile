FROM golang:latest 
EXPOSE 8000
RUN mkdir /app 
ADD . /app/ 
WORKDIR /app 
ENV GOPATH /app
RUN make clean
RUN make go-get
RUN make build
CMD make start >> userprofile.log

