import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Review.module.css";
import axios from "axios";
import SECRET from "../../asset/img/comment.svg";

/**
 * 배포: .env에 REACT_APP_API_URL=https://api.liketiger.info 같은 절대 URL 권장
 * 개발: dev server proxy(/api -> http://localhost:8080) 쓰면 REACT_APP_API_URL 비워둬도 됨
 */
const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false, // 쿠키 인증이면 true
});

function TimeFormat(time) {
  const now = new Date();
  const reviewDate = new Date(time);
  const diffTime = now - reviewDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  return `${diffDays}일 전`;
}
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    //JWT는 헤더.페이로드.서명 구조인데 점(.)을 기준으로 하여 페이로드를 꺼낸다
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //JWT 페이로드는 Base64URL 형식이라서 -,_를 쓰는데 브라우저의 atob가 이해하도록
    //Base64로 바꾸기 위해 - -> +, _ -> /로 치환한다.

    //정상적인 문자열(UTF-8)로 복원하기 기능
    const jsonPayload = decodeURIComponent(
      atob(base64) //Base64 문자열을 바이너리 문자열로 디코딩
        .split("") //문자열을 문자 배열로 나누기
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        //각 문자의 코드 값을 16진수 2자리로 변환하고 앞에 %를 붙여서 인코딩함.
        .join("") //인코딩 조각들을 하나의 문자열로 결합하기
    );

    return JSON.parse(jsonPayload); //JSON문자열을 자바스크립트 객체로 파싱해서 반환함
  } catch (e) {
    return null;
  }
}

function Review({ userName, isLoggedIn }) {
  isLoggedIn = true; // 임시로 로그인 상태로 설정
  const { id } = useParams(); // /gather/:id 같은 라우트에서 id 추출

  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState("");
  const [secret, setSecret] = useState(0);
  const [posting, setPosting] = useState(false);
  const [userNamee, setUserName] = useState("");
  isLoggedIn = true;

  //사용자 이름 받기
  useEffect(() => {
    const token = localStorage.getItem("token"); //로컬스토리지에서 token으로 저장된 jwt 문자열 읽기
    //토큰이 존재하면,
    if (token) {
      const payload = parseJwt(token); //디코딩으로 페이로드 객체 얻기

      //페이로드가 존재하고, 그 안에 username 속성이 있을때 진행하기
      if (payload?.username) {
        setUserName(payload.username); //가져온 사용자명 상태로 저장하기
      }
    }
  }, [userName]);

  // ✅ 댓글 목록 불러오기
  useEffect(() => {
    // (서버가 전체 댓글을 주는 /comments만 있다면 아래 if문 제거)
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // 서버 라우트에 맞춰 하나만 남기세요.
        // 1) 보편적인 패턴
        let url = `/gather/comments/${id}`;

        const { data } = await api.get(url, { signal: controller.signal });

        const normalized = (Array.isArray(data) ? data : []).map((r) => ({
          id: r.id ?? `${r.name || "review"}-${Math.random()}`,
          name: r.name ?? r.username ?? "익명",
          time: r.time ?? r.createdAt ?? new Date().toISOString(),
          comment: r.comment ?? r.content ?? "",
        }));
        setReviews(normalized);
        console.log("리뷰 목록:", normalized);
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("리뷰 불러오기 실패:", e);
          setErr(e.message || "리뷰를 가져오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  // ✅ 댓글 등록 핸들러
  const handleSubmit = async () => {
    if (!isLoggedIn || !content.trim()) return;
    try {
      setPosting(true);
      setErr(null);
      const payload = {
        id: id, // 모임 아이디
        content: content.trim(),
        secrete: secret, // 0 or 1
      };

      const { data } = await api.post("/user/comment", payload);

      // 새 댓글을 목록에 추가 (서버에서 새 객체 반환 시 data로 교체)
      setReviews((prev) => [
        {
          id: id,
          name: userName,
          time: new Date().toISOString(),
          comment: content.trim(),
        },
        ...prev,
      ]);
      setContent(""); // 입력창 초기화
      setSecret(0);
    } catch (e) {
      console.error("댓글 등록 실패:", e);
      setErr(e.message || "댓글 등록 실패");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <span className={styles.topLeft}>댓글</span>
      </div>

      {/* 목록 */}
      <div
        className={styles.writen}
        style={{ display: reviews.length === 0 ? "none" : "block" }}
      >
        {reviews.map((review) => (
          <div className={styles.reviewItem} key={review.id}>
            <div className={styles.reviewHeader}>
              <span className={styles.name}>{review.name}</span>
              <span className={styles.date}>{TimeFormat(review.time)}</span>
            </div>
            <div className={styles.comment}>{review.comment}</div>
          </div>
        ))}
      </div>

      {loading && <div className={styles.loading}>리뷰 불러오는 중…</div>}
      {err && <div className={styles.error}>리뷰 로드 실패: {err}</div>}

      {/* 작성 영역 */}
      <div className={styles.write}>
        <div className={styles.writeHeader}>
          {isLoggedIn ? `${userNamee}님` : ""}
        </div>
        <textarea
          className={styles.textarea}
          placeholder={
            isLoggedIn
              ? "댓글을 통해 모임원들과 소통해보세요!"
              : "로그인 후 댓글을 작성할 수 있습니다"
          }
          disabled={!isLoggedIn}
        />
        <div className={styles.writeFooter}>
          <button
            className={styles.sicret}
            disabled={!isLoggedIn}
            onClick={() => setSecret(secret === 1 ? 0 : 1)}
          >
            <img src={SECRET} alt="icon" className={styles.icon} />
            <span>비밀댓글</span>
          </button>
          <div
            className={`${styles.submit} ${!isLoggedIn ? styles.disabled : ""}`}
            onClick={handleSubmit}
          >
            {posting ? "등록 중…" : "등록하기"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
