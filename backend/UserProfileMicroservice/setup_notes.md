
# Setting up Mongo Cluster 

## VPC 

Create VPC *CMPE281* with 3 Subnets 
 1. AZ1 : Public
 2. AZ1 : Private
 3. AZ2 : Private


## Installation 

### Jumpbox
Spawn EC2 AWS Linux Instance for JumpBox

	
	VPC : CMPE281
	SUBNET: AZ1 Public
	Security Group : 22
	

### Mongo AMI 

Spawn EC2 AWS Linux Instance for Mongo AMI

	
	VPC : CMPE281
	SUBNET: AZ1 Private
	Security Group : 22 , 27017-27019
	
	
Here Install **Mongo 3.4**

	
	sudo mkdir /etc/yum.repos.d/mongodb-org-3.4.repo 
	


Add the following to the above file 
	
	[mongodb-org-3.4]
	name=MongoDB Repository
	baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
	gpgcheck=1
	enabled=1
	gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc

	

Then

	
	sudo yum install -y mongodb-org
	sudo chkconfig mongod on
	sudo mkdir -p /data/db
	sudo chown -R mongod:mongod /data/db

	

### Spawn Cluster  

With Mongo Installed in this manner, Create an AMI and spawn 6 other Instances In addition to the one just created as follows.

1. 3 Instances in AZ1 Private (config-server-1, shard-server-1.1, shard-server-2.1)
2. 3 Instances in AZ2 Private (config-server-2, shard-server-1.2, shard-server-2.2)
3. 1 Instances in AZ1 Public (mongos)



### Config Server

SSH into two Config Server Instances via JumpBox
```
sudo vi /etc/mongod.conf
```

Change the following 

```
storage
  dbpath: /data/db

net:
 port: 27019
 #bindIp: .....

replication:
  replSetName: crs

sharding:
  clusterRole: configvr
```

Start

```
sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
```
Run

```
mongo -port 27019
```

Configue Replica Set for Shard Server

```
rs.initiate(
	{
		_id: "rs0", (rs1 for 2nd shard replicas)
		members: [
			{ _id : 0, host : "<IP>:27018"},
			{ _id : 1, host : "<IP>:27018"}
		]
	}
)
```




### Monogos

SSH into Mongos Directly
```
sudo vi /etc/mongod.conf
```

Change the following 

```
* Comment out Storage

net:
  port: 27017
  #bindIp: .....

sharding:
  configDB: crs/<IP>:27109,<IP>:27019 (Config Server IPs)
```

Start

```
sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
```
Run
```
mongo -port 27017
```

Adding Shards

```
sh.addShard("rs0/<IP>:27018,<IP>:27018"); //rs0 IPs

sh.addShard("rs1/<IP>:27018,<IP>:27018"); //rs1 IPs

```

Create DB
```
use univeristyportal
```

Switch to Admin and Run the following
```
use admin

db.runCommand({enablesharding: "universityportal"});  //Enables Sharding

db.runCommand({shardcollection: "universityportal.users", key  : {userid :1}}); //Sharding on Users Collection based on UserID as Shard Key

```
