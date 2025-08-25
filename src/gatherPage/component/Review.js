import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Review.module.css";
import axios from "axios";
import SECRET from "../../asset/img/comment.svg";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});
const token = localStorage.getItem("token");

function TimeFormat(time) {
  const now = new Date();
  const reviewDate = new Date(time);
  const diffDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));
  if (diffDays === -1) return "오늘";
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "1일 전";
  return `${diffDays}일 전`;
}

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

function Review({ userName, isLoggedIn }) {
  const { id } = useParams();
  const PAGE = 10; 
  const [displayName, setDisplayName] = useState(userName || "");
  const [actuallyLoggedIn, setActuallyLoggedIn] = useState(
    Boolean(isLoggedIn || localStorage.getItem("token"))
  );

  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // 입력
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState(0);
  const [posting, setPosting] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setActuallyLoggedIn(Boolean(isLoggedIn || token));
    if (!displayName && token) {
      const p = parseJwt(token);
      if (p?.username) setDisplayName(p.username);
    }
  }, [isLoggedIn, displayName]);


  const fetchReviews = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await api.get(`/gather/comments/${id}`, {
          signal,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `${token}` } : {}),
          },
        });
        const normalized = (Array.isArray(data) ? data : []).map((r) => ({
          id: r.id ?? `${r.name || "review"}-${Math.random()}`,
          name: r.name ?? r.username ?? "익명",
          time: r.time ?? r.createdAt ?? new Date().toISOString(),
          comment: r.comment ?? r.content ?? "",
        }));
        setReviews(normalized);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setErr(e?.message || "리뷰를 가져오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchReviews(controller.signal);
    return () => controller.abort();
  }, [fetchReviews]);

  useEffect(() => {
    setVisibleCount((prev) => Math.min(PAGE, reviews.length || PAGE));
  }, [reviews]);

 
  const handleSubmit = async () => {
    try {
      setPosting(true);
      setErr("");

      const payload = {
        id: Number(id),
        content: content.trim(),
        secrete: secret,
      };

      await api.post("/user/comment", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `${token}` } : {}),
        },
      });

 
      setContent("");
      setSecret(0);
      const refetchController = new AbortController();
      await fetchReviews(refetchController.signal);
    } catch (e) {
      const status = e?.response?.status;
      setErr(
        status === 401
          ? "로그인 만료 또는 권한이 없습니다."
          : e?.message || "댓글 등록 실패"
      );
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <span className={styles.topLeft}>댓글</span>
      </div>


      <div
        className={styles.writen}
        style={{ display: reviews.length === 0 ? "none" : "block" }}
      >
        {reviews.slice(0, visibleCount).map((review) => (
          <div className={styles.reviewItem} key={review.id}>
            <div className={styles.reviewHeader}>
              <span className={styles.name}>{review.name}</span>
              <span className={styles.date}>{TimeFormat(review.time)}</span>
            </div>
            <div className={styles.comment}>{review.comment}</div>
          </div>
        ))}

        {reviews.length > PAGE && (
          <div className={styles.more}>
            {visibleCount < reviews.length ? (
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() =>
                  setVisibleCount((v) => Math.min(v + PAGE, reviews.length))
                }
              >
                더보기 ({reviews.length - visibleCount}개 남음)
              </button>
            ) : (
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() => setVisibleCount(PAGE)}
              >
                접기
              </button>
            )}
          </div>
        )}
      </div>

      {loading && <div className={styles.loading}>리뷰 불러오는 중…</div>}
      {err && <div className={styles.error}>{err}</div>}


      <div className={styles.write}>
        <div className={styles.writeHeader}>
          {actuallyLoggedIn ? `${displayName}님` : ""}
        </div>

        <textarea
          className={styles.textarea}
          placeholder={
            actuallyLoggedIn
              ? "댓글을 통해 모임원들과 소통해보세요!"
              : "로그인 후 댓글을 작성할 수 있습니다"
          }
          disabled={posting}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSubmit();
            }
          }}
        />

        <div className={styles.writeFooter}>
          <button
            type="button"
            className={`${styles.sicret} ${secret === 1 ? styles.pressed : ""}`}
            disabled={posting}
            aria-pressed={secret === 1}
            onClick={() => setSecret(secret === 1 ? 0 : 1)}
          >
            <img src={SECRET} alt="icon" className={styles.icon} />
            <span>비밀댓글</span>
          </button>

 
          <button
            type="button"
            className={styles.submit}
            onClick={handleSubmit}
          >
            {posting ? "등록 중…" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
