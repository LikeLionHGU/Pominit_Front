import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  position: absolute;
  top: 371px;
  left: 355px;
`;

const Field = styled.div`
  position: relative; 
  width: 533px;
  height: 46px;
`;

const Bar = styled.input`
display: flex;
width: 533px;
height: 46px;
padding: 11px 16px;
justify-content: space-between;
align-items: center;
flex-shrink: 0;
border-radius: 100px;
border: 1px solid #336DFF;
background: var(--BG-02, #FFF);
 &::placeholder {
    color: #999;
  }
 &:focus {
    outline: none;
  }
`;
const IconBtn = styled.button`
  all: unset;            
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  line-height: 0;        
`;

export default function Searchbar() {
  return (
    <Wrapper>
    <Field>
      <Bar placeholder="검색어를 입력해주세요! (ex. 입문자, 용흥동)" maxLength={28}/>
      <IconBtn aria-label="검색">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
             viewBox="0 0 18 18" fill="none">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M15.1415 8.16975C15.1415 11.9043 11.9941 14.9318 8.11154 14.9318C4.22898 14.9318 1.08154 11.9043 1.08154 8.16975C1.08154 4.43517 4.22898 1.40769 8.11154 1.40769C11.9941 1.40769 15.1415 4.43517 15.1415 8.16975ZM13.2811 14.1826C11.8775 15.3004 10.0761 15.9721 8.11154 15.9721C3.63166 15.9721 0 12.4789 0 8.16975C0 3.86061 3.63166 0.367371 8.11154 0.367371C12.5914 0.367371 16.2231 3.86061 16.2231 8.16975C16.2231 10.2147 15.4052 12.0759 14.0669 13.4672L17.6327 16.8971L16.8679 17.6327L13.2811 14.1826Z"
            fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M0 8.11661C0 3.63045 3.69997 0 8.25627 0C12.8126 0 16.5125 3.63045 16.5125 8.11661C16.5125 10.1721 15.7351 12.0491 14.4546 13.4785L18 16.9624L16.944 18L13.3707 14.4888C11.9642 15.5813 10.1872 16.2332 8.25627 16.2332C3.69997 16.2332 0 12.6028 0 8.11661ZM8.25627 0.416658C3.92299 0.416658 0.416537 3.86752 0.416537 8.11661C0.416537 12.3657 3.92299 15.8166 8.25627 15.8166C10.1562 15.8166 11.8974 15.153 13.2539 14.0494L13.3984 13.9319L16.944 17.4159L17.4056 16.9624L13.8736 13.4916L14.0134 13.3431C15.3066 11.9697 16.096 10.1337 16.096 8.11661C16.096 3.86752 12.5896 0.416658 8.25627 0.416658ZM1.07307 8.11661C1.07307 4.2128 4.29261 1.05444 8.25627 1.05444C12.2199 1.05444 15.4395 4.2128 15.4395 8.11661C15.4395 12.0204 12.2199 15.1788 8.25627 15.1788C4.29261 15.1788 1.07307 12.0204 1.07307 8.11661ZM8.25627 1.47109C4.51563 1.47109 1.4896 4.44987 1.4896 8.11661C1.4896 11.7833 4.51563 14.7621 8.25627 14.7621C11.9969 14.7621 15.0229 11.7833 15.0229 8.11661C15.0229 4.44987 11.9969 1.47109 8.25627 1.47109Z"
            fill="black"/>
        </svg>
      </IconBtn>
    </Field>
  </Wrapper>
  );
}
