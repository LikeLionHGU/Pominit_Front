import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import data from "../data/sufferingcenter.json";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";
import Review1 from "./componenet/review1";
import Info from "./componenet/centerinfo";
import Map from "./componenet/map";
import Meeting from "./componenet/meeting";
import Review2 from "./componenet/review2";



const Page = styled.div`
  height: 180vh; 
  width: auto;
  display: flex;
  flex-direction: column;
  background: #FAFBFF;
  position: relative;
  min-height: 100vh;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
`;

const SidebarWrapper = styled.div`
  position: absolute;
  top: 71px;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 0 0 12px 12px;
`;

const Bar = styled.div`
  position: absolute;
  top: 1592px;
  width: 100%;
  height: 72px;
 background: #D6EBFF;

  display: flex;
  justify-content: flex-end; /* 오른쪽 끝 정렬 */
  align-items: center;
  gap: 16px; /* 버튼 간격 */
  padding-right: 40px; /* 오른쪽 여백 */
`;

const Comparebtn = styled.button`
  display: flex;
  width: 160px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: white;
  border: none;
 color: #2285E3;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
`;

const Register = styled.button`
  display: flex;
  width: 250px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
 border-radius: 6px;
background: #2285E3;
color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */

`;


export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const center = data[id];
  if (!center) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    
    <Page>
      <div className="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
       
        <Info center={center} />
<Review1/>
<Map/>
<Meeting/>
<Review2/>
      </div>
      <Bar>
        <Comparebtn onClick={()=> navigate(`/compare`)} style={{ cursor: "pointer" }}>비교하기</Comparebtn>
        <Register>예약하기</Register>
      </Bar>
    </Page>
  );
}
