Command to launch Kubernetes cluster:

kops create cluster \
--name=$CLUSTER_NAME.k8s.local \
--state=$KOPS_STATE_STORE \
--api-loadbalancer-type=public \
--associate-public-ip=false \
--cloud=aws \
--master-count=1 \
--master-size=t2.medium \
--master-zones=us-east-1a \
--networking=calico \
--node-count=3 \
--node-size=t2.micro \
--topology=private \
--zones=us-east-1a,us-east-1b,us-east-1c

Initialize Riak counter:

curl -XPUT http://172.20.39.6:8098/buckets/click-counters/props \
  -H "Content-Type: application/json" \
  -d "{\"props\" : {\"allow_mult\": true}}"

curl -XPOST http://172.20.39.6:8098/buckets/click-counters/counters/count -d "1"

curl http://172.20.39.6:8098/buckets/click-counters/counters/count



curl -XPUT -d '{"CourseID":"281", "CourseName": "Cloud Tech"}' -H "Content-Type: application/json" http://172.20.39.6:8098/buckets/click-counters/keys/281?returnbody=true


Starting Kafka Server:

./bin/zookeeper-server-start.sh config/zookeeper.properties &
./bin/kafka-server-start.sh config/server.properties &