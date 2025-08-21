import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const Title = styled.div`
  position: absolute;
  top: 1063.72px;
  left: 180px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
`;

const Text = styled.div`
  position: absolute;
  top: 1093.72px;
  left: 180px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;

const ScrollArea = styled.div`
  position: absolute;
  top: 1126.72px;
  left: 180px;
  display: flex;
  flex-direction: row;
  width: 878px;
  gap: 12px;
  padding-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;

  /* (선택) 스크롤바 커스텀 - 크롬/엣지/사파리 */
  &::-webkit-scrollbar {
    height: 8px;               /* 가로 스크롤 → height 사용 */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background: #d6ebff;
  }
  &::-webkit-scrollbar-track {
    background: #f2f2f2;
    border-radius: 100px;
  }
`;

/* 카드(박스) */
const Box = styled.div`
  flex: 0 0 280px;
  min-width: 280px;
  display: flex;
  height: 131px;
  padding: 10px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid #d4d4d4;
  background: #fff;
`;

const Meet = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

const Icon = styled.div`
  width: 16px;
  height: 15px;
  flex: 0 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;

  svg { display: block; }
  svg path { fill: #ff517e; }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const When = styled.span`
  white-space: normal;
`;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function normalizeCenter(raw) {
  if (!raw || raw.id == null) return null;
  return { id: Number(raw.id) };
}

export default function Meeting({ center }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const c = normalizeCenter(center);

  const fetchMeetingData = useCallback(async (centerId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/location/gathers/${centerId}`);

      const list = Array.isArray(response.data)
        ? response.data
        : (response.data?.items ?? []);

      const normalized = list.map((it, idx) => ({
        id: it.id ?? idx,
        title: it.title ?? it.name ?? "모임",
        time: it.time ?? it.timeText ?? it.schedule ?? "시간 미정",
        place: it.place ?? it.placeName ?? "장소 미정",
        count:
          it.count ??
          it.headcountText ??
          (it.joined && it.capacity ? `${it.joined}/${it.capacity}명` : "인원 미정"),
      }));

      setMeetings(normalized);
    } catch (e) {
      console.error(e);
      setError("데이터를 불러오지 못했습니다.");
      setMeetings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!c) return;
    fetchMeetingData(c.id);
  }, [c?.id, fetchMeetingData]);

  if (!c) return null;

  return (
    <div>
      <Title>함께 즐겨보면 어때요?</Title>
      <Text>해양 레포츠, 혼자 즐기기 어려웠다면 아래 모임에 참여해보세요!</Text>

      <ScrollArea>
        {loading && <Box><Meet>불러오는 중…</Meet></Box>}
        {error && !loading && <Box><Meet>{error}</Meet></Box>}
        {!loading && !error && meetings.length === 0 && (
          <Box><Meet>현재 모집 중인 모임이 없습니다.</Meet></Box>
        )}

        {!loading && !error && meetings.map((m, idx) => (
          <Box key={m.id ?? idx}>
            <Meet>{m.title}</Meet>
            <InfoWrapper>
              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19" fill="none">
                    <path d="M13.067 0.613586C12.5782 0.613586 12.1783 1.01348 12.1783 1.50223V2.39087H5.06919V1.50223C5.06919 1.01348 4.6693 0.613586 4.18055 0.613586C3.6918 0.613586 3.29191 1.01348 3.29191 1.50223V2.39087H2.40326C1.41687 2.39087 0.634863 3.19065 0.634863 4.16816L0.625977 16.6092C0.625977 17.5867 1.41687 18.3865 2.40326 18.3865H14.8443C15.8218 18.3865 16.6216 17.5867 16.6216 16.6092V4.16816C16.6216 3.19065 15.8218 2.39087 14.8443 2.39087H13.9556V1.50223C13.9556 1.01348 13.5557 0.613586 13.067 0.613586ZM14.8443 16.6092H2.40326V7.72273H14.8443V16.6092Z" />
                  </svg>
                </Icon>
                <When>{m.time}</When>
              </Info>

              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M8.27918 13.4956C5.77277 13.3773 3.77869 11.3113 3.77869 8.77207C3.77869 6.16192 5.89888 4.04068 8.50775 4.04068C11.0457 4.04068 13.1107 6.03575 13.2289 8.54339L11.5738 8.04659C11.2506 6.65083 9.99741 5.61781 8.50775 5.61781C6.76588 5.61781 5.35504 7.02934 5.35504 8.77207C5.35504 10.2625 6.38755 11.5163 7.78263 11.8396L8.27918 13.4956ZM16.3895 8.77207C16.3895 9.00864 16.3816 9.24521 16.358 9.48178L14.8053 9.01653C14.8132 8.93767 14.8132 8.85093 14.8132 8.77207C14.8132 5.28661 11.9915 2.46355 8.50775 2.46355C5.02401 2.46355 2.20233 5.28661 2.20233 8.77207C2.20233 12.2575 5.02401 15.0806 8.50775 15.0806C8.58657 15.0806 8.67327 15.0806 8.75209 15.0727L9.21711 16.6262C8.98066 16.6498 8.7442 16.6577 8.50775 16.6577C4.15701 16.6577 0.625977 13.125 0.625977 8.77207C0.625977 4.41919 4.15701 0.886414 8.50775 0.886414C12.8585 0.886414 16.3895 4.41919 16.3895 8.77207Z" />
                  </svg>
                </Icon>
                <When>{m.place}</When>
              </Info>

              <Info>
                <Icon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 12 18" fill="none">
                    <path d="M0.625977 2.08641V4.78091C0.625977 5.23141 0.818477 5.66491 1.16681 5.98791L4.29264 8.88641L1.15764 11.7934C0.818476 12.1164 0.625977 12.5499 0.625977 13.0004V15.6864C0.625977 16.6214 1.45098 17.3864 2.45931 17.3864H9.79264C10.801 17.3864 11.626 16.6214 11.626 15.6864V13.0004C11.626 12.5499 11.4335 12.1164 11.0943 11.8019L7.95931 8.88641L11.0851 5.99641C11.4335 5.67341 11.626 5.23991 11.626 4.78941V2.08641C11.626 1.15141 10.801 0.386414 9.79264 0.386414H2.45931C1.45098 0.386414 0.625977 1.15141 0.625977 2.08641Z" />
                  </svg>
                </Icon>
                <When>{m.count}</When>
              </Info>
            </InfoWrapper>
          </Box>
        ))}
      </ScrollArea>
    </div>
  );
}
