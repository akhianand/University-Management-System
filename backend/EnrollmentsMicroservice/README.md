## How To Run
* set go path to Enrollment Microservice directory
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
* build enrollment package
```shell
make build
```

* start enrollment microservice server
```shell
make start
```

## Routes
### GET Health Check
* **/ping** : GET route for health check

  **Response** 
  ```json 
  {
    "Message": "Enrollment API is up and running !!"
  }
  ```

### POST Add Course to Cart
* **/addToCart** : POST route to add course to cart

  **Request**
  ```json
  {
 "CourseName": "Data Mining",
 "CourseId": 275,
 "StudentId" : 470,
 "StudentName" : "Arivoli AE",
 "Term": "Fall 2019",
 "DepartmentName": "CMPE",
 "Fees": 3000
}
```
  **Response**
  ```json
  {
  "Success": true,
  "Message": "Course Added to Cart Successfully"
  }
  ```

### GET Courses in cart
* **/cart?StudentID=** : GET route to get courses in cart
eg. http://localhost:8080/cart?StudentID=430
  
  **Query Parameters**
  ```
  StudentID
  
  ```
  **Response**
  ```json
  [
  {
    "CourseId": 281,
    "CourseName": "Cloud Computing",
    "DepartmentName": "CMPE",
    "StudentId": 1001,
    "StudentName": "Arivoli AE",
    "Term": "Fall 2019",
    "Fees": 3000,
    "IsEnrolled": false,
    "HasFeesPaid": false
  },
  {
    "CourseId": 275,
    "CourseName": "Enterprise Systems",
    "DepartmentName": "CMPE",
    "StudentId": 1001,
    "StudentName": "Arivoli AE",
    "Term": "Fall 2019",
    "Fees": 3000,
    "IsEnrolled": false,
    "HasFeesPaid": true
  }]
  ```json