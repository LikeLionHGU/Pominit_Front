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
border-radius: 6px;
border: 1px solid #336DFF;
background: rgba(255, 255, 255, 0.85);
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
  padding-left: 8px;
`;

const Dropdown = styled.div`
  position: absolute;
  background-color:white;
  top: calc(100% + 6px);
  left: 0;
  padding: 8px 12px;
  padding-top:0px;
  padding-bottom:0px;
  border-radius: 6px;
border: 1px solid var(--Foundation-White-white-600, #C5C5C5);
box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12);
`;


const Menu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const MenuItem = styled.button`
  display: inline-flex;
  padding: 8px 15px;
  padding-left:0px;
  border:none;
  background-color:white;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
   white-space: nowrap;
  word-break: keep-all;
`;

const MenuItemLabel = styled.span`
  padding-top: 3px;
  padding-bottom: 3px;
  color: ${({ selected }) => (selected ? "#2F83F3" : "#000")}; /* 선택 시 색 변경 */
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
`;

export default function FilterBox() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("ratingDesc");
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div ref={ref}>
      <Wrapper>
        <Btn onClick={() => setOpen((prev) => !prev)}>
          <Label>높은평점순</Label>
          <IconBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
              <path d="M1 0.724L6 6.724L11 0.724" stroke="#777777" strokeWidth="1.2" />
            </svg>
          </IconBox>
        </Btn>

        {open && (
          <Dropdown>
            <Menu>
              <MenuItem onClick={() => handleSelect("ratingDesc")}>
                <MenuItemLabel selected={selected === "ratingDesc"}>
                  높은평점순
                </MenuItemLabel>
              </MenuItem>
              <MenuItem onClick={() => handleSelect("ratingAsc")}>
                <MenuItemLabel selected={selected === "ratingAsc"}>
                  낮은평점순
                </MenuItemLabel>
              </MenuItem>
              <MenuItem onClick={() => handleSelect("reviewDesc")}>
                <MenuItemLabel selected={selected === "reviewDesc"}>
                  리뷰많은순
                </MenuItemLabel>
              </MenuItem>
            </Menu>
          </Dropdown>
        )}
      </Wrapper>
    </div>
  );
}
