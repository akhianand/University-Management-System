# DevOps Award

## Frontend Countinuous Deployment on Heroku

Heroku is a cloud platform as a service (PaaS).

In our scenario the steps we took to set up Continuous Deployment of Frontend over Heroku were as follows.

1. Create an Application on Heroku.
2. Link Application To Github Repository.
3. Enable Automatic Deployment option.
4. Add new Config Var --> PROJECT_PATH = frontend/student-portal 
5. Add new BuildPack https://github.com/timanovsky/subdir-heroku-buildpack.git and move it to the top of the list.


Step 4 & 5 are additional steps that have to be taken to allow Heroku to monitor only the frontend subdirectory of our application. Doing this ensures that only the frontend code is deployed on Heroku, And redeployments are triggered only where frontend changes are involved.

## Backend Continuous Deployment using AWS Code Build
### Summary
Created an automatic deployment pipeline using AWS Code Build which pulls backend code from github and builds the Docker image for each micro-service, pushes the image to Docker-Hub and deploys the respective micro-service into individual Kubernetes cluster.

