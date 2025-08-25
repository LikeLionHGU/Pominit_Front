
import axios from "axios";

const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");


const api = axios.create({
  baseURL: API_BASE ? `${API_BASE}/api` : "/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default api;
