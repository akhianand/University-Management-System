## Installation

### Prerequisite
* install golang [https://golang.org/doc/install](https://golang.org/doc/install)
* install librdkafka [https://github.com/confluentinc/confluent-kafka-go#installing-librdkafka](https://github.com/confluentinc/confluent-kafka-go#installing-librdkafka)
* install and run kafka and zookeeper [https://kafka.apache.org/quickstart](https://kafka.apache.org/quickstart)
* install Docker Engine

## How To Run
* set go path to GradingMicroservice directory
```shell
source set-gopath.sh
```
* Clean workspace
```shell
make clean
```
* Get the dependencies
```shell
make go-get
```
* build grade package
```shell
make build
```

* start grading microservice server
```shell
export MONGO_URL=<mongo connection url>
export DATABASE=<name of the database>
export COLLECTION=<name of the grades collection>
export KAFKA_SERVER=<localhost:9092>
export GRADES_TOPIC=<topic name>
export PAYMENTS_TOPIC=<topic name>
make start
```
### How to run service via kubernetes
* start kafka and zookeeper
* set environment variables in GradingManifest.yaml
  ```yaml
  env:
  - name: MONGO_URL
    value: "update mongo url"
  - name: DATABASE
    value: "database name"
  - name: COLLECTION
    value: "collection name"
  - name: KAFKA_SERVER
    value: "kafka server url"
  - name: GRADES_TOPIC
    value: "kafka topic to publish grades"
  - name: PAYMENTS_TOPIC
    value: "kafka topic to publish fee payment"
  ```
* start service via kubernetes
  ```yaml
  kubectl apply -f GradingManifest.yaml   
  ```
## Routes
### GET Health Check
* **/ping** : GET route for health check

  **Response** 
  ```json 
  {
    "Message": "Grading API is alive!"
  }
  ```
### POST Grade
* **/grade** : POST route to submit a grade

  **Request**
  ```json
  {
	"StudentID":1005,
	"StudentName":"Hari AE",
	"CourseID":100,
	"CourseName":"Cloud Computing",
	"Term":"Fall 2019",
	"Grade":"A"
  }
  ```
  **Response**
  ```json
  {
  "Success": true,
  "Message": "Grade Submitted Successfully"
  }
  ```
### GET Grades
* **/grades?StudentID=&CourseID=&Term=** : GET route to fetch all grades corresponding to request params
eg. http://localhost:8080/grades?StudentID=430
  
  **Query Parameters**
  ```
  StudentID:          (optional)exact match  
  Term:               (optional)exact match  
  CourseID:           (optional)exact match
  ```
  **Response**
  ```json
  [
    {
      "StudentID": 430,
      "StudentName": "Yash",
      "CourseID": 217,
      "CourseName": "HCI",
      "Term": "Spring 2020",
      "Grade": "A"
    }
  ]
  ```
### POST Payment
* **/pay** : POST route to submit a fees payment
```json
  {
   	"StudentId":470,
   	"StudentName":"Aditya Bhole",
	"CourseID":275,
	"Term":"Spring 2020",
	"Fee":9000
  }
```  
**Response**
  ```json
  {
  "Success": true,
  "Message": "Fee Payment Transaction Recorded Successfully",
  "TransactionID": 102
  }
  ```
