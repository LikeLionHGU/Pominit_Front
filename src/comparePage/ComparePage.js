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
  position: relative;             
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
const Center = styled(Label)`left: 59px;`;
const Centername = styled(Label)`left: 193px;`;
const Star = styled(Label)`left: 306px;`;
const Dong = styled(Label)`left: 404px;`;
const Price = styled(Label)`left: 515px;`;
const Rental = styled(Label)`left: 605px;`;
const Review = styled(Label)`left: 697px;`;

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
        <Star>동네</Star>
        <Dong>대표가격</Dong>
        <Price>장점</Price>
        <Rental>단점</Rental>
        <Review>리뷰 데이터 분석</Review>
      </Category>
    </div>
  );
}
