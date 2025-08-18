import styled from "styled-components";
import { useState } from "react";
const SidebarWrap = styled.div`
  transform: translateX(-16px); 
  user-select: none;
`;
const Icon = styled.div`
  width: 16px;
  height: 15px;
  flex-shrink: 0;
  opacity: 0.9;
  svg path {
    fill: ${({ active }) => (active ? "#fff" : "#B7D8F7")};
  }
`;


const Backbtn = styled.div`
  position: relative;
  width: 153px;
  height: 186px;
  flex-shrink: 0;
`;

const BtnGroup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const Btn = styled.button`
  width: 131px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 7px;

  /* 선택 상태에 따라 배경/글자색 */
  background: ${({ active }) => (active ? "#2F83F3" : "white")};
  color: ${({ active }) => (active ? "#fff" : "black")};

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;

  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 19px;

  &:last-of-type {
    margin-bottom: 24px;
  }
`;

const Banner = styled.div`
margin-left:15px;
margin-top:37px;
 width: 153px;
height: 260px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #c5c5c5;
`;

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0); // 기본 선택 인덱스

  return (
    <div>
      <SidebarWrap>
        <Backbtn>
        <svg xmlns="http://www.w3.org/2000/svg" width="183" height="216" viewBox="0 0 183 216" fill="none">
  <g filter="url(#filter0_d_593_1082)">
    <rect x="15" y="11" width="153" height="186" rx="12" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_d_593_1082" x="0" y="0" width="183" height="216" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="7.5"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_593_1082"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_593_1082" result="shape"/>
    </filter>
  </defs>
</svg>

          {/* 버튼을 Backbtn 위에 겹치게 */}
          <BtnGroup>
            {/* 홈 */}
            <Btn active={activeIndex === 0} onClick={() => setActiveIndex(0)}>
              <Icon active={activeIndex === 0}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                  {/* fill 속성 제거! */}
                  <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
                </svg>
              </Icon>
              홈
            </Btn>

            {/* 모임 */}
            <Btn active={activeIndex === 1} onClick={() => setActiveIndex(1)}>
              <Icon active={activeIndex === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
                  <path opacity="0.9" d="M12.9545 5.14286C14.3882 5.14286 15.5368 3.99429 15.5368 2.57143C15.5368 1.14857 14.3882 0 12.9545 0C11.5209 0 10.3636 1.14857 10.3636 2.57143C10.3636 3.99429 11.5209 5.14286 12.9545 5.14286ZM6.04545 5.14286C7.47909 5.14286 8.62773 3.99429 8.62773 2.57143C8.62773 1.14857 7.47909 0 6.04545 0C4.61182 0 3.45455 1.14857 3.45455 2.57143C3.45455 3.99429 4.61182 5.14286 6.04545 5.14286ZM6.04545 6.85714C4.03318 6.85714 0 7.86 0 9.85714V11.1429C0 11.6143 0.388636 12 0.863636 12H11.2273C11.7023 12 12.0909 11.6143 12.0909 11.1429V9.85714C12.0909 7.86 8.05773 6.85714 6.04545 6.85714ZM12.9545 6.85714C12.7041 6.85714 12.4191 6.87429 12.1168 6.9C12.1341 6.90857 12.1427 6.92571 12.1514 6.93429C13.1359 7.64571 13.8182 8.59714 13.8182 9.85714V11.1429C13.8182 11.4429 13.7577 11.7343 13.6627 12H18.1364C18.6114 12 19 11.6143 19 11.1429V9.85714C19 7.86 14.9668 6.85714 12.9545 6.85714Z"/>
                </svg>
              </Icon>
              모임
            </Btn>

            {/* 챌린지 */}
            <Btn active={activeIndex === 2} onClick={() => setActiveIndex(2)}>
              <Icon active={activeIndex === 2}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                  <path opacity="0.9" d="M6.66667 14.2222V11.4667C5.98611 11.3037 5.37847 10.9963 4.84375 10.5444C4.30903 10.0926 3.91667 9.52593 3.66667 8.84444C2.625 8.71111 1.75347 8.22593 1.05208 7.38889C0.350694 6.55185 0 5.57037 0 4.44444V3.55556C0 3.06667 0.163194 2.64815 0.489583 2.3C0.815972 1.95185 1.20833 1.77778 1.66667 1.77778H3.33333C3.33333 1.28889 3.49653 0.87037 3.82292 0.522222C4.14931 0.174074 4.54167 0 5 0H10C10.4583 0 10.8507 0.174074 11.1771 0.522222C11.5035 0.87037 11.6667 1.28889 11.6667 1.77778H13.3333C13.7917 1.77778 14.184 1.95185 14.5104 2.3C14.8368 2.64815 15 3.06667 15 3.55556V4.44444C15 5.57037 14.6493 6.55185 13.9479 7.38889C13.2465 8.22593 12.375 8.71111 11.3333 8.84444C11.0833 9.52593 10.691 10.0926 10.1562 10.5444C9.62153 10.9963 9.01389 11.3037 8.33333 11.4667V14.2222H10.8333C11.0694 14.2222 11.2674 14.3074 11.4271 14.4778C11.5868 14.6481 11.6667 14.8593 11.6667 15.1111C11.6667 15.363 11.5868 15.5741 11.4271 15.7444C11.2674 15.9148 11.0694 16 10.8333 16H4.16667C3.93056 16 3.73264 15.9148 3.57292 15.7444C3.41319 15.5741 3.33333 15.363 3.33333 15.1111C3.33333 14.8593 3.41319 14.6481 3.57292 14.4778C3.73264 14.3074 3.93056 14.2222 4.16667 14.2222H6.66667ZM3.33333 6.93333V3.55556H1.66667V4.44444C1.66667 5.00741 1.81944 5.51481 2.125 5.96667C2.43056 6.41852 2.83333 6.74074 3.33333 6.93333ZM7.5 9.77778C8.19444 9.77778 8.78472 9.51852 9.27083 9C9.75694 8.48148 10 7.85185 10 7.11111V1.77778H5V7.11111C5 7.85185 5.24306 8.48148 5.72917 9C6.21528 9.51852 6.80556 9.77778 7.5 9.77778ZM11.6667 6.93333C12.1667 6.74074 12.5694 6.41852 12.875 5.96667C13.1806 5.51481 13.3333 5.00741 13.3333 4.44444V3.55556H11.6667V6.93333Z"/>
                </svg>
              </Icon>
              챌린지(공사중)
            </Btn>

            {/* 마이페이지 */}
            <Btn active={activeIndex === 3} onClick={() => setActiveIndex(3)}>
              <Icon active={activeIndex === 3}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                  <path opacity="0.9" d="M9.64683 15.5319C9.00107 16.1575 8.00696 16.1575 7.36121 15.5229L7.26774 15.4322C2.80696 11.1255 -0.107423 8.30573 0.00303423 4.78783C0.0540146 3.24649 0.793231 1.76861 1.99127 0.8982C4.23441 -0.733813 7.00434 0.0277934 8.49977 1.89554C9.99519 0.0277934 12.7651 -0.74288 15.0083 0.8982C16.2063 1.76861 16.9455 3.24649 16.9965 4.78783C17.1155 8.30573 14.1926 11.1255 9.73179 15.4503L9.64683 15.5319Z"/>
                </svg>
              </Icon>
              마이페이지
            </Btn>
          </BtnGroup>
        </Backbtn>

        <Banner />
        </SidebarWrap>
    </div>
  );
}
