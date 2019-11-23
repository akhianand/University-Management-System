# Team Hackathon Project: University Portal
**Frontend URL:** [https://cmpe-281-universityportal.herokuapp.com](https://cmpe-281-universityportal.herokuapp.com)
## Team Members

| Name | Microservice | 
| ------ | ----------- |
| Akhilesh Anand    | [Profile Service](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/backend/UserProfileMicroservice/README.md) |
| Akshay Elavia  | [Admin Service](https://github.com/nguyensjsu/fa19-281-helloworld/tree/master/backend/AnnouncementsMicroservice) |
| Arivoli AE    | [Enrollment Service](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/backend/EnrollmentsMicroservice/README.md) |
| Nirbhay Kekre    | [Course Service](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/backend/CoursesMicroservice/README.md) |
| Samarth Khatwani    | [Grading Service](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/backend/GradingMicroservice/README.md) |

## Summary
+ **University Portal** is a cloud based Software-as-a-Service application similar to MySJSU for managing academic activities of a University.
+ Students can sign up and perform the following actions:
  - Search for Courses
  - View Availability of Seats
  - Enroll into courses
  - Pay Fees for the term
  - View Grades
  - View Announcements
  - Dismiss Announcements
+ Instructors can sign up and perform the following actions:
  - Create a Course
  - Submit Grades for a particular course
  - Broadcast Announcements
  - View Analytic info such as:
    - Most Searched Courses
    - Best Performing Courses    
## High-level Architecture Diagram
![Alt text](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/mysjsu%20(1).png)

## Summary Key Features
* **Kubernetes cluster deployment:** Created Kubernetes deployment YAML for Admin, Course and Grading microservices which launches the respective microservice into a 3 node cluster in private subnet with its load balancer.

  [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-kuber-award.md)
* **Countinous deployment:** 
  * **Front-end deployment:** Created a deployment pipeline which automatically pulls frontend code on every code commit, builds and deploys on Heroku.
  * **Back-end deployment:** Created an automatic deployment pipeline using AWS Code Build which pulls backend code from github and builds the Docker image for each micro-service, pushes the image to Docker-Hub and deploys the respective micro-service into individual Kubernetes cluster.
  
  [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-DevOps-award.md)
* **Event Sourcing via Kafka:** Kafka was leveraged to communicate asynchronously over the queue between microservices. 
Pub-sub model is used to transmit data and notify other microservices for events.

  [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-Architect-award.md)
  
* **AKF cube dimensions:**
  * **X axis:** horizontal scalling with multi instance docker deployment via Kubernetes into multiple availaibility zone to ensure High Availability.
  * **Y axis:** Functional split into microservices such as Profile, Course, Enrollment, Grading and Admin
  * **Z axis:** Splitting data into shards with replicasets for each shard. Profile data is sharded based on UserID. Course data is sharded based on CourseID. Student Grading data is sharded based on Term. Multiple replicas also configured for Mongo Config Server.
  
## Summary Team Member Contribution
* **Akhilesh Anand:**
  * Responsible for User Profile micro-service back-end in golang and front-end in react.
  * Created MongoDB sharded cluster in private subnet.
  * Created Docker Instances and deployed in private subnet with load balancer for his micro-service
  * Exposed a public AWS api gateway to connect with internal load balancer.
  * Responsible for consuming announcements over Kafka
  * Configured Automatic Continuous Deployment of front-end code on Heroku.
* **Akshay Elavia:**
  * Responsible for Admin micro-service back-end in golang and front-end in react.
  * Responsible for publishing Announcements over Kafka
  * Responsible for consuming Grades and Course search metric over Kafka
  * Created 3 node Riak cluster in private subnet 
  * Created Kubernetes deployment YAML to spin up private Docker instances and Elastic Load Balancer 
  * Set up AWS Code Build  for automatic Deployment of Kubernetes clusters on AWS accounts of individual team members.
* **Arivoli AE:**
  * Responsible for Course Enrollment micro-service back-end in golang and front-end in React.
  * Created front-end Skeleton Components.
  * Responsible for publishing enrollment event over Kafka
  * Responsible for AddtoCart, Enrollment and Course Drop functionalities.
  * Responsible for consuming payment notification over Kafka.
* **Nirbhay Kekre:**
  * Responsible for Course micro-service back end in golang and front-end in React.
  * Implemented Course Search, Course Detail and Course Creation functionalities.
  * Consumed enrollment event from Kafka for seat availability
  * Published Courses Search Metrics over Kafka for Admin Analytics.
  * Created sharded mongodb cluster in private subnet.
  * Created Kubernetes deployment YAML to spin up private Docker instances and Elastic Load Balancer 
  * Created and Configured the Kong gateway for front-end to back-end integration.
* **Samarth Khatwani:**
  * Responsible for Grading micro-service back end in golang and front-end in React.
  * Implemented Submit Grade, View Grade and Submit Payment functionalities.
  * Published Fee Payment notification over Kafka for student enrollment.
  * Published Grades metric over Kafka for Admin Analytics.
  * Created sharded mongodb cluster in private subnet.
  * Created Kubernetes deployment YAML to spin up private Docker instances and Elastic Load Balancer
