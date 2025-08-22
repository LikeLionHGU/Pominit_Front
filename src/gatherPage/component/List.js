import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fallbackData from "../../data/gather.json"; // 없으면 지워도 됨

import styles from "./List.module.css";

import DateIcon from "../../asset/img/date.svg";
import LocationIcon from "../../asset/img/location.svg";
import MemberIcon from "../../asset/img/member.svg";
import Arrow from "../../asset/img/pointer.svg";

function List({ lists: propLists = [] }) {
  const [lists, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 서버 데이터가 있으면 그걸로, 없으면 예전처럼 로컬 JSON 사용
    if (propLists && propLists.length > 0) setList(propLists);
    else setList(fallbackData);
  }, [propLists]);

  const fmtDate = (time) => {
    if (!time) return "";
    // 서버: "yyyy-MM-dd HH:mm:ss" → 날짜만 노출
    // 공백 기준 split, 실패 시 원문 반환
    const parts = String(time).split(" ");
    return parts[0] || String(time);
  };

  return (
    <div>
      {lists.map((item, idx) => {
        // 서버 스키마: { id, title, sport, time, location, capacity, total }
        // 기존 로컬 JSON 키와 혼용 렌더(폴백)해서 깨지지 않게 처리
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
            onClick={() => navigate(`/gather/${id}`)}
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
