import React, { useState, useEffect } from "react";
import styles from "./Review.module.css";
import axios from "axios";
import SECRET from "../../asset/img/comment.svg";

const API_BASE_URL = "lhttp://liketiger.info:8080";

function TimeFormat(time) {
  const now = new Date();
  const reviewDate = new Date(time);
  const diffTime = now - reviewDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  return `${diffDays}일 전`;
}

function Review({ userName, isLoggedIn }) {
  // props로 사용자 정보 받기
  const [reviews, setReviews] = useState([]);
  isLoggedIn = true;
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/comments`, {
        timeout: 10000,
      });
      const normalized = (res.data || []).map((r) => ({
        ...r,
        comment: r.comment ?? r.content ?? "",
      }));
      setReviews(normalized);
    } catch (e) {
      console.error("리뷰 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <span className={styles.topLeft}>댓글</span>
      </div>
      <div
        className={styles.writen}
        style={{ display: reviews.length === 0 ? "none" : "block" }}
      >
        {reviews.map((review, idx) => (
          <div className={styles.reviewItem} key={idx}>
            <div className={styles.reviewHeader}>
              <span className={styles.name}>{review.name}</span>
              <span className={styles.date}>{TimeFormat(review.time)}</span>
            </div>
            <div className={styles.comment}>{review.comment}</div>
          </div>
        ))}
      </div>
      <div className={styles.write}>
        {/* 로그인 상태에 따라 사용자 이름 또는 "로그인이 필요합니다" 표시 */}
        <div className={styles.writeHeader}>
          {isLoggedIn ? `${userName}님` : ""}
        </div>
        <textarea
          className={styles.textarea}
          placeholder={
            isLoggedIn
              ? "댓글을 통해 모임원들과 소통해보세요!"
              : "로그인 후 댓글을 작성할 수 있습니다"
          }
          disabled={!isLoggedIn} // 로그인하지 않으면 비활성화
        ></textarea>
        <div className={styles.writeFooter}>
          <button className={styles.sicret} disabled={!isLoggedIn}>
            <img src={SECRET} alt="icon" className={styles.icon} />
            <span>비밀댓글</span>
          </button>
          <div
            className={`${styles.submit} ${!isLoggedIn ? styles.disabled : ""}`}
            style={!isLoggedIn ? { opacity: 0.5, cursor: "not-allowed" } : {}}
          >
            등록하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
