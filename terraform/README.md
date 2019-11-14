Command to launch Kubernetes cluster:

kops create cluster \
--name=$CLUSTER_NAME.k8s.local \
--state=$KOPS_STATE_STORE \
--api-loadbalancer-type=public \
--associate-public-ip=false \
--cloud=aws \
--master-count=1 \
--master-size=t2.micro \
--master-zones=us-east-1a \
--networking=amazon-vpc-routed-eni \
--node-count=3 \
--node-size=t2.micro \
--target=terraform \
--topology=private \
--zones=us-east-1a,us-east-1b,us-east-1c
