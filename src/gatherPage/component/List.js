// List.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fallbackData from "../../data/gather.json";

import styles from "./List.module.css";
import DateIcon from "../../asset/img/date.svg";
import LocationIcon from "../../asset/img/location.svg";
import Arrow from "../../asset/img/pointer.svg";

function List({ category = "", date = "", useFallbackWhenEmpty = false }) {
  const [lists, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const didFetch = useRef(false); // StrictMode 가드

  const fmtDate = (time) => {
    if (!time) return "";
    const parts = String(time).split(" ");
    return parts[0] || String(time);
  };

  useEffect(() => {
    const controller = new AbortController();

    // 🔹 디바운스: 빠르게 값이 바뀔 때 200ms 모아서 1번만 호출
    const t = setTimeout(async () => {
      setLoading(true);
      setErrMsg("");

      const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      );
      const safeDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
      const body = {
        sport: category?.trim() ? category.trim() : "",
        date: safeDate,
        page: 0,
        size: 20,
      };

      try {
        const r = await axios.post(`${API_BASE}/home/gather/list`, body, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          validateStatus: () => true,
          timeout: 10000,
        });

        if (r.status === 401) {
          setErrMsg("로그인이 필요합니다.");
          setList(useFallbackWhenEmpty ? fallbackData : []);
          return;
        }
        if (r.status >= 400) {
          setErrMsg("목록을 불러오지 못했습니다.");
          setList(useFallbackWhenEmpty ? fallbackData : []);
          return;
        }

        const data = r.data;
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.content)
          ? data.content
          : [];

        setList(items);
      } catch (e) {
        if (e.name === "CanceledError") return; // 취소된 요청 무시
        console.error("[Gather List] fetch error:", e);
        setErrMsg("네트워크 오류가 발생했습니다.");
        setList(useFallbackWhenEmpty ? fallbackData : []);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [category, date, useFallbackWhenEmpty]);

  if (loading) return <div className={styles.loading}>불러오는 중…</div>;
  if (errMsg && lists.length === 0)
    return <div className={styles.error}>{errMsg}</div>;
  if (lists.length === 0)
    return <div className={styles.empty}>아직 모임이 없어요.</div>;

  return (
    <div>
      {lists.map((item, idx) => {
        // 서버 스키마: { id, title, sport, time, location, capacity, total }
        const id = item.id ?? idx;
        const sportLabel = item.sport || item["카테고리"] || "";
        const title = item.title || item["모집 제목"] || "";
        const dateStr = item.time ? fmtDate(item.time) : item["날짜"] || "";
        const place = item.location || item["강습소 이름"] || "";
        const current = item.total ?? item["현재 신청 인원"] ?? 0;
        const max = item.capacity ?? item["총 멤버"] ?? 0;

        return (
          <div
            className={styles.card}
            key={id}
            onClick={() => navigate(`/gather/detail/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.left}>
              <div className={styles.cathegory}>{sportLabel}</div>
              <div className={styles.title}>{title}</div>
            </div>

            <div className={styles.right}>
              <div className={styles.row}>
                <span className={styles.content}>
                  <img src={DateIcon} alt="icon" className={styles.icon} />
                  {dateStr}
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.content}>
                  <img src={LocationIcon} alt="icon" className={styles.icon} />
                  {place}
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.content}>
                  <span>
                    <svg
                      className={styles.icon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                    >
                      <path
                        opacity="0.9"
                        d="M13.8286 5.14286C15.2622 5.14286 16.4108 3.99429 16.4108 2.57143C16.4108 1.14857 15.2622 0 13.8286 0C12.3949 0 11.2377 1.14857 11.2377 2.57143C11.2377 3.99429 12.3949 5.14286 13.8286 5.14286ZM6.91948 5.14286C8.35311 5.14286 9.50175 3.99429 9.50175 2.57143C9.50175 1.14857 8.35311 0 6.91948 0C5.48584 0 4.32857 1.14857 4.32857 2.57143C4.32857 3.99429 5.48584 5.14286 6.91948 5.14286ZM6.91948 6.85714C4.90721 6.85714 0.874023 7.86 0.874023 9.85714V11.1429C0.874023 11.6143 1.26266 12 1.73766 12H12.1013C12.5763 12 12.9649 11.6143 12.9649 11.1429V9.85714C12.9649 7.86 8.93175 6.85714 6.91948 6.85714ZM13.8286 6.85714C13.5781 6.85714 13.2931 6.87429 12.9908 6.9C13.0081 6.90857 13.0168 6.92571 13.0254 6.93429C14.0099 7.64571 14.6922 8.59714 14.6922 9.85714V11.1429C14.6922 11.4429 14.6318 11.7343 14.5368 12H19.0104C19.4854 12 19.874 11.6143 19.874 11.1429V9.85714C19.874 7.86 15.8408 6.85714 13.8286 6.85714Z"
                        fill="#2F83F3"
                      />
                    </svg>
                  </span>
                  {current}/{max}명
                </span>
              </div>

              <div className={styles.joinBtn}>
                <span
                  style={{ display: "flex", alignItem: "center", gap: "38px" }}
                >
                  모임 참여하기 <img src={Arrow} alt="icon" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default List;
