import styled from "styled-components";
const Review =styled.div`
 position: absolute;
  top: 428.72px;
 left: 180px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;
const R1 =styled.div`
 position: absolute;
  top: 458.72px;
 left: 180px;
color: #000;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
const Rbox=styled.div`
position: absolute;
  top: 491.72px;
 left: 180px;
width: 250px;
height: 196px;
flex-shrink: 0;
border-top: 1px solid #2285E3;
border-bottom: 1px solid #2285E3;
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
`;
const Rgaze = styled.div`
  position: absolute;
  left: 455px;
  width: 520px;
  height: 36px;
 border-radius: 6px;
background: #E6F3FF;
  display: flex;               /* 한 줄 배치 */
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;           /* 좌우 여백 */
  z-index: 0;                  /* 바는 뒤쪽 */

  
`;

const Rtext = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
`;

const Rscore = styled.div`
  color: var(--Gray-04, #828282);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 19.6px */                /* 점수는 항상 위 */
`;
const Ricon1=styled.div`
width: 24px;
height: 24px;
aspect-ratio: 1/1;
padding:16px;
`;
const Ricon2=styled.div`
width: 24px;
height: 24px;
aspect-ratio: 1/1;
margin-left:210px;
margin-top:10px;
`;
const Rt=styled.div`
color: #000;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; 
padding: 35px;
`;
export default function Review1() {
    const reviewTexts = [
        "친절해요",
        "카페 이용 가능해요",
        "강사님 설명이 자세해요",
        "시설이 깨끗해요",
        "주차가 편리해요"
      ];
    return(
        <div>
           <Review>리뷰 데이터 분석</Review>
<R1>방문자가 작성한 리뷰에서 가장 많이 언급된 내용을 보여드려요!</R1>
<Rbox>
  <Ricon1><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M17.5149 24C15.3057 24 13.5149 22.2091 13.5149 20V13.766C13.5149 8.06947 16.4533 3.3284 21.4913 1.03866C23.0366 0.336302 24.626 1.61005 24.626 3.30754C24.626 4.50843 23.7857 5.50975 22.7459 6.11043C21.2092 6.99811 20.1547 8.39322 19.6135 10.217C19.2119 11.5702 20.3834 12.7698 21.7949 12.7698C23.1621 12.7698 24.2704 13.8781 24.2704 15.2453V20C24.2704 22.2091 22.4796 24 20.2704 24H17.5149ZM4.62597 24C2.41684 24 0.625977 22.2091 0.625977 20V13.766C0.625977 8.08064 3.61519 3.347 8.60322 1.05217C10.1454 0.342677 11.7371 1.61357 11.7371 3.31108C11.7371 4.50988 10.8982 5.50919 9.86021 6.109C8.28194 7.02105 7.21936 8.46947 6.72287 10.3687C6.38609 11.6569 7.49959 12.7698 8.83114 12.7698C10.1415 12.7698 11.2038 13.8321 11.2038 15.1424V20C11.2038 22.2091 9.41289 24 7.20376 24H4.62597Z" fill="#2285E3"/>
</svg></Ricon1>
<Rt>
  친절하고 
카페 이용이 가능한
강습소예요!
</Rt>
  
<Ricon2>
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M7.73709 -1.47647e-06C9.94623 -1.28334e-06 11.7371 1.79086 11.7371 4L11.7371 10.234C11.7371 15.9305 8.79864 20.6716 3.76067 22.9613C2.21531 23.6637 0.625977 22.3899 0.625977 20.6925C0.625977 19.4916 1.46622 18.4903 2.50608 17.8896C4.0428 17.0019 5.09724 15.6068 5.6385 13.783C6.0401 12.4298 4.86859 11.2302 3.45707 11.2302C2.08987 11.2302 0.981534 10.1219 0.981534 8.75465L0.981535 4C0.981535 1.79086 2.7724 -1.9105e-06 4.98154 -1.71737e-06L7.73709 -1.47647e-06ZM20.626 -3.49691e-07C22.8351 -1.56562e-07 24.626 1.79086 24.626 4L24.626 10.234C24.626 15.9194 21.6368 20.653 16.6487 22.9478C15.1066 23.6573 13.5149 22.3864 13.5149 20.6889C13.5149 19.4901 14.3538 18.4908 15.3917 17.891C16.97 16.979 18.0326 15.5305 18.5291 13.6313C18.8659 12.3431 17.7524 11.2302 16.4208 11.2302C15.1105 11.2302 14.0482 10.1679 14.0482 8.85758L14.0482 4C14.0482 1.79086 15.8391 -7.68177e-07 18.0482 -5.75048e-07L20.626 -3.49691e-07Z" fill="#2285E3"/>
</svg></Ricon2></Rbox>
{reviewTexts.map((text, i) => (
<div>
<Rgaze key={i} style={{ top: `${491.72 + i * 46}px` }}>
<Rtext>{text}</Rtext>
<Rscore>200</Rscore>
</Rgaze>
</div>
))} 
        </div>

);
}