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
			{ _id : 0, host : "10.0.0.40:27019"},
			{ _id : 1, host : "10.0.0.253:27019"}
		]
	}
)