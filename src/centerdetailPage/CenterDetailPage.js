import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled, { createGlobalStyle } from "styled-components";
import Review1 from "./componenet/review1";
import CenterInfo from "./componenet/centerinfo";
import Map from "./componenet/map";
import Meeting from "./componenet/meeting";
import Review2 from "./componenet/review2";
import Bar from "./componenet/Bar";
import Floating from "../common/floatingbtn";


const LocalGlobalStyle = createGlobalStyle`
  body { 
    background: #fafbff;
  }
`;

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fafbff;
  padding-bottom: calc(72px + 16px + env(safe-area-inset-bottom));
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
`;
const SidebarWrapper = styled.div`
  position: absolute;
  top: 73px;
  display: flex;
  flex-direction: column;
`;
const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 0 0 12px 12px;
`;
const ContentWrap = styled.div`
  position: relative;
  padding-bottom: calc(72px + 16px + env(safe-area-inset-bottom));
`;
const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 80px;
  right: 130px;
  z-index: 1000;
`;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DetailPage = () => {
  const { id } = useParams();
  const [center, setCenter] = useState(null);
  const [error, setError] = useState("");
  const [, setLoading] = useState(false);
  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API_BASE_URL}/location/detail/${id}`, {
          signal: ctrl.signal,
        });
        setCenter(res.data);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [id]);

  return (
    <>
    <LocalGlobalStyle />
    <Page>
      <div className="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>

        {!!error && (
          <div style={{ padding: 16, color: "crimson" }}>{error}</div>
        )}

        {center && (
          <>
            <CenterInfo center={center} />
            <Review1 center={center} />
            <Map center={center} />
            <Meeting center={center} />
            <Review2 center={center} />
          </>
        )}
      </div>

      <ContentWrap />
      <FloatingWrapper>
  <Floating />
</FloatingWrapper>
      {center && <Bar center={center} />}
    </Page>
    </>
  );
};

export default DetailPage;