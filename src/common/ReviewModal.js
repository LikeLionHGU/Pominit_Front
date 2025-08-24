import { createPortal } from "react-dom";
import Xbox from "../asset/img/xbox.svg";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useMemo } from "react";
// eslint-disable-next-line
import Modal from "../common/loginmodal";
import ErrModal from "../common/errorModal";

// 스타일 수정
const Wrapper = styled.div`
  position: relative; /* ⭐ 자식 절대배치 기준 */
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  max-width: 420px;
  width: calc(100% - 48px);
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
`;

const Xboxd = styled.div`
  position: absolute;
  top: 20px; /* ⭐ 오른쪽 상단 */
  right: 12px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000; /* 필요시 더 키우기 */
  user-select: none;
`;

const Title = styled.h2`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 0px;
  margin-bottom: 28px;
`;

const Q1 = styled.p`
  text-align: left;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Q2 = styled.p`
  text-align: left;
  margin-top: 24px;
  margin-bottom: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const Star = styled.div`
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  line-height: 0;
  /* 색 제어를 하려면 이렇게 */
  color: #cad0d7;
  svg path {
    fill: currentColor;
  }
`;

const StarGroup = styled.div`
  display: grid;
  grid-auto-flow: column; /* 칸을 가로로 흐르게 */
  gap: 8px;
  svg {
    display: block;
  }
  align-items: center;
  grid-auto-columns: 24px;
  margin-bottom: 12px;
`;
const TextArea = styled.textarea`
  width: 100%;
  min-height: 260px;
  padding: 14px 20px;
  border-radius: 6px;
  box-sizing: border-box;
  resize: vertical;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  line-height: 1.4;

  /* 상태별 테두리/배경 */
  border: 1px solid
    ${({ $state }) =>
      $state === "done"
        ? "#D1D5DB" /* ✅ 완료 → 연회색 테두리 */
        : $state === "typing"
        ? "#2F83F3" /* ✅ 입력 중 → 파란색 테두리 */
        : "#D1D5DB"}; /* ✅ 기본 → 연회색 테두리 */

  background: ${({ $state }) =>
    $state === "done"
      ? "#F5F5F5" /* ✅ 완료 → 연회색 배경 */
      : $state === "typing"
      ? "#F9FBFF" /* ✅ 입력 중 → 아주 옅은 파랑 */
      : "#E7E9EC"}; /* ✅ 기본 → 연회색 배경 */

  &:focus {
    border: 1px solid #2f83f3; /* 포커스 시 파란색 */
    background: #f9fbff;
    outline: none; /* 포커스 시 옅은 파랑 */
  }

  &::placeholder {
    color: #999; /* 플레이스홀더 글씨 회색 */
  }
`;

const Btn = styled.button`
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  border-radius: 6px;
  background: #2f83f3;
  color: #fbfbfb;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  &:active {
    background: #2b77dd;
  }
  &:disabled {
    background: #cad0d7;
  }
`;

export default function Workmodal({ id, onClose, onSuccess }) {
  console.log("[Workmodal render] id:", id);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [submitting, setSubmitting] = useState(false);

  // 상태 계산
  const hasText = text.trim().length > 0;

   // ✨ 500 에러 시 LoginModal 열기 위한 상태 추가
   const [showLoginModal, setShowLoginModal] = useState(false); // ✨
  // ✅ 버튼 활성화 조건: 텍스트 있고, 별점 1~5, 전송 중 아님
  const canSubmit = useMemo(
    () => hasText && rating >= 1 && rating <= 5 && !submitting,
    [hasText, rating, submitting]
  );

  const state = useMemo(
    () => (submitted ? "done" : hasText ? "typing" : "idle"),
    [submitted, hasText]
  );

  // ESC로 닫기 (선택)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onSubmit = async () => {
    if (!hasText || submitting) return; // 빈 값/중복 방지
    if (!rating || rating < 1) {
      alert("별점을 선택해 주세요.");
      return;
    }
    setSubmitted(true);
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE_URL}/user/review`; // ← 백엔드 엔드포인트에 맞게 수정
      const body = {
        id: id,
        content: text.trim(), // ← 또는 centerId/center_id 등 서버 스펙에 맞추세요
        score: rating, // ← 서버 필드명: score/rating 등
      };

      // 디버깅용 로그
      console.groupCollapsed("[REVIEW] POST", url);
      console.log("payload:", body);
      console.groupEnd();

      /*
            const back = raw?.replace(/^Bearer\s+/i, "");

await axios.post(url, body, {
  headers: {
    "Content-Type": "application/json",
    ...(back ? { Authorization: back } : {}), // ✅ 접두어 없이 그대로
  },
  withCredentials: true,
  timeout: 15000,
});
*/
      console.log(token);
      await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          // ✅ 'Bearer ' 접두어가 없으면 붙여서 보냄
          //   ...(token ? { authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } : {}),
        },
        withCredentials: true,
        timeout: 15000,
      });

      if (typeof onSuccess === "function") onSuccess();
      else onClose();
    } catch (err) {
      // 실패했으니 완료 상태 되돌리기
      setSubmitted(false);
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        `리뷰 등록에 실패했습니다. (status: ${status ?? "unknown"})`;
      console.error("[REVIEW] error:", err?.response ?? err);

      if (status === 500) {            // ✨
                   // ✨
        setShowLoginModal(true);       // ✨
      } else {
        alert(msg);
      }




    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {createPortal(
        <Overlay onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Xboxd onClick={onClose} aria-label="닫기">
          <img src={Xbox} alt="닫기" />
        </Xboxd>
        <Title>리뷰 작성</Title>
        <Q1>강습소는 어떠셨나요?</Q1>
        <StarGroup>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              onClick={() => setRating(n)} // ⭐ 클릭 시 rating 업데이트
              style={{
                cursor: "pointer",
                color: rating >= n ? "#FF517E" : "#CAD0D7",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
              >
                <path d="M12 0L15.6678 6.95173L23.4127 8.2918L17.9346 13.9283L19.0534 21.7082L12 18.24L4.94658 21.7082L6.06541 13.9283L0.587322 8.2918L8.33222 6.95173L12 0Z" />
              </svg>
            </Star>
          ))}
        </StarGroup>
        <Q2>후기를 적어주세요</Q2>
        <TextArea
          placeholder={`강습소와 관련하여 만족스러웠던 점이나,
강사님의 강습 방식, 강습소 주변 시설 등에 대해 남겨주세요.`}
          value={text} // ✅ 바인딩
          onChange={(e) => setText(e.target.value)}
          $state={state}
          disabled={submitting}
        />

        <Btn
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit} // ✅ 비활성화
          aria-disabled={!canSubmit}
          title={
            !hasText
              ? "후기를 입력해 주세요"
              : rating < 1
              ? "별점을 선택해 주세요"
              : ""
          }
        >
          등록하기
        </Btn>
      </Wrapper>
    </Overlay>,
    document.body // ← 콤마 필수!
        )}

   {/* ✨ 500 에러 시 LoginModal 표시 */}
   {showLoginModal && (
  <ErrModal
    open
    onClose={() => setShowLoginModal(false)}
    title="세션이 만료되었습니다"
    description={"다시 로그인 해주세요"}
    confirmText="로그인 하기"
    cancelText="닫기"
    // onConfirm 안 주면 기본 동작: /login 이동
    zIndex={2100}
  />
)}


    </>
  );
}