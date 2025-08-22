import React, { useEffect, useRef } from "react";
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
  z-index: 2000;
`;

const Wrapper = styled.div`
 user-select:none;
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0 4px 4px rgba(0,0,0,0.25);
  max-width: 420px;
  width: calc(100% - 48px);
`;

const Title = styled.h2`
  margin: 12px 0 0;
  color: #2F83F3;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.p`
  margin: 0;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
  width: 100%;
`;

const CancelButton = styled.button`
  flex: 1;
  width: 184px;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #9FC6F9;
  background: #FFF;
  color: #2F83F3;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  outline:none;
  user-select:none;
  &:hover { background: #F7FBFF; }
  &:active { transform: translateY(1px); }
`;

const GoButton = styled.button`
 user-select:none;
  flex: 1;
  width: 184px;
  padding: 16px;
  border-radius: 6px;
  border: 0;
  background: #2F83F3;
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover { filter: brightness(0.96); }
  &:active { background: #2B77DD; transform: translateY(1px); }
`;

export default function LoginModal({
  open = true,
  title = "로그인이 필요해요",
  description = "로그인하셔야 본 서비스를 이용하실 수 있습니다",
  confirmText = "로그인 하기",
  cancelText = "취소",
  onClose,
  onConfirm, // 없으면 기본으로 /login 이동
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const firstBtnRef = useRef(null);

  // 포커스 & ESC 닫기
  useEffect(() => {
    if (!open) return;
    firstBtnRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    if (typeof onConfirm === "function") {
      onConfirm();
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  return createPortal(
    <Overlay onClick={onClose}>
      <Wrapper
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <Title id="login-modal-title">{title}</Title>
        <Content id="login-modal-desc">{description}</Content>

        <ButtonRow>
          <CancelButton
            type="button"
            onClick={onClose}
            ref={firstBtnRef}
          >
            {cancelText}
          </CancelButton>
          <GoButton type="button" onClick={handleConfirm}>
            {confirmText}
          </GoButton>
        </ButtonRow>
      </Wrapper>
    </Overlay>,
    document.body
  );
}
