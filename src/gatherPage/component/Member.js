import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ 추가
import MEMBER from "../../asset/img/member.svg";
import PHONE from "../../asset/img/red_phone.svg";
import SMILE from "../../asset/img/red_smile.svg";

import styles from "./Member.module.css";

const API_BASE_URL = "http://liketiger.info:8080";
function Member() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/members`, {
          signal: controller.signal,
          timeout: 10000,
        });

        const normalized = (res.data || []).map((m) => ({
          name: m.name ?? "",
          intro: m.intro ?? m.description ?? "",
        }));

        setMembers(normalized);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("멤버 불러오기 실패:", err);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className={styles.member}>
      <div className={styles.top}>
        <span className={styles.topLeft}>멤버 소개</span>
        <button className={styles.topRight}>더보기 {">"} </button>
      </div>
      <div className={styles.contents}>
        <div className={styles.leader}>
          <div className={styles.leaderTop}>
            <img src={MEMBER} alt="Pic" className={styles.leaderPic} />
            <span className={styles.badge}>모임장</span>
          </div>
          <div className={styles.leaderInfo}>
            <div className={styles.name}>섭섭 핑핑이</div>
            <div className={styles.raw}>
              <span>
                <img src={PHONE} alt="icon" className={styles.iconImg} />
                010-2770-4990
              </span>
            </div>
            <div className={styles.raw}>
              <span>
                <img src={SMILE} alt="icon" className={styles.iconImg} />
                서핑 1년차
              </span>
            </div>
          </div>
        </div>

        {/* <div className={styles.members}>
          {members.map((member, idx) => (
            <div className={styles.memberItem} key={idx}>
              <div>
                <img src={MEMBER} alt="Pic" />
              </div>
              <div className={styles.memberInfo}>
                <div className={styles.name}>바다의 해삼</div>
                <div className={styles.raw}>모임원</div>
              </div>
            </div>
          ))}
        </div> */}

        <div className={styles.members}>
          <div className={styles.memberItem}>
            <img src={MEMBER} alt="Pic" className={styles.memberPic} />

            <div className={styles.memberInfo}>
              <div className={styles.memName}>바다의 해삼</div>
              <div className={styles.memCon}>모임원</div>
            </div>
          </div>
          <div className={styles.memberItem}>
            <div>
              <img src={MEMBER} alt="Pic" className={styles.memberPic} />
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memName}>바다의 해삼</div>
              <div className={styles.memCon}>모임원</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
