import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 465.28px;
  left: 959.58px;
  display: inline-block; 
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  z-index: 1000;  
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
 border-radius: 6px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
  cursor: pointer;

    &:hover {
    border-radius: 6px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
  }
&:focus{
border-radius: 6px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
}

&:active{
border-radius: 6px;
border: 1px solid var(--Foundation-main-blue-500, #2F83F3);
background: #FFF;
}
`;

const LabelFocus = styled.span`
  color: #000;
  font-size: 14px;
  line-height: 140%;
`;

const Caret = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden>
    <path d="M1 1.27637L6 7.27637L11 1.27637" stroke="#777777" strokeWidth="1.2" />
  </svg>
);

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;         
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1000;  
`;

const MenuList = styled.div`
  display: grid;
`;

const Item = styled.button`
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 0;
  cursor: pointer;

  background: ${({ $selected }) => ($selected ? "#2F83F3" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  &:hover {
    background: ${({ $selected }) => ($selected ? "#2F83F3" : "#EAF3FE")};
  }
`;
export default function FilterBox({
  value,            //부모가 주는 현재 선택값
  defaultValue = 0, // 초기 선택값
  onChange,         // 선택 변경 시 부모에게 알려줄 콜백
  options,          
  style,           
}){

  //외부 options가 오면 대체 가능하게 기본값 정의해둠.
  const OPTIONS = [
    { value: 0, label: "높은평점순" },
    { value: 1,   label: "낮은가격순" },
    { value: 2, label: "리뷰많은순" },
  ];

  const [open, setOpen] = useState(false); //드롭다운 열림/닫힘

  //부모 컴포넌트가 value를 직접 내려주면 컨트롤드 모드 (내부적으로 상태를 들고 있지 않고 부모가 주는 값만 그대로 씀)
  const isControlled = value !== undefined && value !== null;

  //언 컨트롤드 모드일 때 쓸 내부 상태
  const [innerSelected, setInnerSelected] = useState(defaultValue);
 
 //실제 로직에 쓸 최종 선택값
 //컨트롤드 -> 부모가 준 value 사용
 //언컨트롤드 -> 내부에서 관리하는 innerSelected 사용함
  const selected = isControlled ? value : innerSelected;

  const ref = useRef(null); //DOM 참조, 외부 클릭/ 포커스 제어
  
  /*드롭다운 바깥 클릭했을때 닫는 기능 */
  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  /* 선택 동작 처리, 선택된 값으로 라벨 바꾸기 */
  const choose = (v) => {
    console.debug("[FilterBox] onChange ->", v, labelOf(v));
    if (!isControlled) setInnerSelected(v); //언컨트롤드 모드일때만 내부 상태를 직접 변경
    onChange?.(v); //부모 컴포넌트에게 선택된 값 알림
    setOpen(false); //선택끝나면 드롭다운 닫기
  };
  // value를 문자열 label로 변환
  function labelOf(v) {
    const found = OPTIONS.find(o => o.value === v);
    return found ? found.label : v;
  }
  const current = OPTIONS.find((o) => o.value === selected) || OPTIONS[0];

  return (
    <Wrapper ref={ref} style={style}>
      <Trigger
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
      >
        <LabelFocus>{current.label}</LabelFocus>
        <Caret />
      </Trigger>

      {open && (
        <Menu role="menu" aria-label="정렬 선택">
          <MenuList>
            {OPTIONS.map((opt) => (
              <Item
                key={opt.value}
                role="menuitemradio"
                aria-checked={selected === opt.value}
                $selected={selected === opt.value}
                onClick={() => choose(opt.value)}
              >
                {opt.label}
              </Item>
            ))}
          </MenuList>
        </Menu>
      )}
    </Wrapper>
  );
}
