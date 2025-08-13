// src/pages/DetailPage.jsx
import { useParams } from "react-router-dom";
import data from "../data/sufferingcenter.json";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";

/* 레이아웃 */
const Page = styled.div`
  position: relative;
  min-height: 100vh;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
`;

const LeftThumb = styled.img`
  position: absolute;
  top: 83.72px;
  left: 180px;
  width: 520px;
  height: 297px;
  object-fit: cover;
  border-radius: 8px;
`;

const RightCol = styled.div`
  position: absolute;
  top: 83.72px;
  left: 720.37px;
  right: 60px;         /* 화면 끝과 여백 */
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 타이틀/요약 */
const Title = styled.h1`
  margin: 0;
  color: #000;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
`;

const Summary = styled.p`
  margin: 0;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
`;

/* 정보 블록 */
const InfoWrap = styled.div`
  color: #000;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #e3d9d9;       /* 임시 아이콘 배경 */
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  font-size: 18px;           /* 이모지 크기 */
`;

const Text = styled.div`
  color: #1f1414;
  font-size: 18px;
  line-height: 1.45;
  word-break: keep-all;
`;

const LinkA = styled.a`
  color: #1f1414;
  text-decoration: underline;
  &:hover { opacity: 0.85; }
`;

/* 유틸: URL 판별 + 값 렌더링(문자열/배열 대응) */
const isUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);
const renderValue = (v) => {
  if (v == null) return "-";
  if (Array.isArray(v)) {
    return (
      <>
        {v.map((item, i) =>
          isUrl(item) ? (
            <span key={i}>
              <LinkA href={item} target="_blank" rel="noreferrer">{item}</LinkA>
              {i < v.length - 1 ? " · " : ""}
            </span>
          ) : (
            <span key={i}>{item}{i < v.length - 1 ? " · " : ""}</span>
          )
        )}
      </>
    );
  }
  return isUrl(v) ? (
    <LinkA href={v} target="_blank" rel="noreferrer">{v}</LinkA>
  ) : (
    <>{v}</>
  );
};

export default function DetailPage() {
  const { id } = useParams();
  const center = data[id]; // id로 데이터 찾기

  if (!center) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  const rows = [
    { icon: "📍", value: center["주소"] },
    { icon: "⏰", value: center["영업 시간"] },
    { icon: "📞", value: center["전화번호"] },
    { icon: "💳", value: center["가격 정보"] },
    { icon: "🔗", value: center["웹사이트/SNS"] },
  ];

  return (
    <Page className="container">
      <Header />
      <Sidebar />

      <LeftThumb
        src={center["썸네일 이미지 URL"]}
        alt={center["강습소 이름"]}
      />

      <RightCol>
        <Title>{center["강습소 이름"]}</Title>
        {/* 소개 글 */}
        {center["소개 글"] && <Summary>{center["소개 글"]}</Summary>}

        {/* 정보 행들 */}
        <InfoWrap>
          {rows.map((r, i) => (
            <InfoRow key={i}>
              <IconBox>{r.icon}</IconBox>
              <Text>{renderValue(r.value)}</Text>
            </InfoRow>
          ))}
        </InfoWrap>
      </RightCol>
    </Page>
  );
}
