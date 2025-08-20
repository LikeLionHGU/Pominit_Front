import React from "react";
import MEMBER from "../../asset/img/member.svg";
import PHONE from "../../asset/img/red_phone.svg";
import SMILE from "../../asset/img/red_smile.svg";

import styles from "./Member.module.css";

function Member() {
  return (
    <div className={styles.member}>
      <div className={styles.top}>
        <span className={styles.topLeft}>멤버 소개</span>{" "}
        <span className={styles.topRight}>더보기 {">"} </span>{" "}
      </div>
      <div className={styles.contents}>
        <div className={styles.leader}>
          <div>
            <img src={MEMBER} alt="Pic"></img>
            <span className={styles.badge}>모임장</span>
          </div>
          <div className={styles.leaderInfo}>
            <div className={styles.name}></div>
            <div className={styles.raw}>
              <span>
                <img src={PHONE} alt="icon" />
                010-2770-4990
              </span>
            </div>
            <div className={styles.raw}>
              <img src={SMILE} alt="icon" />
              서핑 1년차
            </div>
          </div>
        </div>
        <div className={styles.members}></div>
      </div>
    </div>
  );
}

export default Member;
