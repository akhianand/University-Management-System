## Mongo Cluster Setup

### Create EC2 instance

```
VPC - CMPE281
Subnet - private
Security Group- mongodb-cluster
```
### Install mongodb on above instance

```
SSH into instance using Jumpbox
provide sudo yum install command to install mongodb-community edition 3.4
Save ec2 instance as an image 
create 6 more instances with the image
provide security group default-vpc and mongodb-cluster
server names - 
mongos
config-1
config-2
shard-1.1
shard-1.2
shard-2.1
shard-2.2

```

### Configure config servers

``` c
//Create a data directory where config servers will store metadata that associates the location and content
sudo mkdir -p /data/db
sudo chown -R mongod:mongod /data/db

//Start config server
sudo mongod --configsvr --replSet csr --dbpath /data/db --port 27019 --logpath /var/log/mongodb/mongod.log --fork
// path to config file
sudo vi /etc/mongod.conf
//Do following changes to mongod.conf file
dbPath: /data/db
sharding:
  clusterRole: configsvr
replication:
  replSetName: crs
// Start mongod using the config file
sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
//Repeat above steps for second config server
```

**Restart part 3 at 7:20**