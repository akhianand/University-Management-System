Jumpbox

ssh -i "cmpe281-us-east-1.pem" ec2-user@ec2-3-94-204-145.compute-1.amazonaws.com

Config Server 1

ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.1.225

Config Server 2 

ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.2.166


## Create Package management System

/etc/yum.repos.d/mongodb-org-3.4.repo


Add To That 


[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc


rs.initiate(
	{
		_id: "crs",
		configsvr: true,
		members: [
			{ _id : 0, host : "10.0.1.225:27019"},
			{ _id : 1, host : "10.0.2.166:27019"}
		]
	}
)


sudo mkdir -p /data/db

sudo chown -R mongod:mongod /data/db

sudo vi /etc/mongod.conf

sudo mongod --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log
sudo mongos --config /etc/mongod.conf --logpath /var/log/mongodb/mongod.log

rs.initiate(
	{
		_id: "rs0",
		members: [
			{ _id : 0, host : "10.0.1.34:27018"},
			{ _id : 1, host : "10.0.2.112:27018"}
		]
	}
)


rs.initiate(
	{
		_id: "rs1",
		members: [
			{ _id : 0, host : "10.0.1.97:27018"},
			{ _id : 1, host : "10.0.2.55:27018"}
		]
	}
)



ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.1.34

ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.2.112

ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.1.97

ssh -i "cmpe281-us-east-1.pem" ec2-user@10.0.2.55





ssh -i "cmpe281-us-east-1.pem" ec2-user@ec2-3-232-230-241.compute-1.amazonaws.com



sh.addShard("rs0/10.0.1.34:27018,10.0.2.112:27018");

sh.addShard("rs1/10.0.1.97:27018,10.0.2.55:27018");

db.adminCommand({listShards:1})

db.runCommand({enablesharding: "universityportal"});


db.runCommand({shardcollection: "universityportal.users", key  : {userid :1}});


db.createUser(
{	user: "admin",
	pwd: "password",
	roles:[{role: "userAdminAnyDatabase" , db:"admin"}]}
)


ssh -i "cmpe281-us-east-1.pem" ec2-user@ec2-3-232-230-241.compute-1.amazonaws.com


mongodb://admin:password@ec2-3-232-230-241.compute-1.amazonaws.com:27017/universityportal