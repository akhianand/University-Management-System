# User Profile Microservice


## How to Run

Set go path to UserProfileMicroservice directory

```shell
source set-gopath.sh
```
Clean workspace
```shell
make clean
```
Get the dependencies
```shell
make go-get
```
build courses package
```shell
make build
```

start courses microservice server
```shell
make start
```


## API
### GET Ping
 **/ping** : GET route for health check

  **Response** 
  ```json 
	{
		"Message": "Courses API is alive!"
	}
  ```
### POST Signup
 **/signup** : POST route to create a user (user id will be auto increamented).

  **Request Body**
  ```json
	{
		"firstname": "Akhilesh",
		"lastname": "Anand",
		"role" : "student",
		"email" : "akhilesh.anand@sjsu.com",
		"password" : "abc123"
	}
  ```
  **Response**
  ```json
	{
		"Success": true,
		"Message": "Storing User to Database"
	}
  ```

### POST Login
 **/login** : POST route to login a user.

  **Request Body**
  ```json
	{
		"email" : "akhilesh.anand@sjsu.edu",
		"password" : "abc123"
	}
  ```
  **Response**
  ```json
	{
		"UserID": 10000001,
		"Firstname": "Akhilesh",
		"Lastname": "Anand",
		"Role": "student",
		"Email": "akhileshmalini@gmail.com",
		"Password": "$2a$04$CaWSAdaTvZTWpKf7Z7KKs.g4MjvQh5W1jOzSGgGdK/VfKy1rC9f4m",
		"Image": ""
	}
  ```

### GET User
 **/profile?UserID=** : GET route to fetch user by ID
  
  **Query Parameters**
  ```
	UserID:     int 
  ```
  **Response**
  ```json
	{
		"UserID": 10000001,
		"Firstname": "Akhilesh",
		"Lastname": "Anand",
		"Role": "student",
		"Email": "akhileshmalini@gmail.com",
		"Password": "$2a$04$CaWSAdaTvZTWpKf7Z7KKs.g4MjvQh5W1jOzSGgGdK/VfKy1rC9f4m",
		"Image": ""
	}
  ```
  
