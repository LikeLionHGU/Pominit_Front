import React from "react";
import DATE from "../../asset/img/red_date.svg";
import LOCATION from "../../asset/img/red_location.svg";
import PEOPLE from "../../asset/img/red_people.svg";
import HAND from "../../asset/img/red_hand.svg";

import styles from "./Info.module.css";

function Info() {
  return (
    <div className={styles.info}>
      <div className={styles.cathegory}>카테고리</div>
      <div className={styles.title}>서핑 웨이브에서 강습 받으실 분</div>
      <div className={styles.infoFeild}>
        <div className={styles.infoLeft}>
          <div className={styles.infoRaw}>
            <span>
              <img src={DATE} alt="icon" /> 모임 일자
            </span>
            <span>{"날짜 정보"}</span>
          </div>
          <div className={styles.infoRaw}>
            <span>
              <img src={LOCATION} alt="icon" />
              강습소명
            </span>
            <span>{"강습소"}</span>
          </div>
          <div className={styles.infoRaw}>
            <span>
              <img src={PEOPLE} alt="icon" />
              모집정원
            </span>
            <span>{"모집 정원"}</span>
          </div>
          <div className={styles.infoRaw}>
            <span>
              <img src={HAND} alt="icon" /> 모임소개
            </span>
            <span>{"모임 소개"}</span>
          </div>
        </div>
        <div className={styles.infoRight}>
          <div className={styles.infoRawBig}>
            <div className={styles.rawTop}>참가비</div>
            <div className={styles.rawContents}>
              <div className={styles.oldPrice}>50,000원</div>
              <div className={styles.rawBottom}>
                <span className={styles.saleP}>60%</span>
                <span className={styles.price}>20,000원</span>
              </div>
            </div>
          </div>

          <div className={styles.infoRawBig}>
            <div className={styles.rawTop}>모집기한</div>
            <div className={styles.rawContents}>
              <div className={styles.rawDay}>마감까지 D-3</div>
              <div className={styles.rawBottom}>~ 8/7(목) 오후 3:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
