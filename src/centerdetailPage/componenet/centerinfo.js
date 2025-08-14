
import styled from "styled-components";


const LeftThumb = styled.img`
  position: absolute;
  top: 83.72px;
  left: 180px;
  width: 520px;
  height: 297px;
  object-fit: cover;
  border-radius: 8px;
`;

const RightCol = styled.div`
  position: absolute;
  top: 83.72px;
  left: 720.37px;
  right: 60px;        
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


const Title = styled.h1`
  margin: 0;
  color: #000;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
`;

const Summary = styled.p`  
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  align-self: stretch;
  width: 340px;
  white-space: pre-line;
`;

const Info = styled.div`
  display: flex;       
  align-items: center;  
  gap: 8px;             
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
`;

const Icon = styled.div`
  width: 16px;
  height: 15px;
  flex: 0 0 16px;         
  display: inline-flex;   
  align-items: center;
  justify-content: center;
  opacity: 0.9;

  svg { display: block; }
  svg path { fill: white; }
`;

const InfoWrapper = styled.div`
  position: absolute;
  top: 248.22px;
  left: 720.37px;
  right: 60px;        
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Address = styled.span`
  white-space: normal;
`;


export default function SurfingCenters({ center }) {
    if (!center) {
      return <div>센터 정보를 찾을 수 없습니다.</div>;
    }
    function SummaryText({ text }) {
        const formatted = (text || '').replace(/([.?!])\s*/g, '$1\n').trim();
        return <Summary>{formatted}</Summary>;
      }
return(  <div>
 <LeftThumb
    src={center["썸네일 이미지 URL"]}
    alt={center["강습소 이름"]}
  />
  <RightCol>
    <Title>{center["강습소 이름"]}</Title>
    <SummaryText text={center["소개 글"]} />
  </RightCol>
        <InfoWrapper>
        <Info>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
            </svg>
          </Icon>
          <Address>{center["주소"]}</Address>
        </Info>

        <Info>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
            </svg>
          </Icon>
          <Address>{center["영업 시간"]}</Address>
        </Info>

        <Info>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
            </svg>
          </Icon>
          <Address>{center["전화번호"]}</Address>
        </Info>

        <Info>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
            </svg>
          </Icon>
          <Address>가격표 이미지로 보기</Address>
        </Info>

        <Info>
          <Icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
              <path opacity="0.9" d="M6.25895 14.0994V9.59622H9.73718V14.0994C9.73718 14.5947 10.1285 15 10.6067 15H13.2154C13.6937 15 14.085 14.5947 14.085 14.0994V7.79496H15.5632C15.9632 7.79496 16.1545 7.2816 15.8502 7.01141L8.58067 0.229661C8.25024 -0.0765536 7.7459 -0.0765536 7.41546 0.229661L0.145957 7.01141C-0.149693 7.2816 0.0329144 7.79496 0.432911 7.79496H1.91116V14.0994C1.91116 14.5947 2.30246 15 2.78072 15H5.38939C5.86765 15 6.25895 14.5947 6.25895 14.0994Z"/>
            </svg>
          </Icon>
          <Address>
            {Array.isArray(center["웹사이트/SNS"])
              ? center["웹사이트/SNS"].join(" · ")
              : center["웹사이트/SNS"]}
          </Address>
        </Info>
      </InfoWrapper>
</div>
   
    );
  }
  