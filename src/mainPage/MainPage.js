import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Testpage from "../testPage/TestPage";
import Typebtn from "./component/typebtn";
import Filterbox from "./component/filterbox";
import Centers from  "./component/centers";
import Searchbar from  "./component/searchbar";
import styled from "styled-components";

const Wrapper = styled.div`
 position: absolute;  
   top: 137.73px;
  left: 180px;
margin-top:24px;
margin-bottom:24px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
border-radius: 6px;

`;

export default function MainPage() {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <Wrapper>포항 추천 강습소</Wrapper>
      <Typebtn/>
      <Centers/>
      <Filterbox/>
      <Searchbar/>
    </div>
  );
}
