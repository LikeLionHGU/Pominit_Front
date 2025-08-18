import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 465.28px;
  left: 936.58px;
  display: inline-block; /* 트리거 너비 = 래퍼 너비 */
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
`;

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #336DFF;
  background: #fff;
  cursor: pointer;
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

/* Panel */
const Menu = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;            /* ▼ 트리거와 같은 폭 */
  border-radius: 6px;
  background: #fff;
  border: 1px solid #c5c5c5;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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

  /* 선택 상태 */
  background: ${({ $selected }) => ($selected ? "#2F83F3" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  /* hover 시: 선택 안 된 것만 옅은 배경 */
  &:hover {
    background: ${({ $selected }) => ($selected ? "#2F83F3" : "#F5F8FF")};
  }
`;

const OPTIONS = [
  { value: "ratingDesc", label: "높은평점순" },
  { value: "priceAsc",   label: "낮은가격순" },
  { value: "reviewDesc", label: "리뷰많은순" },
];

export default function SortDropdown({
  defaultValue = "ratingDesc",
  onChange,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const ref = useRef(null);

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

  const choose = (v) => {
    setSelected(v);
    setOpen(false);
    onChange?.(v);
  };

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
