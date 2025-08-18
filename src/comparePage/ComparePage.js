import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  position: absolute;
  top: 83.72px;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
`;

const Category = styled.div`
  position: relative;              /* 자식 absolute 배치 기준 */
  width: 880px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
  background: #2f83f3;
  margin-top: 35px;
  margin-left: 175px;
  user-select: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

/* 공통 라벨: 세로 중앙 정렬 */
const Label = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

/* 좌우 위치만 다르게 */
const Center = styled(Label)`left: 24px;`;
const Centername = styled(Label)`left: 155px;`;
const Star = styled(Label)`left: 270px;`;
const Dong = styled(Label)`left: 360px;`;
const Price = styled(Label)`left: 450px;`;
const Rental = styled(Label)`left: 560px;`;
const Review = styled(Label)`left: 700px;`;

export default function SurfingCenters() {
  return (
    <div className="container">
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <Category>
        <Center>강습소</Center>
        <Centername>강습소명</Centername>
        <Star>평점</Star>
        <Dong>동네</Dong>
        <Price>대표가격</Price>
        <Rental>장비보관가</Rental>
        <Review>리뷰 데이터 분석</Review>
      </Category>
    </div>
  );
}
