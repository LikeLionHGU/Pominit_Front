import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Dropbox from "./dropbox"; 

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
  <ArrowIcon xmlns="http://www.w3.org/2000/svg" width="12" height="8"
             viewBox="0 0 12 8" fill="none" aria-hidden>
    <path d="M1 0.724L6 6.724L11 0.724" strokeWidth="1.2" />
  </ArrowIcon>
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
