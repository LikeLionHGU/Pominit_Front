import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  user-select: none;
  position: fixed;
  bottom: 30px;
  right: 40px;
  z-index: 1000;

  display: inline-flex;
  padding: 13px 24px;
  align-items: center;
  gap: 12px;
  border-radius: 100px;
  background: #ffecf1;
  box-shadow: 0 4px 4px rgba(0,0,0,0.12);
  color: #ff517e;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  white-space: nowrap;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid #ff658c;
    outline-offset: 2px;
  }

  /* 닫힘 상태: 전체가 클릭 영역 → 포인터 표시 */
  &[data-open="false"] { cursor: pointer; }

  /* 열림 상태: 기본 커서, 아이콘만 포인터 */
  &[data-open="true"] {
    cursor: default;
    svg { cursor: pointer; }
  }
`;

const Expand = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateX(8px);
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

const Action = styled.button`
  display: flex;
  padding: 10px 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: #ff658c;
  border: 0;
  color: #fbfbfb;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;

  &:hover { filter: brightness(0.95); }
  &:active { transform: translateY(1px); }
`;

const C1 = styled.div`
  position: relative;
  width: 96px;
  height: 54px;
  border-radius: 6px;
  border: 1px dashed #ff658c;
  background: #fff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 4px;
  background: #c9c9c9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);

  &:hover { background: #bebebe; }
  &:active { transform: translateY(1px); }

  svg { width: 14px; height: 14px; display: block; }
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

  if (location.pathname === "/") return null;

  const toggle = () => setOpen(v => !v);

  const goCompare = (e) => {
    e.stopPropagation();         // 부모 Wrapper 토글 방지
    navigate("/compare");
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  // 각 카드의 삭제 버튼
  const handleRemove = (e, idx) => {
    e.stopPropagation();         // Wrapper 토글 방지
    // TODO: 실제 삭제 로직
    console.log("remove index:", idx);
  };

  return (
    <Wrapper
      data-open={open}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={open ? "비교함 패널 닫기" : "비교함 패널 열기"}
      onClick={toggle}
      onKeyDown={onKey}
    >
      {!open && <Icon />}
      {!open && "비교함"}

      <Expand data-open={open} onClick={(e) => e.stopPropagation()}>
        {/* 오른쪽 화살표 (열림 상태) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={toggle} aria-label="패널 닫기">
          <rect y="24.4473" width="24" height="24" rx="12" transform="rotate(-90 0 24.4473)" fill="#FF658C"/>
          <path d="M10.5 17.4473L15.5 12.4473L10.5 7.44727" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* 카드 1 */}
        <C1>
          <CloseButton onClick={(e) => handleRemove(e, 0)} aria-label="삭제">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5 L15 15 M15 5 L5 15"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CloseButton>
        </C1>

        {/* 카드 2 */}
        <C1>
          <CloseButton onClick={(e) => handleRemove(e, 1)} aria-label="삭제">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5 L15 15 M15 5 L5 15"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CloseButton>
        </C1>

        {/* 카드 3 */}
        <C1>
          <CloseButton onClick={(e) => handleRemove(e, 2)} aria-label="삭제">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M5 5 L15 15 M15 5 L5 15"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CloseButton>
        </C1>

        <Action onClick={goCompare}>비교하기</Action>
      </Expand>
    </Wrapper>
  );
}
