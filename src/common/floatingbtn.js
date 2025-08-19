import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  user-select: none;
  position: fixed;
  bottom: 30px;
  right: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;

  display: inline-flex;
  padding: 28px 24px;
  align-items: center;
  gap: 12px;
  border-radius: 100px;
  background: #ffecf1;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
  color: #ff517e;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;

  /* 텍스트 줄바꿈/넘침 제어 */
  white-space: nowrap;
  overflow: hidden;

  /* 포커스 접근성 (키보드 접근 대비) */
  &:focus-visible {
    outline: 2px solid #ff658c;
    outline-offset: 2px;
  }
`;

const Expand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  /* 닫힘 상태: 폭 0 + 투명 → 내용 숨김 */
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateX(8px);

  /* 부드러운 전환 */
  transition:
    max-width 260ms ease,
    opacity 200ms ease 60ms,
    transform 200ms ease 60ms;

  &[data-open="true"] {
    max-width: 540px;   
    opacity: 1;
    transform: translateX(0);
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: #fff;
  color: #ff517e;
  font-size: 14px;
  font-weight: 600;
`;

const Action = styled.button`

display: flex;
padding: 10px 32px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 100px;
background: #FF658C;
  border: 0;
color: #FBFBFB;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
  cursor: pointer;

  &:hover { filter: brightness(0.95); }
  &:active { transform: translateY(1px); }
`;

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true">
    <rect y="24.7764" width="24" height="24" rx="12" transform="rotate(-90 0 24.7764)" fill="#FF658C"/>
    <path d="M14 7.77637L9 12.7764L14 17.7764" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 홈(/)에서는 버튼 숨김 (네 로직 유지)
  if (location.pathname === "/") return null;

  // 클릭으로 열림/닫힘 토글
  const toggle = () => setOpen(v => !v);

  // 내부 액션 버튼 클릭 시 비교 페이지로 이동 (부모 클릭 토글 방지)
  const goCompare = (e) => {
    e.stopPropagation();
    navigate("/compare");
  };

  // 접근성: 키보드 Enter/Space로도 토글
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <Wrapper
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={open ? "비교함 패널 닫기" : "비교함 패널 열기"}
      onClick={toggle}
      onKeyDown={onKey}
    >
      <Icon />
      {!open && "비교함"} 
      
      <Expand data-open={open}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <rect y="24.4473" width="24" height="24" rx="12" transform="rotate(-90 0 24.4473)" fill="#FF658C"/>
  <path d="M10.5 17.4473L15.5 12.4473L10.5 7.44727" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        <Action onClick={goCompare}>비교하기</Action>
      </Expand>
    </Wrapper>
  );
  
}
