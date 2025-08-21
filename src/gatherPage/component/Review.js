import React, { useState, useEffect } from "react";
import styles from "./Review.module.css";
import axios from "axios"; // ✅ 추가

// ✅ .env에 REACT_APP_API_URL=https://example.com 같은 값이 있다고 가정
// const API_BASE = (process.env.REACT_APP_API_URL || "").replace(/\/+$/, "");
const API_BASE_URL = "https://www.liketiger.info:443";

function TimeFormat(time) {
  const now = new Date();
  const reviewDate = new Date(time);
  const diffTime = now - reviewDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  return `${diffDays}일 전`;
}

function Review() {
  const [reviews, setReviews] = useState([]);

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
      <div className={styles.top}>댓글</div>
      <div className={styles.contents}>
        <div className={styles.writen}>
          {reviews.map((review, idx) => (
            <div className={styles.reviewItem} key={idx}>
              <div className={styles.reviewHeader}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.date}>{TimeFormat(review.time)}</span>
              </div>
              <div className={styles.comment}>{review.content}</div>
            </div>
          ))}
        </div>
        <div className={styles.write}>
          <div className={styles.writeHeader}>섭섭핑핑이님</div>
          <textarea
            className={styles.textarea}
            placeholder="댓글을 통해 모임원들과 소통해보세요!"
          ></textarea>
          <div className={styles.writeFooter}>
            <button className={styles.sicret}>비밀댓글</button>
            <div className={styles.submit}>등록하기</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
