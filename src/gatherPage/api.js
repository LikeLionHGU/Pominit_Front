// src/lib/api.js
import axios from "axios";

// 1) 배포/스테이징: .env의 REACT_APP_API_URL 사용
// 2) 개발: dev proxy 사용 시 ''(빈 값) 유지 -> /api 로만 호출
const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");


const api = axios.create({
  baseURL: API_BASE ? `${API_BASE}/api` : "/api", // 항상 /api prefix로 통일
  withCredentials: false, // 쿠키 인증이면 true
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 필요하면 토큰 붙이기
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default api;
