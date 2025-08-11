import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dropbox from "./dropbox"; 

const Anchor = styled.div`
  position: absolute;
  top: 83.45px;
  left: 180px;
  z-index: 20;
`;

const Btn = styled.button`
  display: inline-flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: #c5c5c5;
  border: none;
  cursor: pointer;
`;

const Label = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  white-space: nowrap;
`;

const IconBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 8px); 
  left: 0;
`;

export default function TypeBtn() {
  const [open, setOpen] = useState(false);
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

  return (
    <Anchor ref={ref}>
      <Btn onClick={() => setOpen((prev) => !prev)}>
        <Label>포항 레포츠 종류</Label>
        <IconBox>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 0.724L6 6.724L11 0.724"
              stroke="#777777"
              strokeWidth="1.2"
            />
          </svg>
        </IconBox>
      </Btn>

      {open && (
        <Popover>
          <Dropbox onSelect={() => setOpen(false)} />
        </Popover>
      )}
    </Anchor>
  );
}
