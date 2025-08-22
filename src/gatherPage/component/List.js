// List.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fallbackData from "../../data/gather.json";

import styles from "./List.module.css";
import DateIcon from "../../asset/img/date.svg";
import LocationIcon from "../../asset/img/location.svg";
import MemberIcon from "../../asset/img/member.svg";
import Arrow from "../../asset/img/>>>.svg";

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

    async function fetchList() {
      setLoading(true);
      setErrMsg("");

      const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      );
      const token = localStorage.getItem("token");

      // 서버가 안정적으로 파싱하도록: 빈 문자열 → null, 일정 스키마 고정
      const body = {
        sport: category?.trim() ? category.trim() : "",
        date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "", // yyyy-MM-dd만
        page: 0,
        size: 20,
      };

      try {
        const r = await axios.post(`${API_BASE}/home/gather/list`, body, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
          validateStatus: () => true,
          timeout: 10000,
        });

        if (r.status === 401) {
          localStorage.removeItem("token");
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
        console.error("[Gather List] fetch error:", e);
        setErrMsg("네트워크 오류가 발생했습니다.");
        setList(useFallbackWhenEmpty ? fallbackData : []);
      } finally {
        setLoading(false);
      }
    }

    // StrictMode로 인한 중복 방지 + 필터 변경 시마다 호출
    if (!didFetch.current) {
      didFetch.current = true;
      fetchList();
    } else {
      // 이후부터는 필터 변경마다 호출
      fetchList();
    }

    return () => controller.abort();
  }, [category, date, useFallbackWhenEmpty]);

  if (loading) return <div className={styles.loading}>불러오는 중…</div>;
  if (errMsg && lists.length === 0)
    return <div className={styles.error}>{errMsg}</div>;
  if (lists.length === 0)
    return <div className={styles.empty}>표시할 모임이 없어요.</div>;

  return (
    <div>
      {lists.map((item, idx) => {
        // 서버 스키마: { id, title, sport, time, location, capacity, total }
        const id = item.id ?? idx;
        const category = item.sport || item["카테고리"] || "";
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
              <div className={styles.cathegory}>{category}</div>
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
                  <img
                    src={MemberIcon}
                    alt="icon"
                    className={styles.icon}
                    style={{
                      width: "11px",
                      marginRight: "11px",
                      marginLeft: "2px",
                    }}
                  />
                  {current}/{max}명
                </span>
              </div>

              <div className={styles.joinBtn}>
                <span>
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
