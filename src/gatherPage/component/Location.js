import React, { useState, useEffect } from "react";
import styles from "./Location.module.css";
import axios from "axios";
import POSTER from "../../asset/img/poster.jpg";
import LOCATION from "../../asset/img/location.svg";
import DATE from "../../asset/img/date.svg";

const API_BASE_URL = "http://liketiger.info:8080";

function Location() {
  // props로 사용자 정보 받기
  const [location, setLocation] = useState([]);
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/location`, {
        timeout: 10000,
      });
    } catch (e) {
      console.error("강습소 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className={styles.location}>
      <div className={styles.top}>
        <span className={styles.topLeft}>강습소 정보</span>
      </div>
      <div className={styles.locationCard}>
        <img src={location.imgUrl || POSTER} alt="img"></img>
        <div className={styles.locationInfo}>
          <div className={styles.infoTop}>
            <div className={styles.infoTopLeft}>
              <div className={styles.name}>[포항 입문 서핑] 서핑웨이브</div>
              <div className={styles.description}>
                친절하고 카페 이용이 가능한 강습소예요!
              </div>
            </div>
            <div className={styles.infoTopRight}>상세보기 {" >"}</div>
          </div>
          <div className={styles.infoBottom}>
            <div className={styles.row}>
              <span>
                <img src={LOCATION} />
              </span>
              <span>포항시 북구 흥해읍 흥해로 123</span>
            </div>
            <div className={styles.row}>
              <span>
                <img src={DATE} />
              </span>
              <span>매일 11:00-20:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
