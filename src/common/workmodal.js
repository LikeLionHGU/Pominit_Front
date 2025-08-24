// 공사중 모달
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useEffect } from "react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000; /* 필요시 더 키우기 */
`;

const Wrapper = styled.div`
  display: inline-flex;
  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  max-width: 420px;
  width: calc(100% - 48px);
  text-align: center;
`;

const Title = styled.h2`
  margin-top:12px;
  margin-bottom:0px;
  color: #2F83F3;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 22px;
  font-weight: 700;
`;

const Content = styled.p`
  margin: 0;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const Btn = styled.button`
margin-top:20px;
  cursor: pointer;
  width: 100%;
  padding: 14px 16px;
  border-radius: 6px;
  background: #2F83F3;
 color: #FBFBFB;
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
border:none;
`;

export default function Workmodal({ onClose }) {
  // ESC로 닫기 (선택)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Title>현재 페이지는 공사 중입니다</Title>
        <Content>빠른 시일 내에 멋진 모습으로 찾아뵙겠습니다</Content>
        <Btn type="button" onClick={onClose}>확인</Btn>
      </Wrapper>
    </Overlay>,
    document.body // ← 콤마 필수!
  );
}
