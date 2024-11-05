import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8061/api",
});

export default API;
