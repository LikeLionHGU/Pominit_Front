import { useState, useEffect } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Typebtn from "./component/typebtn";
import FilterBox from "./component/filterbox";
import Centers from "./component/centers";
import BG from "../common/background";
import Floating from "../common/floatingbtn";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 471.28px;
  left: 190px;
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
  color: #fff;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 163.636% */
  text-align: left;
  user-select: none;
`;
const MainContainer = styled.div`
  height: 180vh;
  width: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #2185e3 0%, #fff 100%);
`;
const SidebarWrapper = styled.div`
  position: absolute;
  top: 360px;
  display: flex;
  flex-direction: column;
`;

// JWT payload 파싱 함수 (jwt를 디코딩한 payload 반환하는 기능)
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    //JWT는 헤더.페이로드.서명 구조인데 점(.)을 기준으로 하여 페이로드를 꺼낸다
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    //JWT 페이로드는 Base64URL 형식이라서 -,_를 쓰는데 브라우저의 atob가 이해하도록
    //Base64로 바꾸기 위해 - -> +, _ -> /로 치환한다.

    //정상적인 문자열(UTF-8)로 복원하기 기능
    const jsonPayload = decodeURIComponent(
      atob(base64) //Base64 문자열을 바이너리 문자열로 디코딩
        .split("") //문자열을 문자 배열로 나누기
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        //각 문자의 코드 값을 16진수 2자리로 변환하고 앞에 %를 붙여서 인코딩함.
        .join("") //인코딩 조각들을 하나의 문자열로 결합하기
    );

    return JSON.parse(jsonPayload); //JSON문자열을 자바스크립트 객체로 파싱해서 반환함
  } catch (e) {
    return null;
  }
}

export default function MainPage() {
  //정렬 기준 상태, 초기값:0
  const [sorting, setSorting] = useState(0);
  //선택된 스포츠 상태. 초기값:빈문자열
  const [sport, setSport] = useState("");
  //유저 이름 상태, 초기값:게스트 -> 로그인 후에 setUserName으로 업데이트
  const [userName, setUserName] = useState("게스트");

  /*사용자 이름 관련 */
  useEffect(() => {
    const token = localStorage.getItem("token"); //로컬스토리지에서 token으로 저장된 jwt 문자열 읽기
    //토큰이 존재하면,
    if (token) {
      const payload = parseJwt(token); //디코딩으로 페이로드 객체 얻기

      //페이로드가 존재하고, 그 안에 username 속성이 있을때 진행하기
      if (payload?.username) {
        setUserName(payload.username); //가져온 사용자명 상태로 저장하기
      }
    }
  }, []);

  /* 정렬 관련 -> sorting 값이 바뀔 때마다 실행됨 */
  useEffect(() => {
    // 0/1/2 라벨로 매핑하는 객체
    const labelMap = { 0: "높은평점순", 1: "낮은가격순", 2: "리뷰많은순" };
    //정렬 상태 변경 했을때 콘솔에 코드값, 라벨 출력
    console.log(
      "[MainPage] sorting state changed:",
      sorting,
      `(${labelMap[sorting]})`
    );
  }, [sorting]);

  /* 스포츠 관련 -> sport 값이 바뀔 때마다 실행됨 */
  useEffect(() => {
    // 빈 문자열("")이면 전체로 표시
    const label = sport && sport.trim().length > 0 ? sport : "전체";
    console.log("[MainPage] sport state changed:", sport, `(${label})`);
  }, [sport]);

  /*
value={sorting} → 현재 선택된 정렬 상태(0, 1, 2 등)를 자식 컴포넌트에 전달.
value={sport} → 현재 선택된 스포츠 값 전달

onChange={setSorting} → 사용자가 정렬 옵션을 바꾸면, FilterBox 내부에서 onChange(새값)을 호출 → 부모(MainPage)의 sorting 상태 업데이트
onChange={setSport} → 사용자가 버튼 클릭 시 onChange("선택된스포츠") 호출 → 부모(MainPage)의 sport 상태 업데이트.


Centers 내부에서는 sport, sorting 두가지 props를 활용해서
실제 데이터 표시를 함.
*/
  return (
    <MainContainer>
      <div className="container">
        <BG />
        <Welcome>
          {userName} 님 반가워요 !<br />
          포항의 모든 해저 레포츠, 씨즐과 함께 즐겨보세요.
        </Welcome>
        <Header />
        <Typebtn value={sport} onChange={setSport} />
        <Wrapper>포항 추천 강습소</Wrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <FilterBox value={sorting} onChange={setSorting} />
        <Centers sport={sport} sorting={sorting} />

        <Floating />
      </div>
    </MainContainer>
  );
}
