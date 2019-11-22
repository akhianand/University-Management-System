const baseURL = "https://k312y55892.execute-api.us-east-1.amazonaws.com/prod"

export function getURL (route) {
    if(route.startsWith("/")){
        return baseURL + route;
    }
    return baseURL + "/" +route;
}

export const gradingServiceURL = "http://localhost:8082";
export const enrollmentServiceURL = "http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com";


/**
 * 
 * /addToCart
 * /cart
 * /enroll
 * /enrollment
 * /ping
 * /drop
 * /getEnrollmentsByCourse
 * url : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com
 * add to cart : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/addToCart
 * get cart : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/cart?StudentId=1001
 * enroll : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/enroll
 * get enrollments : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/enrollment?StudentId=1001
 * ping : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/ping
 * drop : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/drop?StudentId=1001&CourseId=204
 * get enrollments by course : http://enrollment-nlb-047c901a12a29dbf.elb.us-west-2.amazonaws.com/getEnrollmentsByCourse?CourseId=294
 *  */
