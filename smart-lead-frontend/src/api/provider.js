import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2121/SmartLead",
  withCredentials: true,
});



export default api;