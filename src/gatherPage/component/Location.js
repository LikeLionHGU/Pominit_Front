import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Location.module.css";
import axios from "axios";
import POSTER from "../../asset/img/poster.jpg";
import LOCATION from "../../asset/img/location.svg";
import DATE from "../../asset/img/date.svg";
import { Link } from "react-router-dom";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

function Location() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const { data } = await api.get(`gather/location/${id}`, {
          signal: controller.signal,
        });

        const normalized = {
          locationId: data?.id ?? id,
          name: data?.name ?? data?.title ?? "이름 미정",
          description: data?.description ?? data?.desc ?? "",
          imgUrl: data?.image ?? data?.imageUrl ?? "",
          address: data?.address ?? data?.addr ?? "",
          hours: data?.hours ?? data?.openHours ?? "",
          detailUrl: data?.detailUrl ?? data?.url ?? "",
        };

        setPlace(normalized);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setErr(e.message || "강습소 정보를 가져오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return (
    <div className={styles.location}>
      <div className={styles.top}>
        <span className={styles.topLeft}>강습소 정보</span>
      </div>

      {loading && <div className={styles.loading}>불러오는 중…</div>}
      {err && <div className={styles.error}>로드 실패: {err}</div>}

      <div className={styles.locationCard}>
        <img src={place?.imgUrl || POSTER} alt="img" />
        <div className={styles.locationInfo}>
          <div className={styles.infoTop}>
            <div className={styles.infoTopLeft}>
              <div className={styles.name}>
                {place?.name || "[강습소 이름]"}
              </div>
              <div className={styles.description}>
                {place?.description || "강습소 설명이 아직 없어요."}
              </div>
            </div>
            <div className={styles.infoTopRight}>
              {place?.detailUrl ? (
                <Link
                  to={`/detail/${place?.locationId}`}
                  className={styles.infoTopRight}
                >
                  상세보기 {" >"}
                </Link>
              ) : (
                <Link
                  to={`/detail/${place?.locationId}`}
                  className={styles.infoTopRight}
                >
                  상세보기 {" >"}
                </Link>
              )}
            </div>
          </div>

          <div className={styles.infoBottom}>
            <div className={styles.row}>
              <span>
                <img src={LOCATION} alt="icon" />
              </span>
              <span>{place?.address || "주소 정보가 없습니다"}</span>
            </div>
            <div className={styles.row}>
              <span>
                <img src={DATE} alt="icon" />
              </span>
              <span>{place?.hours || "운영시간 정보가 없습니다"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
