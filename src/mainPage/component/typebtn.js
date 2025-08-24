import React, { useState, useRef, useEffect, useMemo } from "react";
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

&:hover{
border-radius: 100px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
}

&:active{
border-radius: 100px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
}
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
   transition: transform 180ms ease;
 transform-origin: 50% 50%;
 transform: rotate(${p => (p.$open ? 180 : 0)}deg);
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

border-radius: 100px;
border: 1px solid var(--Foundation-main-blue-100, #BFD9FB);
background: ;
border-radius: 100px;

 &:hover {
    border-radius: 100px;
border: 1px solid var(--Foundation-main-blue-100, #BFD9FB);
background: var(--Foundation-main-blue-50, #EAF3FE);
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
const Panel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(140px, 1fr));
  gap: 12px 12px;
  padding: 16px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
`;
/**
 * props:
 *  - value: string (현재 선택된 sport 코드, "" = 전체)
 *  - onChange: (v: string) => void
 */

//value 기본값은 빈 문자열, onChange는 선택 변경시 메인페이지에 알려주기 위한 함수
export default function TypeBtn({ value = "", onChange }) {
  const DEFAULT_LABEL = "포항 레포츠 종류"; //아무것도 선택되지 않았을 때 버튼에 보여줄 기본 문구

  // 백엔드에 보낼 코드(value)와 표시 라벨(label) 매핑
  const OPTIONS = useMemo(() => ([
    { label: "전체 보기",   value: "" },
    { label: "요트",       value: "요트" },
    { label: "딩기요트",   value: "딩기요트" },
    { label: "서핑/윈드서핑", value: "서핑" },
    { label: "스킨스쿠버", value: "스킨스쿠버" },
    { label: "프리다이빙", value: "프리다이빙" },
    { label: "스노클링",   value: "스노클링" },
    { label: "카약/카누",  value: "카약/카누" },
    { label: "조정",       value: "조정" },
  ]), []); //label은 버튼에 보여줄 이름, value는 백엔드에 보낼 코드

  const ref = useRef(null); //바깥 클릭 감지에 사용
  const [open, setOpen] = useState(false); //드롭다운 열려 있는지 여부

  // 현재 value로 표시할 라벨 == 버튼에 보여줄 현재 선택된 문구
  const currentLabel =
    OPTIONS.find(o => o.value === value)?.label ?? DEFAULT_LABEL;
    //현재 value와 일치하는 옵션 찾아서 label을 가져옴 없으면 디폴트 라벨 표시


  /*드롭다운 열려 있을때 닫는 로직 */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleSelect = (nextValue) => {
    // 콘솔 확인용

    onChange?.(nextValue);         // 부모(MainPage)로 전달
    setOpen(false);
  };

  return (
    <Anchor ref={ref}>
      <Btn onClick={() => setOpen(p => !p)} aria-expanded={open}>
        <Label>{value ? currentLabel : DEFAULT_LABEL}</Label>
        <IconBox>
          <ArrowIcon  $open={open}  xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
            <path d="M1 0.724L6 6.724L11 0.724" strokeWidth="1.2" />
          </ArrowIcon>
        </IconBox>
      </Btn>

      {open && (
        <Popover role="menu" aria-label="종목 선택">
          <Panel>
            {OPTIONS.map(opt => (
              <Item
                key={opt.value || "ALL"}
                role="menuitemradio"
                aria-checked={value === opt.value}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </Item>
            ))}
          </Panel>
        </Popover>
      )}
    </Anchor>
  );
}
