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
            members.map((m) => (
              <div className={styles.memberItem} key={m.id}>
                <div>
                  {/* 이미지가 없으면 기본 아이콘 사용 */}
                  {m.imageUrl ? (
                    <img
                      src={m.imageUrl}
                      alt={m.name}
                      className={styles.memberPic}
                    />
                  ) : (
                    <img src={MEMBER} alt="Pic" className={styles.memberPic} />
                  )}
                </div>
                <div className={styles.memberInfo}>
                  <div className={styles.memName}>{m.name || "이름 미상"}</div>
                  <div className={styles.raw}>
                    {m.statement ? m.statement : "모임원"}
                  </div>
                </div>
              </div>
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
