const currentURL = window.location.href;
let baseURL;

// if (currentURL === "http://52.34.62.96:3000/") {
//   // If it matches, use the development backend URL
//   baseURL = "http://52.34.62.96";
// } else {
//   // If it doesn't match, use the default backend URL or the one from environment variable
//   baseURL = "http://192.168.3.24:8000";
// }

baseURL = "http://localhost:8000";

// baseURL = "http://52.34.62.96";

//baseURL = "http://192.168.3.24:8000";

export default baseURL;
