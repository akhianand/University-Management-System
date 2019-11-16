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
