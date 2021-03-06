# User Profile Microservice
## Table of contents

* [Installation](#installation)
  * [Prerequisite](#prerequisite)
  * [How to run service on Localhost](#how-to-run-service-on-localhost)
  * [How to run service on Docker](#how-to-run-service-on-docker)
  * [Setup Mongo Cluster](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/backend/UserProfileMicroservice/setup_notes.md)
* [Routes](#routes)
  * [GET Ping](#get-ping)
  * [POST Signup](#post-signup)
  * [PUT User](#put-user)
  * [GET User](#get-user)
  * [DELETE Announcement](#delete-announcement)


## Installation

### Prerequisite
* Install golang [https://golang.org/doc/install](https://golang.org/doc/install)
* Install Docker Engine

### How to run service on localhost

* set go path to UserProfileMicroservice directory
```shell
source set-gopath.sh
```
* Clean Workspace
```shell
make clean
```
* Get the Dependencies
```shell
make go-get
```
* Build Users Package
```shell
make build
```
* Start 
```shell
make start
```

### How to run service on Docker
* build docker image
```shell
docker build -t <userprofile>/userprofilems:<version> .
```
* run docker image 
```shell
docker run --restart always --name userprofilems -td -p 8000:8000 <userprofile>/userprofilems:<version>
```

**NOTE** Include the following Environment Variables as part of the run command
```shell
  - MONGO_URL=<mongo connection url> 
  - DATABASE=<name of the database>  
  - COLLECTION=<name of the courses collection>  
  - KAFKA_SERVER=<ipAddressOfKafkaServer:9092>  
  - COURSE_CLICK_TOPIC=<topic name>  
```

  
## Routes

The Following Routes describe the exposed API Edndpoints for performing User related Uperations
### GET Ping
 **/ping** : GET route for health check

  **Response** 
  ```json 
  {
   	"Message": "Users API is alive!"
  }
  ```
### POST Signup
 **/signup** : POST route to create a new user. A new UserID is assigned for each new Registration
 
  **Request**
  ```json
  {
	"firstname": "John",
	"lastname": "Doe",
	"role" : "student",
	"email" : "johndoe@gmail.com",
	"password" : "abc123"
  }
  ```
  **NOTE** : "role" can be either  *student* / *faculty*. 

  **Response**
  ```json
  {
	"Success": true,
	"Message": "Storing User to Database"
  }
  ```

### POST Login
 **/login** : POST route to login to profile.
 
  **Request**
  ```json
  {
	"email" : "johndoe@gmail.com",
	"password" : "abc123"
  }
  ```
  
  **Response**
  ```json
  {
	"UserID": 10000000,
	"Firstname": "John",
	"Lastname": "Doe",
	"Role": "student",
	"Email": "johndoe@gmail.com",
	"Password": "",
	"Image": "",
	"Address": {
		"AddressLine1": "",
		"AddressLine2": "",
		"City": "",
		"State": "",
		"Zip": ""
	},
	"Department": "",
	"Announcements": []
  }
  ```
  **NOTE** : The Password field has been intentionally blanked. Password is hashed before being stored into the database and is never part of the response. 


### PUT User
 **/profile?UserID=** : PUT route to update a user specified by user id
   
  **Query Parameters**
  ```
  UserID:   exact match  
  ```

   **Request** 
   ```json
   {
		"UserID": 10000000,
		"Firstname": "John",
		"Lastname": "Doe",
		"Role": "student",
		"Email": "johndoe@gmail.com",
		"Password": "",
		"Image": "",
		"Address": {
			"AddressLine1": "502 Divisadero",
			"AddressLine2": "Apt 101",
			"City": "San Francisco",
			"State": "CA",
			"Zip": "94101"
		},
		"Department": "CMPE",
		"Announcements": []
	}
   ```
   
   **Response**

   ```json
   {
		"UserID": 10000000,
		"Firstname": "John",
		"Lastname": "Doe",
		"Role": "student",
		"Email": "johndoe@gmail.com",
		"Password": "",
		"Image": "",
		"Address": {
			"AddressLine1": "502 Divisadero",
			"AddressLine2": "Apt 101",
			"City": "San Francisco",
			"State": "CA",
			"Zip": "94101"
		},
		"Department": "CMPE",
		"Announcements": []
	}
   ```


### GET User
 **/profile?UserID=** : GET route to fetch User matching unique UserID
  
  **Query Parameters**
  ```
  UserID:   exact match  
  ```
  **Response**
  ```json
	{
		"UserID": 10000000,
		"Firstname": "John",
		"Lastname": "Doe",
		"Role": "student",
		"Email": "johndoe@gmail.com",
		"Password": "",
		"Image": "",
		"Address": {
			"AddressLine1": "502 Divisadero",
			"AddressLine2": "Apt 101",
			"City": "San Francisco",
			"State": "CA",
			"Zip": "94101"
		},
		"Department": "CMPE",
		"Announcements": [
			{
				"announcement" : "Tenth Announcement"
			},
			{
				"announcement" : "Eleventh Announcement"
			}
		]
	}
  ```
   


### DELETE Announcement

 **/announcement?UserID=** : DELETE route to delete an Announcement. 

 **Note** : Announcements are added to User object in the backend through means of Kafka.

 **Query Parameters**
  ```
  UserID:   exact match  
  ```

  **Request** 
   ```json
  {
	  "announcement": "Tenth Announcement"
  }
  ```
  
  **Response**
  ```json
{
  "Success": true,
  "Message": "Announcement Sucessfully Removed"
}
  ```
