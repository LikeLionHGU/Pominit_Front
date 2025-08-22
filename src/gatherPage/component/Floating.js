// Floating.jsx
import React, { useState, useEffect } from "react";
import styles from "./Floating.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function Floating() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userId, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  // 토큰에서 userId 추출(선택사항)
  useEffect(() => {
    if (!token) return;
    const p = parseJwt(token);
    if (p?.userId || p?.id) setUserId(p.userId || p.id);
  }, [token]);

  const fetchJoin = async () => {
    if (submitting) return;

    // 로그인 가드
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      // Authorization 헤더 자동 보정 (Bearer 접두사 없으면 붙여줌)
      const authHeader = token.startsWith("Bearer ") ? token : { token };

      const res = await api.post(
        `/user/join/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        alert("신청이 완료되었습니다.");
        navigate(`/gather/detail/${id}`);
      } else {
        alert("신청에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
      } else if (status === 409) {
        // 서버 정책에 따라 중복 신청 등
        alert("이미 신청된 모임입니다.");
      } else {
        console.error("Error joining gather:", error);
        alert("신청에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.floatingBar}>
      <div className={styles.floatingInner}>
        <button
          className={styles.submit}
          onClick={fetchJoin}
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "신청 중..." : "신청하기"}
        </button>
      </div>
    </div>
  );
}

export default Floating;
