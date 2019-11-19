#!/bin/bash

apt-get update
apt-get install -y openjdk-8-jdk

mkdir /home/ubuntu/kafka

wget https://www-us.apache.org/dist/kafka/2.3.0/kafka_2.12-2.3.0.tgz

tar -xvzf kafka_2.12-2.3.0.tgz --directory=q/home/ubuntu/kafka --strip-components=1

rm -rf kafka_2.12-2.3.0.tgz

chown -R ubuntu:ubuntu /home/ubuntu/kafka

PUBLIC_ADDRESS=$(curl http://169.254.169.254/latest/meta-data/public-ipv4 --silent)

echo -e "\nadvertised.listeners=PLAINTEXT://$PUBLIC_ADDRESS:9092" >> /home/ubuntu/kafka/config/server.properties

touch /home/ubuntu/userdata.complete