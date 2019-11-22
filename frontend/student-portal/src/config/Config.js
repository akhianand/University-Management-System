const baseURL = "http://54.175.218.134:8000"

export function getURL (route) {
    if(route.startsWith("/")){
        return baseURL + route;
    }
    return baseURL + "/" +route;
}