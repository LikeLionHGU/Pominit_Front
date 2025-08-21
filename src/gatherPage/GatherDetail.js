import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Floating from "./component/Floating";

import Info from "./component/Info";
import Member from "./component/Member";
import Review from "./component/Review";
import Location from "./component/Location";

import styles from "./styles/GatherDetail.module.css";

// JWT 디코딩 함수 (main.js에서 가져온 것과 동일)
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
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자 이름 관련
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬스토리지에서 token으로 저장된 jwt 문자열 읽기

    // 토큰이 존재하면,
    if (token) {
      const payload = parseJwt(token); // 디코딩으로 페이로드 객체 얻기

      // 페이로드가 존재하고, 그 안에 username 속성이 있을때 진행하기
      if (payload?.username) {
        setUserName(payload.username); // 가져온 사용자명 상태로 저장하기
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <div className={styles.wrap}>
        <Sidebar />
        <div className={styles.container}>
          <Info />
          <Member />
          <Review userName={userName} isLoggedIn={isLoggedIn} />
          <Location />
        </div>
      </div>
      <Floating />
    </div>
  );
}

export default GatherDetail;
