// Floating.jsx
import React, { useState, useEffect } from "react";
import styles from "./Floating.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../common/Modal";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/+$/, "");
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
  withCredentials: false,
});

function Floating({ initialState, onJoined }) {
  const [joinedModalOpen, setJoinedModalOpen] = useState(false); // 가입 성공
  const [failedModalOpen, setFailedModalOpen] = useState(false); // 가입 실패
  const [expiredModalOpen, setExpiredModalOpen] = useState(false); // 로그인 만료
  const [loginModalOpen, setLoginModalOpen] = useState(false); // 로그인 유도

  const navigate = useNavigate();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  const [joinState, setJoinState] = useState("ok");
  const [stateLoading, setStateLoading] = useState(initialState == null);
  const isFull = joinState === "full";
  const isJoined = joinState === "joined";

  useEffect(() => {
    if (initialState == null) return;
    const norm = String(initialState).trim().toLowerCase();
    if (norm === "full") setJoinState("full");
    else if (
      ["joined", "duplicated", "duplecated", "duplacated"].includes(norm)
    )
      setJoinState("joined");
    else setJoinState("ok");
    setStateLoading(false);
  }, [initialState]);

  useEffect(() => {
    if (initialState != null) return;
    let ignore = false;
    (async () => {
      try {
        setStateLoading(true);
        const headers = {};
        if (token) {
          headers.Authorization = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;
        }
        const r = await api.get(`/gather/state/${id}`, { headers });
        const raw = (r?.data?.state || r?.data?.message || "")
          .toString()
          .trim()
          .toLowerCase();

        if (ignore) return;

        if (raw === "full") setJoinState("full");
        else if (
          ["joined", "duplicated", "duplecated", "duplacated"].includes(raw)
        )
          setJoinState("joined");
        else setJoinState("ok");
      } catch (err) {
        const status = err?.response?.status;
        if (!ignore && status === 500) {
          setExpiredModalOpen(true);
          return;
        }
      } finally {
        if (!ignore) setStateLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id, token, initialState, navigate]);

  const fetchJoin = async () => {
    if (submitting) return;

    if (!token) {
      setLoginModalOpen(true);
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const authHeader = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      const res = await api.post(
        `/user/join/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      const msg = (res?.data?.message || "").toString().toLowerCase();

      if (msg === "full") {
        setJoinState("full");
      } else if (
        ["joined", "duplicated", "duplecated", "duplacated"].includes(msg)
      ) {
        setJoinState("joined");
      } else if (res.status >= 200 && res.status < 300) {
        setJoinedModalOpen(true);
        setJoinState("joined");
        onJoined?.();
      } else {
        setFailedModalOpen(true);
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        setLoginModalOpen(true);
        navigate("/login");
      } else if (status === 500) {
        setExpiredModalOpen(true);
      } else {
        setFailedModalOpen(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleExpired = () => {
    setExpiredModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className={styles.floatingBar}>
        <div className={styles.floatingInner}>
          {(() => {
            const btnLabel = submitting
              ? "신청 중..."
              : stateLoading
              ? "상태 확인 중..."
              : isFull
              ? "모집이 마감되었습니다!"
              : isJoined
              ? "이미 참가중인 모임입니다!"
              : "신청하기";
            const isOk = !submitting && !stateLoading && !isFull && !isJoined;
            const btnClass = `${styles.submit} ${
              isOk ? styles.ok : styles.notOk
            }`;

            return (
              <button
                className={btnClass}
                onClick={fetchJoin}
                disabled={submitting || stateLoading || isFull || isJoined}
                aria-busy={submitting || stateLoading}
              >
                {btnLabel}
              </button>
            );
          })()}
        </div>
      </div>
      {/* 성공 모달 */}
      <Modal
        className={null}
        isOpen={joinedModalOpen}
        onClose={() => setJoinedModalOpen(false)}
      >
        <div className={styles.modal_top}>
          <div className={styles.modal_title}>모임에 참여하셨습니다!</div>
          <div className={styles.modal_con}>
            댓글을 통해 멤버들과 소통해보세요!
          </div>
        </div>
        <div className={styles.modal_btn}>
          <button
            type="button"
            autoFocus
            className={styles.modal_ok_btn}
            onClick={() => setJoinedModalOpen(false)}
          >
            확인
          </button>
        </div>
      </Modal>
      {/* 실패 모달 */}
      <Modal
        className={null}
        isOpen={failedModalOpen}
        onClose={() => setFailedModalOpen(false)}
      >
        <div className={styles.modal_title}>가입 실패</div>
        <div className={styles.modal_con}>
          가입에 실패하였습니다. 다시 시도해주세요.
        </div>
        <div className={styles.modal_btn}>
          <button
            type="button"
            autoFocus
            className={styles.modal_ok_btn}
            onClick={() => setFailedModalOpen(false)}
          >
            확인
          </button>
        </div>
      </Modal>
      {/* 로그인 만료 모달 */}
      <Modal
        className={null}
        isOpen={expiredModalOpen}
        onClose={() => setExpiredModalOpen(false)}
      >
        <div className={styles.modal_title}></div>
        <div className={styles.modal_con}>로그인이 만료되었습니다.</div>
        <div className={styles.modal_btn}>
          <button
            type="button"
            autoFocus
            className={styles.modal_ok_btn}
            onClick={handleExpired}
          >
            확인
          </button>
        </div>
      </Modal>
      {/* 로그인 모달 */}
      <Modal
        className={null}
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      >
        <div className={styles.modal_title}></div>
        <div className={styles.modal_con}>로그인 후 이용해주세요.</div>
        <div className={styles.modal_btn}>
          <button
            type="button"
            autoFocus
            className={styles.modal_ok_btn}
            onClick={() => setLoginModalOpen(false)}
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Floating;
