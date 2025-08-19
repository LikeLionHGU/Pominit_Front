import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import data from "../data/sufferingcenter.json";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";
import Review1 from "./componenet/review1";
import CenterInfo from "./componenet/centerinfo";
import Map from "./componenet/map";
import Meeting from "./componenet/meeting";
import Review2 from "./componenet/review2";


const Page = styled.div`
  height: 200vh;
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
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding-right: 120px;
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
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
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
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
`;

const API_BASE_URL = "https://www.liketiger.info:443";
const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL 파라미터에서 id 가져오기
  const [center, setCenter] = useState(null);
  const [error, setError] = useState(null);

  const fetchCenterData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location/detail/${id}`);
      setCenter(response.data); // 응답 데이터 저장
    } catch (e) {
      setError("데이터를 불러오지 못했습니다.");
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    fetchCenterData();
  }, [fetchCenterData]);
  if (error) return <div>{error}</div>;
  if (!center) return <div>불러오는 중…</div>;
  return (
    <Page>
      <div className="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>

        <CenterInfo center={center} />
        <Review1 />
        <Map center={center} />
        
        <Meeting center={center} />
        <Review2 />
      </div>

      <Bar>
        {/* 그냥 이동만 */}
        <Comparebtn onClick={() => navigate("/compare")}>비교하기</Comparebtn>
        <Register>예약하기</Register>
      </Bar>
    </Page>
  );
};
export default DetailPage;
