import styled from "styled-components";
const Review = styled.div`
position:absolute;
left: 180px;
top:1325.72px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const Write=styled.div`
position:absolute;
left: 973px;
top:1325.72px;

color: #2285E3;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;


const Nickname=styled.div`
color: #000;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
padding-bottom:4px;
`;

const Stardate=styled.div`
color: var(--Foundation-White-white-600, #C5C5C5);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding-bottom:12px;
`;

const Content=styled.div`
color: #000;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 19.6px */
`;
const ReviewList = styled.div`
  position: absolute;
  left: 180px;
  top: 1381.72px;

  width: 880px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 리뷰 박스 간격 */
`;

const BoxWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--Foundation-White-white-500, #D9D9D9);
`;
const Rating = styled.span`
  color: #ff517e;
  font-weight: 600;
`;

export default function Review1() {
  const reviews = [
    {
      nickname: "포미닛",
      rating: 4.8,
      date: "12일전",
      content: "제가 서핑은 처음인데 강사님께서 친절하게 알려주셔서 수월하게 했습니다!",
    },
    {
      nickname: "서퍼맨",
      rating: 5.0,
      date: "5일전",
      content: "파도 타는 재미에 푹 빠졌습니다. 장비도 깨끗했어요!",
    },
    // 필요한 만큼 리뷰 추가
  ];

  return (
    <div>
      <Review>방문자 리뷰 ({reviews.length})</Review>
      <Write>
        리뷰 작성하기{" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M0.625977 11.001L6.62598 6.00098L0.625976 1.00098" stroke="#9A9A9A" strokeWidth="1.4" />
        </svg>
      </Write>

      <ReviewList>
        {reviews.map((r, i) => (
          <BoxWrapper key={i}>
            <Nickname>{r.nickname}</Nickname>
            <Stardate>
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
    <path d="M7.62598 0.500977L9.19757 5.33786H14.2834L10.1689 8.32721L11.7405 13.1641L7.62598 10.1747L3.51148 13.1641L5.08308 8.32721L0.968581 5.33786H6.05438L7.62598 0.500977Z" fill="#FF517E"/>
  </svg>
  <Rating>{r.rating}</Rating> · {r.date}
</Stardate>
            <Content>{r.content}</Content>
          </BoxWrapper>
        ))}
      </ReviewList>
    </div>
  );
}
