import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";


const Anchor = styled.div`
  position: absolute;
  top: 371px;
  left: 180px;
  z-index: 20;
`;

const Btn = styled.button`
 display: inline-flex;
padding: 12px 16px;
align-items: center;
border-radius: 100px;
border: 1px solid #336DFF;
background: #FFF;
cursor: pointer;
`;

const Label = styled.span`
  color: #2F83F3;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%;
width: 105px;
  white-space: nowrap;
`;

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  padding-right: 0;
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px); 
  left: 0;
`;

const ArrowIcon = styled.svg`
  stroke: #336DFF;
`;

/* ======= 드롭박스 (스타일 변경 없음) ======= */
const Wrapper = styled.div`
 display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr)); 
  column-gap: 12px; 
  row-gap: 16px;  
  padding: 16px;
 border-radius: 12px;
background: #FFF;
box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.15);
`;

const Item = styled.div`
user-select: none;     
color: #2F83F3;
display: flex;
 justify-content: center;
  align-items: center;
padding: 12px 16px;
align-items: left;
gap: 6px;

border: 1px solid transparent;
border-radius: 100px;
background: ;
border-radius: 100px;

 &:hover {
    border-color: #2F83F3;
     cursor: pointer;
  }

  &:active {
    background: #2F83F3;
    color:white;
  }

  font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */

`;

/* 내부 컴포넌트: onSelect(label)로 선택값 전달 */
function Dropbox({ onSelect }) {
  return (
    <div>
      <Wrapper>
        <Item onClick={() => onSelect("전체 보기")}>전체 보기</Item>
        <Item onClick={() => onSelect("요트")}>요트</Item>
        <Item onClick={() => onSelect("딩기요트")}>딩기요트</Item>
        <Item onClick={() => onSelect("서핑/윈드서핑")}>서핑/윈드서핑</Item>
        <Item onClick={() => onSelect("스킨스쿠버")}>스킨스쿠버</Item>
        <Item onClick={() => onSelect("프리다이빙")}>프리다이빙</Item>
        <Item onClick={() => onSelect("스노클링")}>스노클링</Item>
        <Item onClick={() => onSelect("카약/카누")}>카약/카누</Item>
        <Item onClick={() => onSelect("조정")}>조정</Item>
      </Wrapper>
    </div>
  );
}

/* ======= 최상위 컴포넌트 ======= */
export default function TypeBtn() {
  const DEFAULT_LABEL = "포항 레포츠 종류";
  const [open, setOpen] = useState(false);
  const [labelText, setLabelText] = useState(DEFAULT_LABEL); // ← 버튼 라벨 상태
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 드롭다운 항목 선택 시: 라벨 업데이트 + 닫기
  const handleSelect = (value) => {
    setLabelText(value === "전체 보기" ? DEFAULT_LABEL : value);
    setOpen(false);
  };

  return (
    <Anchor ref={ref}>
      <Btn onClick={() => setOpen((prev) => !prev)}>
        <Label>{labelText}</Label>
        <IconBox>
          <ArrowIcon xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
            <path d="M1 0.724L6 6.724L11 0.724" strokeWidth="1.2" />
          </ArrowIcon>
        </IconBox>
      </Btn>

      {open && (
        <Popover>
          <Dropbox onSelect={handleSelect} />
        </Popover>
      )}
    </Anchor>
  );
}
