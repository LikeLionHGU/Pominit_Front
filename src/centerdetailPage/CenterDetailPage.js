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

// ===== 비교함 유틸 =====
const MAX_COMPARE = 3;
const COMPARE_KEY = "compare:list";

const getCompareIds = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
    // 혹시 3개 초과 저장돼 있으면 읽을 때 잘라줌
    return (Array.isArray(raw) ? raw : []).map(String).slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
};

const setCompareIds = (ids) =>
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids.slice(0, MAX_COMPARE)));

const addToCompare = (id) => {
  const sid = String(id);
  const ids = getCompareIds();

  if (ids.includes(sid)) return { ids, status: "exists" }; // 이미 담김
  if (ids.length >= MAX_COMPARE) return { ids, status: "full" }; // 가득 참

  const next = [...ids, sid];
  setCompareIds(next);
  return { ids: next, status: "added" }; // 새로 담김
};



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
  padding-right: 120px; /* 오른쪽 여백 */
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

  const idx = String(id);
  const center = data[idx]; // 이건 화면용으로 OK
  const storedId = String(center.id); // ← 비교함에는 '고유 id'로 저장

  if (!center) return <div>데이터를 찾을 수 없습니다.</div>;

  const handleCompare = () => {
    const { ids, status } = addToCompare(idx);
  
    if (status === "exists") {
      alert("이미 비교함에 담긴 항목입니다.");
      return;
    }
    if (status === "full") {
      alert("비교함은 최대 3개까지 담을 수 있어요.");
      return;
    }
  
    // status === "added"
    if (ids.length < 2) {
      alert("비교함에 담겼어요! 하나 더 담으면 비교 페이지로 이동합니다.");
      return;
    }
  
    const items = ids
    .map(sid => data.find(d => String(d.id) === String(sid)))
    .filter(Boolean);
    navigate(`/compare?ids=${ids.join(",")}`, { state: { ids, items } });
  };
  
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
      <Comparebtn onClick={handleCompare} style={{ cursor: "pointer" }}>비교하기</Comparebtn>
        <Register>예약하기</Register>
      </Bar>
    </Page>
  );
}
