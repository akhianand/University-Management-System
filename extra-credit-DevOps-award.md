# DevOps Award

## Frontend Countinuous Deployment on Heroku

Heroku is a cloud platform as a service (PaaS). This means that very minimal effort is expected from the Developer in terms of the effort requied to deploy the application. 


In our scenario the steps we took to set up Continuous Deployment of Frontend over Heroku were as follows.

1. Create NodeJS Application on Heroku.
2. Link Application To Github Repository.
3. Enable Automatic Deployment option.
4. Add new Config Var --> PROJECT_PATH = frontend/student-portal 
5. Add new BuildPack https://github.com/timanovsky/subdir-heroku-buildpack.git and move it to the top of the list.


Step 4 & 5 are additional steps that have to be taken to allow Heroku to monitor only the frontend subdirectory of our application. Doing this ensures that only the frontend code is deployed on Heroku, And redeployments are triggered only where frontend changes are involved.


