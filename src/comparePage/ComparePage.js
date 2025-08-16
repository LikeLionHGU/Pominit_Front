import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import styled from "styled-components";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/sufferingcenter.json";

/* ===== Storage utils ===== */
const MAX_COMPARE = 3;
const COMPARE_KEY = "compare:list";

const getIds = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
    return (Array.isArray(raw) ? raw : []).map(String).slice(0, MAX_COMPARE);
  } catch {
    return [];
  }
};
const setIds = (ids) => localStorage.setItem(COMPARE_KEY, JSON.stringify(ids.slice(0, MAX_COMPARE)));
const removeId = (id) => {
  const next = getIds().filter((x) => x !== String(id));
  setIds(next);
  return next;
};
const clearAll = () => localStorage.removeItem(COMPARE_KEY);

/* ===== 안전한 데이터 접근 (배열/객체 모두 대응) ===== */
const getItemById = (id) => {
  const sid = String(id);
  if (Array.isArray(data)) {
    // id 속성으로 우선 탐색, 실패 시 인덱스 접근 보조
    return data.find((d) => String(d?.id) === sid) ?? data[Number(sid)];
  }
  // 객체 맵 형태일 때
  return data[sid] ?? data[Number(sid)];
};

/* ===== 파서 ===== */
const parseRating = (val) => {
  if (val == null) return null;
  const n = parseFloat(String(val).replace(/[^\d.]/g, ""));
  return isNaN(n) ? null : n;
};
const parseReviewCount = (val) => {
  if (val == null) return 0;
  // "후기 4개" 같은 문자열에서 숫자만 추출
  const m = String(val).match(/\d+/);
  return m ? Number(m[0]) : 0;
};
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

const Category=styled.div`
width: 880px;
height: 60px;
flex-shrink: 0;
border-radius: 12px 12px 0 0;
background: #2F83F3;
margin-top:35px;
margin-left:175px;
 user-select: none;
 color: #FFF;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
`;

const Center=styled.div`
position: absolute;
  top: 112.72px;
left:240px;
`;

const Centername=styled.div`
position: absolute;
  top: 112.72px;
left:370px;

`;
const Star=styled.div`
position: absolute;
  top: 112.72px;
left:488px;

`;
const Dong=styled.div`
position: absolute;
  top: 112.72px;
left:581px;

`;
const Price=styled.div`
position: absolute;
  top: 112.72px;
left:671px;

`;
const Rental=styled.div`
position: absolute;
  top: 112.72px;
left:761px;

`;
const Review=styled.div`
position: absolute;
  top: 112.72px;
left:870px;

`;


/* ===== UI ===== */
const Wrap = styled.div`
  width: 420px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  border: 1px solid #E6F0FF;
  overflow: hidden;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
`;
const Head = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; background: #F5FAFF; border-bottom: 1px solid #E6F0FF;
  font-weight: 700; color: #2285E3;
`;
const Badge = styled.span`
  padding: 2px 8px; border-radius: 999px; background: #E6F2FF; color: #2285E3; font-weight: 700; font-size: 12px;
`;
const List = styled.ul`
  list-style: none; margin: 0; padding: 8px 0;
  max-height: 420px; overflow-y: auto;
