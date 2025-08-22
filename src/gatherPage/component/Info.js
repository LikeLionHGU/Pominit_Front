import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DATE from "../../asset/img/red_date.svg";
import LOCATION from "../../asset/img/red_location.svg";
import PEOPLE from "../../asset/img/red_people.svg";
import HAND from "../../asset/img/red_hand.svg";

import styles from "./Info.module.css";

// API 기본 주소
const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

function Info() {
  const { id } = useParams(); // /gather/detail/:id 에서 id 추출
  const [gather, setGather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // ✅ /gather/detail/{id} 호출
        const { data } = await api.get(`/gather/detail/${id}`, {
          signal: controller.signal,
        });

        // 데이터 정규화(백엔드 응답 필드에 따라 조정 가능)
        const normalized = {
          category: data?.category ?? "",
          title: data?.title ?? "제목 없음",
          date: data?.date ?? "날짜 미정",
          location: data?.location ?? "장소 미정",
          capacity: data?.capacity ?? "정원 미정",
          description: data?.description ?? "소개 없음",
          price: data?.price ?? 0,
          oldPrice: data?.oldPrice ?? null,
          salePercent: data?.salePercent ?? null,
          deadline: data?.deadline ?? "마감일 미정",
          dday: data?.dday ?? null, // D-3 이런 값
        };

        setGather(normalized);
      } catch (e) {
        if (!axios.isCancel(e)) {
          console.error("모임 정보 불러오기 실패:", e);
          setErr(e.message || "모임 정보를 가져오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  if (loading) return <div className={styles.info}>불러오는 중…</div>;
  if (err) return <div className={styles.info}>로드 실패: {err}</div>;
  if (!gather) return null; // 데이터 없을 때 렌더링 X

  return (
    <div className={styles.info}>
      <div className={styles.cathegory}>{gather.category}</div>
      <div className={styles.title}>{gather.title}</div>

      <div className={styles.infoFeild}>
        <div className={styles.infoLeft}>
          <div className={styles.infoRaw}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={DATE} alt="icon" /> 모임일자
            </span>
            <span>{gather.date}</span>
          </div>
          <div className={styles.infoRaw}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={LOCATION} alt="icon" />
              강습소명
            </span>
            <span>{gather.location}</span>
          </div>
          <div className={styles.infoRaw}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={PEOPLE} alt="icon" />
              모집정원
            </span>
            <span>{gather.capacity}명</span>
          </div>
          <div className={styles.infoRaw}>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img src={HAND} alt="icon" /> 모임소개
            </span>
            <span>{gather.description}</span>
          </div>
        </div>

        <div className={styles.infoRight}>
          <div className={styles.infoRawBig}>
            <div className={styles.rawTop}>참가비</div>
            <div className={styles.rawContents}>
              {gather.oldPrice && (
                <div className={styles.oldPrice}>{gather.oldPrice}원</div>
              )}
              <div className={styles.rawBottom}>
                {gather.salePercent && (
                  <span className={styles.saleP}>{gather.salePercent}%</span>
                )}
                <span className={styles.price}>{gather.price}원</span>
              </div>
            </div>
          </div>

          <div className={styles.infoRawBig}>
            <div className={styles.rawTop}>모집기한</div>
            <div className={styles.rawContents}>
              {gather.dday && (
                <div className={styles.rawDay}>마감까지 D-{gather.dday}</div>
              )}
              <div className={styles.rawBottom}>{gather.deadline}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
