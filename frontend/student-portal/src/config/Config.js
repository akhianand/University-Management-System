const baseURL = "http://localhost:8080"

export function getURL (route) {
    if(route.startsWith("/")){
        return baseURL + route;
    }
    return baseURL + "/" +route;
}

export const enrollmentServiceURL = "http://localhost:8086";