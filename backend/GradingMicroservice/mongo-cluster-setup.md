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

### Configure Config servers

``` c
//Create a data directory where config servers will store metadata that associates the location and content
sudo mkdir -p /data/db
sudo chown -R mongod:mongod /data/db

//Start config server using command line params(optional)
sudo mongod --configsvr --replSet csr --dbpath /data/db --port 27019 --logpath /var/log/mongodb/mongod.log --fork
// path to config file
sudo vi /etc/mongod.conf
//Do following changes to mongod.conf file
dbPath: /data/db
sharding:
  clusterRole: configsvr
replication:
  replSetName: crs
// Start mongod using the config file (preferred way)
sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
//Repeat above steps for second config server
//Start mongo shell on config server
mongo -port 27019
rs.initiate(
  {
    _id: "crs",
    configsvr: true,
    members: [
      { _id : 0, host : "10.0.1.108:27019" },
      { _id : 1, host : "10.0.1.165:27019" }
    ]
  }
)
```

### Configure Sharding servers
``` c
//Create a data directory where config servers will store metadata that associates the location and content
sudo mkdir -p /data/db
sudo chown -R mongod:mongod /data/db
sudo vi /etc/mongod.conf
dbPath: /data/db
net:
  port: 27018
  #bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.
sharding:
  clusterRole: shardsvr
replication:
  replSetName: rs0
// Start mongod using the config file (preferred way)
sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
//initiate replica set
rs.initiate(
  {
    _id : "rs0",
    members: [
      { _id : 0, host : "10.0.1.177:27018" },
      { _id : 1, host : "10.0.1.146:27018" }
    ]
  }
)

rs.initiate(
  {
    _id : "rs1",
    members: [
      { _id : 0, host : "10.0.1.29:27018" },
      { _id : 1, host : "10.0.1.159:27018" }
    ]
  }
)

```
### Configure Mongos Server
``` js
sudo yum install -y mongodb-org-mongos
//Configuration file
sudo vi /etc/mongod.conf
comment out dbpath
sharding:
  configDB:crs/10.0.1.109:27019,10.0.1.165:27019
//start mongos 
sudo mongos --config /etc/mongod.conf --fork --logpath /var/log/mongodb/mongod.log

//add shards
sh.addShard("rs0/10.0.1.177:27018,10.0.1.146:27018");
sh.addShard("rs1/10.0.1.29:27018,10.0.1.159:27018");

// create sharding strategy
db.runCommand({enableSharding:"testdb"})
db.runCommand({shardCollection:"testdb.grade",key:{courseid:1}});

db.grade.insertOne(
    {
    studentid : 407,
    studentname : "Atharva",
    courseid : 272,
    coursename : "Enterprise Software Overview",
    term : "Spring 2020",
    grade : "A-"
    }
)
db.grade.insertOne(
    {
    studentid : 406,
    studentname : "Saumya",
    courseid : 256,
    coursename : "Large Scale Analytics",
    term : "Spring 2020",
    grade : "A-"
    }
)
```