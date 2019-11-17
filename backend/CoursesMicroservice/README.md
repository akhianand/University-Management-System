# CoursesMicroservice
## Table of contents
<!--ts-->
* [Installation](#installation)
  * [Prerequisite](#prerequisite)
  * [How to run service on localhost](#how-to-run-service-on-localhost)
  * [How to run service on Docker](#how-to-run-service-on-docker)
* [Routes](#routes)
  * [GET Ping](#get-ping)
  * [POST Course](#post-course)
  * [GET Courses](#get-courses)
  * [GET Course](#get-course)
  * [PUT Course](#put-course)
  * [DELETE Course](#delete-course)
<!--te-->

## Installation

### Prerequisite
* install golang [https://golang.org/doc/install](https://golang.org/doc/install)
* install librdkafka [https://github.com/confluentinc/confluent-kafka-go#installing-librdkafka](https://github.com/confluentinc/confluent-kafka-go#installing-librdkafka)
* install and run kafka and zookeeper [https://kafka.apache.org/quickstart](https://kafka.apache.org/quickstart)
* install Docker Engine

### How to run service on localhost
* start kafka and zookeeper
* set go path to CoursesMicroservice directory
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
* build courses package
```shell
make build
```
* start courses microservice server
```shell
export MONGO_URL=<mongo connection url>
export DATABASE=<name of the database>
export COLLECTION=<name of the courses collection>
export KAFKA_SERVER=<localhost:9092>
export COURSE_CLICK_TOPIC=<topic name>
make start
```

### How to run service on Docker
* start kafka and zookeeper
* build docker image
  ```shell
  make docker-build
  ```
  
* Set environment variables in docker-compose.yml  
  ```yml
  environment:
    - MONGO_URL=<mongo connection url> 
    - DATABASE=<name of the database>  
    - COLLECTION=<name of the courses collection>  
    - KAFKA_SERVER=<ipAddressOfKafkaServer:9092>  
    - COURSE_CLICK_TOPIC=<topic name>  
  ```
  
* startup cluster
  ```shell
  make startup
  ```
* teardown the cluster
  ```shell
  make teardown
  ```
  
## Routes
### GET Ping
* **/ping** : GET route for health check

  **Response** 
  ```json 
  {
    "Message": "Courses API is alive!"
  }
  ```
### POST Course
* **/course** : POST route to create a course (course id will be auto increamented).

  **Request**
  ```json
  {
    "CourseName": "Cloud Computing",
    "Instructor": "Paul Nguyen",
    "ClassTime":[
      {
        "Day": "Saturday",
	"StartHour": 9,
	"StartMinutes": 30,
	"EndHour": 12,
	"EndMinutes": 30
      }
    ],
    "Capacity": 60,
    "Credit": 3,
    "Term": "Fall 2019",
    "DepartmentName": "CMPE",
    "Fees": 3000
  }
  ```
  **Response**
  ```json
  {
    "Success": true,
    "Message": "creating course asynchronusly"
  }
  ```
### GET Courses
* **/courses?DepartmentName=&Term=&CourseID=&Comparator=&CourseName=** : GET route to fetch all courses matching filter criteria
  
  **Query Parameters**
  ```
  DepartmentName:     exact match  
  Term:               exact match  
  CourseID:           matches based on the value of Comparator query param  
  Comparator:         comparator for course id, values supported: eq, gte, lte
  CourseName:         contains match
  ```
  **Response**
  ```json
  [
    {
        "CourseID": 100,
        "CourseName": "Cloud Computing",
        "Instructor": "Paul Ngyuen",
        "ClassTime": [
        {
            "Day": "Saturday",
            "StartHour": 9,
            "StartMinutes": 30,
            "EndHour": 12,
            "EndMinutes": 30
        }
        ],
        "Capacity": 60,
        "Credit": 3,
        "Term": "Fall 2019",
        "DepartmentName": "CMPE",
        "Fees": 3000
    }
  ]
  ```
  
### GET Course
* **/courses/{CourseID}** : GET route to retrieve single course detail specified by course id
    
    **Request** /courses/100
    
    **Response**
    ```json
    {
      "CourseID": 100,
      "CourseName": "Cloud Computing",
      "Instructor": "Paul Nguyen",
      "ClassTime": [
        {
      	  "Day": "Saturday",
          "StartHour": 9,
          "StartMinutes": 30,
          "EndHour": 12,
          "EndMinutes": 30
        }
      ],
      "Capacity": 60,
      "Credit": 3,
      "Term": "Fall 2019",
      "DepartmentName": "CMPE",
      "Fees": 3000
    }
    ```
  
### PUT Course
* **/courses/{CourseID}** : PUT route to update a course specified by course id
   
   **Request** /courses/100
   ```json
   {
     "CourseName": "Cloud Computing",
     "Instructor": "Paul Nguyen",
     "ClassTime":[
       {
         "Day": "Saturday",
         "StartHour": 9,
         "StartMinutes": 00,
         "EndHour": 12,
         "EndMinutes": 00
       }
     ],
     "Capacity": 60,
     "Credit": 3,
     "Term": "Fall 2019",
     "DepartmentName": "CMPE",
     "Fees": 3000
   }
   ```
   
   **Response**
   ```json
   {
     "CourseID":100,
     "CourseName": "Cloud Computing",
     "Instructor": "Paul Nguyen",
     "ClassTime":[
       {
         "Day": "Saturday",
         "StartHour": 9,
         "StartMinutes": 00,
         "EndHour": 12,
         "EndMinutes": 00
       }
     ],
     "Capacity": 60,
     "Credit": 3,
     "Term": "Fall 2019",
     "DepartmentName": "CMPE",
     "Fees": 3000
   }
   ```
   
### DELETE Course

* **/courses/{CourseID}** : DELETE route to delete a course specified by course id
  
  **Request** /courses/100
  
  **Response**
  ```json
  {
    "Success": true,
    "Message": "Course 100 is Successfully deleted"
  }
  ```
