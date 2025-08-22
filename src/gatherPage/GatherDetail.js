import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Floating from "./component/Floating";

import Info from "./component/Info";
import Member from "./component/Member";
import Review from "./component/Review";
import Location from "./component/Location";

import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/GatherDetail.module.css";

// JWT 디코딩 함수 (기존 유지)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT 파싱 에러:", error);
    return null;
  }
}

function GatherDetail() {
  const { id } = useParams(); // /gather/:id
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [gather, setGather] = useState(null);
  // eslint-disable-next-line
  const [fetchError, setFetchError] = useState(null);

  // 사용자 이름 관련 (기존 유지)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload?.username) {
        setUserName(payload.username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 공용: Authorization/쿠키 옵션 구성
  function buildAuthOptions() {
    const token = localStorage.getItem("token");
    const headers = {
      Accept: "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return {
      method: "GET",
      headers,
      // 세션/쿠키 기반 인증이면 필요 (Spring Security 세션 등)
      // 토큰만 쓰고 쿠키를 안 쓰면 그래도 두어도 무방
      credentials: "include",
    };
  }

  // ✅ 서버에서 GET으로 데이터 받아오기
  useEffect(() => {
    let ignore = false;
    async function fetchGather() {
      setFetchError(null);
      setGather(null); // 이전 상세 잔상 방지

      const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      );
      const url = `${API_BASE}/gather/detail/${encodeURIComponent(id)}`;

      try {
        const res = await fetch(url, buildAuthOptions());

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
            return;
          }
          const body = await res.text();
          throw new Error(
            `Failed (status ${res.status}) ${res.url}\n${
              body?.slice(0, 300) || ""
            }`
          );
        }

        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const body = await res.text();
          throw new SyntaxError(
            `Expected JSON but got ${ct}\n${body.slice(0, 200)}`
          );
        }

        const data = await res.json();
        if (!ignore) {
          setGather({
            ...data,
            originalPriceNum: data.originalPrice
              ? Number(data.originalPrice)
              : null,
            currentPriceNum: data.currentPrice
              ? Number(data.currentPrice)
              : null,
          });
        }
      } catch (err) {
        if (!ignore)
          setFetchError(err.message || "데이터를 가져오지 못했습니다.");
      }
    }

    if (id) fetchGather();
    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  return (
    <div className="container">
      <Header />
      <div className={styles.wrap}>
        <Sidebar />

        <div className={styles.container}>
          {gather && (
            <>
              <Info />
              <Member />
              <Review userName={userName} isLoggedIn={isLoggedIn} />
              <Location />
            </>
          )}
        </div>
      </div>
      <Floating />
    </div>
  );
}

export default GatherDetail;
