import { createPortal } from "react-dom";
import Xbox from "../asset/img/xbox.svg";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState, useMemo } from "react";
// eslint-disable-next-line
import Modal from "../common/loginmodal";
import ErrModal from "../common/errorModal";


const Wrapper = styled.div`
  position: relative; 
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
  top: 20px; 
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
  z-index: 2000; 
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

  color: #cad0d7;
  svg path {
    fill: currentColor;
  }
`;

const StarGroup = styled.div`
  display: grid;
  grid-auto-flow: column; 
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


  border: 1px solid
    ${({ $state }) =>
      $state === "done"
        ? "#D1D5DB" 
        : $state === "typing"
        ? "#2F83F3" 
        : "#D1D5DB"}; 

  background: ${({ $state }) =>
    $state === "done"
      ? "#F5F5F5"
      : $state === "typing"
      ? "#F9FBFF"
      : "#E7E9EC"}; 
  &:focus {
    border: 1px solid #2f83f3; 
    background: #f9fbff;
    outline: none;
  }

  &::placeholder {
    color: #999;
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
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [submitting, setSubmitting] = useState(false);


  const hasText = text.trim().length > 0;


   const [showLoginModal, setShowLoginModal] = useState(false); 

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
    if (!hasText || submitting) return; 
    if (!rating || rating < 1) {
      return;
    }
    setSubmitted(true);
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${API_BASE_URL}/user/review`; 
      const body = {
        id: id,
        content: text.trim(), 
        score: rating, 
      };

  


      await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
        timeout: 15000,
      });

      if (typeof onSuccess === "function") onSuccess();
      else onClose();
    } catch (err) {
  
      setSubmitted(false);
      const status = err?.response?.status;

      if (status === 500) {            
                   
        setShowLoginModal(true);       
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
              onClick={() => setRating(n)} 
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
          value={text} 
          onChange={(e) => setText(e.target.value)}
          $state={state}
          disabled={submitting}
        />

        <Btn
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit} 
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
    document.body 
        )}

  
   {showLoginModal && (
  <ErrModal
    open
    onClose={() => setShowLoginModal(false)}
    title="세션이 만료되었습니다"
    description={"다시 로그인 해주세요"}
    confirmText="로그인 하기"
    cancelText="닫기"
    zIndex={2100}
  />
)}


    </>
  );
}