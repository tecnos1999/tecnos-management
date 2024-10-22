export function getHostName() {
    const  dev= process.env.REACT_APP_ENV;
    if (dev==="development") return "http://localhost:5000" ;
    return `http://${window.location.hostname}:8080`
}
