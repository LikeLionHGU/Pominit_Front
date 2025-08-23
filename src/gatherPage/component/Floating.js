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

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function Floating() {
  const [joinedModalOpen, setJoinedModalOpen] = useState(false); // 성공 모달
  const [alreadyModalOpen, setAlreadyModalOpen] = useState(false); // 이미 가입 모달
  const [failedModalOpen, setFailedModalOpen] = useState(false); // 실패 모달
  const [loginModalOpen, setLoginModalOpen] = useState(false); // 로그인 요청 모달

  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  // 토큰에서 userId 추출(선택사항)
  useEffect(() => {
    if (!token) return;
    const p = parseJwt(token);
    if (p?.userId || p?.id) setUserId(p.userId || p.id);
  }, [token]);

  const fetchJoin = async () => {
    if (submitting) return;

    // 로그인 가드
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      // Authorization 헤더 자동 보정 (Bearer 접두사 없으면 붙여줌)
      const authHeader = token.startsWith("Bearer ") ? token : { token };

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

      if (res.data.message === "duplicated") {
        setAlreadyModalOpen(true); // 이미 가입 모달
      } else if (res.status >= 200 && res.status < 300) {
        setJoinedModalOpen(true); // 성공 모달
        navigate(`/gather/detail/${id}`);
      } else {
        setFailedModalOpen(true); // 실패 모달
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        setLoginModalOpen(true); // 로그인 만료 모달
        navigate("/login");
      } else {
        console.error("Error joining gather:", error);
        setFailedModalOpen(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.floatingBar}>
        <div className={styles.floatingInner}>
          <button
            className={styles.submit}
            onClick={fetchJoin}
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? "신청 중..." : "신청하기"}
          </button>
        </div>
      </div>
      {/* 성공 모달 */}
      <Modal
        className={null}
        isOpen={joinedModalOpen}
        onClose={() => setJoinedModalOpen(false)}
      >
        <div className={styles.modal_title}></div>
        <div className={styles.modal_con}>모임에 참여하였습니다.</div>
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
      {/* 이미 가입 모달 */}
      <Modal
        className={null}
        isOpen={alreadyModalOpen}
        onClose={() => setAlreadyModalOpen(false)}
      >
        <div className={styles.modal_title}></div>
        <div className={styles.modal_con}>이미 가입된 모임입니다</div>
        <div className={styles.modal_btn}>
          <button
            type="button"
            autoFocus
            className={styles.modal_ok_btn}
            onClick={() => setAlreadyModalOpen(false)}
          >
            확인
          </button>{" "}
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
          </button>{" "}
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
          </button>{" "}
        </div>
      </Modal>
    </>
  );
}

export default Floating;
