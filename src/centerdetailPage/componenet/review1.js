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
border-top: 1px solid var(--Foundation-White-white-500, #D9D9D9);
border-bottom: 1px solid var(--Foundation-White-white-500, #D9D9D9);

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
  background: #D9D9D9;
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
  color: red;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  position: relative;
  z-index: 10;                 /* 점수는 항상 위 */
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
<Rbox>친절하고 
카페 이용이 가능한
강습소예요!</Rbox>
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