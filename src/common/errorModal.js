import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${p => p.$zIndex ?? 2100}; /* Workmodal(2000) 위로 */
`;

const Wrapper = styled.div`
  user-select: none;
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  max-width: 420px;
  width: calc(100% - 48px);
`;

const Title = styled.h2`
  margin: 12px 0 0;
  color: #2F83F3;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.p`
  margin: 0;
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 14px 16px;
  border-radius: 6px;
  border: 1px solid #9fc6f9;
  background: #fff;
  color: #2f83f3;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  user-select: none;
  &:hover { background: #f7fbff; }
  &:active { transform: translateY(1px); }
`;

const GoButton = styled.button`
  flex: 1;
  padding: 14px 16px;
  border-radius: 6px;
  border: 0;
  background: #2f83f3;
  color: #fff;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  &:hover { filter: brightness(0.96); }
  &:active { background: #2b77dd; transform: translateY(1px); }
`;

export default function ERRModal({
  open = true,
  title = "알림",
  description,
  message,
  confirmText = "확인",
  cancelText = "닫기",
  onClose,
  onConfirm,                 // 없으면 기본으로 /login 이동
  children,
  zIndex = 2100,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const firstBtnRef = useRef(null);

  // ✨ 닫기(취소)=로그아웃 함수
  const handleCancel= useCallback(() => {
    try {
      localStorage.removeItem("token");          // ✨ access token 삭제
      localStorage.removeItem("refreshToken");   // ✨ 있으면 함께 삭제 (없으면 무시)
    } catch {}
    onClose?.();                                  // ✨ 모달 닫기 
  setTimeout(() => window.location.reload(), 0);
}, [onClose]);
  // ESC 닫기 + 첫 버튼 포커스
  useEffect(() => {
    if (!open) return;
    firstBtnRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && handleCancel(); // ✨ ESC도 로그아웃처럼 동작
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleCancel]); // ✨ onClose 의존성 제거, handleCancel 내부에서 처리

  if (!open) return null;

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  const bodyText = description ?? message ?? "";

  return createPortal(
    <Overlay $zIndex={zIndex} onClick={handleCancel}> {/* ✨ 바깥 클릭도 로그아웃 */}
      <Wrapper
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <Title id="login-modal-title">{title}</Title>
        {children ? (
          children
        ) : (
          <Content id="login-modal-desc">{bodyText}</Content>
        )}
        <ButtonRow>
          <CancelButton
            type="button"
            onClick={handleCancel}          
            ref={firstBtnRef}
          >
            {cancelText}
          </CancelButton>
          <GoButton type="button" onClick={handleConfirm}>
            {confirmText /* = 로그인 */}
          </GoButton>
        </ButtonRow>
      </Wrapper>
    </Overlay>,
    document.body
  );
}
