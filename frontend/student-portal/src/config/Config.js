const baseURL = "https://k312y55892.execute-api.us-east-1.amazonaws.com/prod"

export function getURL (route) {
    if(route.startsWith("/")){
        return baseURL + route;
    }
    return baseURL + "/" +route;
}

export const gradingServiceURL = "http://localhost:8082";
export const enrollmentServiceURL = "http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com";
