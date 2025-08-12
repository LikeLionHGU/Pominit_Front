import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  position: absolute;
  top: 83.45px;
  left: 936.58px;
`;

const Btn = styled.button`
  display: inline-flex;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  border: 1px solid #000;
  background: #fff;
  cursor: pointer;
`;

const Label = styled.div`
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
`;

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  background: rgba(0,0,0,0.06);
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #000;
  background: #fff;
`;


const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;   /* 아래로 16px */
  column-gap: 12px;/* 옆으로 12px (1열이면 영향 없음) */
`;

const MenuItem = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px;
  border:none;
  background-color:white;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
   white-space: nowrap;
  word-break: keep-all;
`;

export default function FilterBox() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setOpen(false);
  };

  return (
    <div ref={ref}>
      <Wrapper>
        <Btn onClick={() => setOpen((prev) => !prev)}>
          <Label>높은 평점 순</Label>
          <IconBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
              <path d="M1 0.724L6 6.724L11 0.724" stroke="#777777" strokeWidth="1.2" />
            </svg>
          </IconBox>
        </Btn>

        {open && (
          <Dropdown>
            <Menu>
              <MenuItem onClick={() => handleSelect("ratingDesc")}>높은 평점 순</MenuItem>
              <MenuItem onClick={() => handleSelect("ratingAsc")}>낮은 평점 순</MenuItem>
              <MenuItem onClick={() => handleSelect("reviewDesc")}>리뷰 많은 순</MenuItem>
            </Menu>
          </Dropdown>
        )}
      </Wrapper>
    </div>
  );
}
