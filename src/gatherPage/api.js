// src/lib/api.js
import axios from "axios";

// 1) 배포/스테이징: .env의 REACT_APP_API_URL 사용
// 2) 개발: dev proxy 사용 시 ''(빈 값) 유지 -> /api 로만 호출
const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");

// mixed content 방지: 페이지가 https면 http API 강제 차단
if (
  API_BASE &&
  window.location.protocol === "https:" &&
  API_BASE.startsWith("http://")
) {
  console.warn(
    "[api] HTTPS 페이지에서 HTTP API를 호출할 수 없습니다. API_BASE를 https로 바꾸세요:",
    API_BASE
  );
}

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

// 에러 로깅(디버깅에 도움)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      console.error(
        "[api] HTTP ERROR",
        err.response.status,
        err.config?.method?.toUpperCase(),
        err.config?.url,
        err.response?.headers?.["content-type"],
        typeof err.response.data === "string"
          ? err.response.data.slice(0, 300)
          : err.response.data
      );
    } else {
      console.error(
        "[api] NETWORK ERROR:",
        err.message,
        err.config?.baseURL,
        err.config?.url
      );
    }
    return Promise.reject(err);
  }
);

export default api;
