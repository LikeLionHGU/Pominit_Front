import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import MEMBER from "../../asset/img/member.svg";
import PHONE from "../../asset/img/red_phone.svg";
import SMILE from "../../asset/img/red_smile.svg";
import styles from "./Member.module.css";

/**
 * props
 * - gatherId?: number | string  (모임별 멤버를 받는다면 쿼리로 전달; 서버에서 무시하면 전체 멤버)
 */
function Member({ leader }) {
  const { id } = useParams(); // /gather/:id 같은 라우트에서 id 추출

  const [members, setMembers] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(
          /\/+$/,
          ""
        );
        const url = `${BASE}/gather/members/${id}`; // ✅ 서버에서 주신 정확한 엔드포인트

        const res = await axios.get(url, {
          signal: controller.signal,
          timeout: 10000,
          headers: { Accept: "application/json" },
        });

        // 응답 예시:
        // [
        //   { "name": "서병주", "imageUrl": "qwer.com", "statement": "상태메시지" },
        //   { ... }
        // ]
        const arr = Array.isArray(res.data) ? res.data : [];

        const normalized = arr.map((m, i) => ({
          id: m.id ?? `${m.name || "member"}-${i}`,
          name: m.name ?? "",
          imageUrl: m.imageUrl || "", // 없으면 기본 이미지로 대체
          statement: m.statement ?? "",
        }));

        setMembers(normalized);
        console.log("멤버 목록:", normalized);
      } catch (e) {
        if (axios.isCancel(e)) return;
        console.error("멤버 불러오기 실패:", e);
        setErr(e.message || "멤버를 가져오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return (
    <div className={styles.member}>
      <div className={styles.top}>
        <span className={styles.topLeft}>멤버 소개</span>
        <button className={styles.topRight}>더보기 {">"} </button>
      </div>

      <div className={styles.contents}>
        {/* 모임장 블록: 서버에서 별도 제공되면 치환하세요 */}
        <div className={styles.leader}>
          <div className={styles.leaderTop}>
            {/* 전달받은 이미지가 있으면 사용, 없으면 기본 아이콘 */}
            {leader?.imageUrl ? (
              <img
                src={leader.imageUrl}
                alt={leader?.name || "Pic"}
                className={styles.leaderPic}
              />
            ) : (
              <img src={MEMBER} alt="Pic" className={styles.leaderPic} />
            )}{" "}
            <span className={styles.badge}>모임장</span>
          </div>
          <div className={styles.leaderInfo}>
            <div className={styles.name}>{leader?.name || "모임장"}</div>
            <div className={styles.raw}>
              <span>
                <img src={PHONE} alt="icon" className={styles.iconImg} />
                {leader?.contact || "연락처"}
              </span>
            </div>
            <div className={styles.raw}>
              <span>
                <img src={SMILE} alt="icon" className={styles.iconImg} />
                {leader?.statement || "경력"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.members}>
          {loading && <div>멤버 불러오는 중…</div>}
          {err && <div className={styles.error}>멤버 로드 실패: {err}</div>}

          {!loading &&
            !err &&
            (members.length === 0 ? (
              <div className={styles.emptyWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="37"
                  viewBox="0 0 36 37"
                  fill="none"
                >
                  <path
                    opacity="0.9"
                    d="M23.1818 16.9379C25.3323 16.9379 27.0552 15.2151 27.0552 13.0808C27.0552 10.9465 25.3323 9.22363 23.1818 9.22363C21.0314 9.22363 19.2955 10.9465 19.2955 13.0808C19.2955 15.2151 21.0314 16.9379 23.1818 16.9379ZM12.8182 16.9379C14.9686 16.9379 16.6916 15.2151 16.6916 13.0808C16.6916 10.9465 14.9686 9.22363 12.8182 9.22363C10.6677 9.22363 8.93182 10.9465 8.93182 13.0808C8.93182 15.2151 10.6677 16.9379 12.8182 16.9379ZM12.8182 19.5093C9.79977 19.5093 3.75 21.0136 3.75 24.0093V25.9379C3.75 26.6451 4.33295 27.2236 5.04545 27.2236H20.5909C21.3034 27.2236 21.8864 26.6451 21.8864 25.9379V24.0093C21.8864 21.0136 15.8366 19.5093 12.8182 19.5093ZM23.1818 19.5093C22.8061 19.5093 22.3786 19.5351 21.9252 19.5736C21.9511 19.5865 21.9641 19.6122 21.977 19.6251C23.4539 20.6922 24.4773 22.1193 24.4773 24.0093V25.9379C24.4773 26.3879 24.3866 26.8251 24.2441 27.2236H30.9545C31.667 27.2236 32.25 26.6451 32.25 25.9379V24.0093C32.25 21.0136 26.2002 19.5093 23.1818 19.5093Z"
                    fill="#CAD0D7"
                  />
                </svg>
                <div className={styles.emptyText}>
                  모임의 첫번쨰 멤버가 되어주세요!
                </div>
              </div>
            ) : (
              members.map((m) => (
                <div className={styles.memberItem} key={m.id}>
                  <div>
                    {m.imageUrl ? (
                      <img
                        src={m.imageUrl}
                        alt={m.name}
                        className={styles.memberPic}
                      />
                    ) : (
                      <img
                        src={MEMBER}
                        alt="Pic"
                        className={styles.memberPic}
                      />
                    )}
                  </div>
                  <div className={styles.memberInfo}>
                    <div className={styles.memName}>
                      {m.name || "이름 미상"}
                    </div>
                    <div className={styles.raw}>
                      {m.statement ? m.statement : "모임원"}
                    </div>
                  </div>
                </div>
              ))
            ))}
        </div>

        {/* 정원/현재 인원이 필요하면 표시
        {(capacity || capacity === 0) && (total || total === 0) && (
          <div className={styles.summary}>
            모집 인원: {total}/{capacity}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Member;
