# Kuber Award

## Summary
Kubernetes cluster deployment:
A Kubernetes cluster with 3 worker nodes and 1 master node was launched in AWS using kops
The kops command to create the cluster:

### Steps to create the cluster

1. Install AWS CLI

      https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

2. Configure AWS CLI

      Create an IAM user with admin privileges and save the credentials for that user in the ~/.aws/credentials file
      https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
      
3. Install kops

      https://github.com/kubernetes/kops#installing
      
4. Install kubectl

      https://kubernetes.io/docs/tasks/tools/install-kubectl/
      
5. Generate ssh keys

      Generate a private and public SSH keypair with the following command, accept all the defaults:
      
      `ssh-keygen`
      
6. Create S3 bucket

      Create a bucket in S3. kops will use this bucket to store the kubernetes cluster state
      
7. Launch the cluster
      With all the prerequisites met, launch the Kubernetes cluster with the following command, replacing the variables with a cluster name       and s3 bucket name respectively:
      
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


### Steps to deploy application to the Kubernetes cluster

1. Create a YAML manifest file for your application

```
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: announcements-deployment
  labels:
    app: announcements
spec:
  replicas: 3
  selector:
    matchLabels:
      app: announcements
  template:
    metadata:
      labels:
        app: announcements
    spec:
      containers:
      - name: announcements-api
        image: itselavia/announcements:VERSION
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
```

2. Add a Kubernetes Service in the manifest file to expose your application

```
---

apiVersion: v1
kind: Service
metadata:
  name: announcements-service
spec:
  selector:
    app: announcements
  ports:
    - port: 80
      targetPort: 8080
  type: LoadBalancer
```

2. Use kubectl to deploy the manifest file

      ```kubectl apply -f Manifest.yaml```
      Check the deployed pods:
      ```kubectl get pods```
      Check the endpoint for the service:
      ```kubectl get services```
