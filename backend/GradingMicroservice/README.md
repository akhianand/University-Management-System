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
* build courses package
```shell
make build
```

* start courses microservice server
```shell
make start
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
### POST Course
* **/grades** : POST route to submit a grade

  **Request**
  ```json
  {
	"StudentID":3,
	"CourseID":3,
	"Term":"Fall 2019",
	"Grade":"A",
	"InstructorID":2

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
    "StudentID": 1,
    "CourseID": 1,
    "Term": "Fall 2019",
    "Grade": "A",
    "InstructorID": "Guzun"
  },
  {
    "StudentID": 1,
    "CourseID": 2,
    "Term": "Fall 2019",
    "Grade": "B-",
    "InstructorID": "Paul"
  }
]
  ```