`;
const Row = styled.li`
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px 14px;
  &:not(:last-child){ border-bottom: 1px solid #F1F6FF; }
`;
const Thumb = styled.img`
  width: 56px; height: 56px; object-fit: cover; border-radius: 8px; background: #f2f4f8;
`;
const Meta = styled.div`
  min-width: 0;
  .name { font-weight: 700; color: #111; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sub  { font-size: 12px; color: #667085; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .rev  { margin-top: 4px; font-size: 12px; color: #475467; }
`;
const Right = styled.div`
  justify-self: end; text-align: right;
  display: grid; gap: 6px; align-items: center; justify-items: end;
`;
const Rating = styled.div`
  display: inline-flex; align-items: center; gap: 6px;
  font-weight: 700; color: #111;
  .count { font-weight: 500; color: #6B7FA6; font-size: 12px; }
`;
const StarIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
    <path d="M7.626 0.501L9.198 5.338h5.085l-4.114 2.99 1.571 4.837-4.114-2.989-4.114 2.989 1.572-4.837L0.969 5.338h5.085L7.626 0.501Z" fill="#FFB703"/>
  </svg>
);
const Remove = styled.button`
  border: 1px solid #E2E8F8; background: #fff; border-radius: 6px;
  padding: 6px 10px; cursor: pointer; color: #6B7FA6;
  &:hover{ border-color:#BFD7FF; color:#2F83F3; }
`;
const Footer = styled.div`
  display: flex; gap: 8px; padding: 12px 14px; background: #FAFCFF; border-top: 1px solid #E6F0FF;
`;
const Btn = styled.button`
  flex: 1;
  padding: 10px 12px; border-radius: 8px; cursor: pointer; font-weight: 700;
  border: 1px solid transparent;
  ${({ $primary }) => $primary
    ? `background:#2285E3; color:#fff;`
    : `background:#fff; color:#2F83F3; border-color:#CFE3FF;`
  }
  &:disabled{ opacity: .5; cursor: not-allowed; }
`;


export default function SurfingCenters() {

  const navigate = useNavigate();
  const [ids, setStateIds] = useState(getIds());

  // 스토리지 변경 동기화
  useEffect(() => {
    const onStorage = (e) => { if (e.key === COMPARE_KEY) setStateIds(getIds()); };
    const refresh = () => setStateIds(getIds());
    window.addEventListener("storage", onStorage);
    window.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const items = useMemo(
    () => ids.map((i) => getItemById(i)).filter(Boolean),
    [ids]
  );

  const onRemove = (id) => setStateIds(removeId(id));
  const onClear  = () => { clearAll(); setStateIds([]); };

  const goCompare = () => {
    if (ids.length < 2) return;
    const validItems = ids.map((i) => getItemById(i)).filter(Boolean);
    navigate(`/compare?ids=${ids.join(",")}`, { state: { ids, items: validItems } });
  };

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
          <Star>평점</Star>
          <Dong>동네</Dong>
          <Price>대표가격</Price>
          <Rental>장비보관가</Rental>
          <Review>리뷰 데이터 분석</Review>
        </Category>

        {items.length === 0 ? (
        <div style={{ padding: "18px 14px", color: "#6B7FA6" }}>아직 담긴 항목이 없어요.</div>
      ) : (
        <List>
          {items.map((it) => {
            const id = it?.id ?? "-";
            const name = it?.["강습소 이름"] ?? it?.name ?? `센터 #${id}`;
            const dong = it?.["동네"] ?? it?.location ?? "";
            const rating = parseRating(it?.["별점"]);
            const reviewTxt = it?.["후기"]; // "후기 4개" 같은 문구
            const reviewCount = parseReviewCount(reviewTxt);
            const thumb = it?.["썸네일 이미지 URL"];

            return (
              <Row key={id}>
                <Thumb src={thumb} alt="" onError={(e)=>{e.currentTarget.style.visibility='hidden';}} />
                <Meta>
                  <div className="name">{name}</div>
                  <div className="sub">{dong || "동네 정보 없음"}</div>
                  <div className="rev">
                    {reviewTxt ? reviewTxt : (reviewCount ? `후기 ${reviewCount}개` : "후기 정보 없음")}
                  </div>
                </Meta>
                <Right>
                  <Rating>
                    <StarIcon />
                    {rating != null ? rating.toFixed(1) : "—"}
                    {reviewCount ? <span className="count">({reviewCount})</span> : null}
                  </Rating>
                  <Remove onClick={() => onRemove(id)}>삭제</Remove>
                </Right>
              </Row>
            );
          })}
        </List>
      )}

      <Footer>
        <Btn onClick={onClear}>비우기</Btn>
        <Btn $primary disabled={ids.length < 2} onClick={goCompare}>
          비교하기
        </Btn>
      </Footer>
        </div>
    );
}