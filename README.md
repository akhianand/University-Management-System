# Team Hackathon Project: University Portal

## Team Members
Akhilesh Anand  
Akshay Elavia  
Arivoli AE  
Nirbhay Kekre  
Samarth Khatwani

## Summary

## High-level Architecture Diagram
![Alt text](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/mysjsu%20(1).png)

## Summary Key Features
* **Kubernetes deployment:** [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-kuber-award.md)
* **Countinous deployment:** [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-DevOps-award.md)
* **Event Sourcing via Kafka:** Kafka was leveraged to communicate asynchronously over the queue between microservices [more details](https://github.com/nguyensjsu/fa19-281-helloworld/blob/master/extra-credit-kuber-award.md)
* AFK cube dimensions:
  * **X axis:** horizontal scalling with multi docker instance deployment of backend.
  * **Y axis:** Functional split into microservices.
  * **Z axis:** Splitting data into shards with replicasets.
