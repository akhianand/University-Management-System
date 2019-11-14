# User Profile Microservice


## How to Run

* Set go path to UserProfileMicroservice directory

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
* build courses package
```shell
make build
```

* start courses microservice server
```shell
make start
```


## Routes Available 

```
/signup
/login
/ping 
```
