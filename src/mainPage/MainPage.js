import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Testpage from "../testPage/TestPage";
import Typebtn from "./component/typebtn";
import Filterbox from "./component/filterbox";
import Centers from  "./component/centers";
import Searchbar from  "./component/searchbar";
import BG from "./component/background";
import styled from "styled-components";

const Wrapper = styled.div`
 position: absolute;  
   top:471.28px;
  left: 180px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
border-radius: 6px;
`;
const Welcome = styled.div`
position: absolute;  
   top: 256px;
color: #FFF;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: 36px; /* 163.636% */
 text-align: left;

`;
const MainContainer = styled.div`
   height: 180vh;  /* 페이지 전체 높이를 차지 */
  width: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #2185E3 0%, #FFF 100%);
`;
const SidebarWrapper = styled.div`
  position: absolute;
  top: 372px;
  display: flex;
  flex-direction: column;
`;


export default function MainPage() {
  return (
    <MainContainer>
       <div className="container">
        <BG/>
        <Welcome>석예슬 님 반가워요 !<br/>
        포항의 모든 해저 레포츠, 씨즐과 함께 즐겨보세요.</Welcome>
      <Header />
      <Typebtn/>
      <Searchbar/>
      <Wrapper>포항 추천 강습소</Wrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Centers/>
      <Filterbox/>

      </div>
    </MainContainer>
  );
}

/*   <Sidebar />
      <Wrapper>포항 추천 강습소</Wrapper>
      <Typebtn/>
      <Centers/>
      <Filterbox/>
      <Searchbar/> */
