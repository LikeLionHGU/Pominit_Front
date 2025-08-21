import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { loadIdsFromLocalStorage } from "../common/compareStorage";

/* =========================
   Styled Components
========================= */

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

const Category = styled.div`
  position: relative;
  width: 880px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
  background: #2f83f3;
  margin-top: 35px;
  margin-left: 175px;
  user-select: none;
  color: #fff;
  text-align: center;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;

const Label = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
const Center = styled(Label)`
  left: 59px;
`;
const Centername = styled(Label)`
  left: 193px;
`;
const Star = styled(Label)`
  left: 306px;
`;
const Dong = styled(Label)`
  left: 390px;
`;
const Price = styled(Label)`
  left: 475px;
`;
const Rental = styled(Label)`
  left: 590px;
`;
const Review = styled(Label)`
  left: 705px;
`;

const Empty = styled.div`
  position: relative;
  left: 175px;
  width: 880px;
  height: 220px;
  flex-shrink: 0;
  border-bottom: 1px solid #cad0d7;
  background: #eaf3fe;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:last-of-type {
    margin-bottom: 100px;
  }
`;

const Box = styled.div`
  width: 144px;
  height: 81px;
  border-radius: 6px;
  border: 1px dashed #2f83f3;
  background: #fff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f7fbff;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const Plus = styled.div`
  width: 34px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ment = styled.div`
  margin-top: 12px;
  user-select: none;
  color: #2f83f3;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
`;

/* ===== Row (표 한 줄) ===== */
const Row = styled.div`
  margin-left: 175px;
  width: 880px;
  height: 220px;
  display: grid;
  grid-template-columns: 160px 127px 90px 80px 120px 110px 1fr 30px;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  background: #fff;
`;

const Img = styled.img`
  width: 160px;
  height: 220px;
  object-fit: cover;
  background: #e5e7eb;
  color: #9ca3af;
`;

const PlaceholderImg = styled.div`
  width: 160px;
  height: 220px;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const Name = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const RateWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #111827;
  & small {
    display: block;
    margin-top: 4px;
    color: #f472b6;
    font-size: 12px;
  }
`;

const DongCol = styled.div`
  font-size: 14px;
  color: #111827;
`;

const PriceCol = styled.div`
  font-size: 14px;
  color: #111827;
  line-height: 1.5;
  & b {
    font-weight: 600;
  }
  & a {
    text-decoration: underline;
    color: #111827;
    cursor: pointer;
  }
`;

const EquipCol = styled.div`
  font-size: 16px;
  color: #111827;
`;

const ReviewCol = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  padding-right: 16px;
  white-space: pre-line;
`;

const RemoveBtn = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y="0.723633" width="24" height="24" rx="5" fill="#FF658C" />
    <path
      d="M7 7.6814L17 17.7655M7 17.7655L17 7.6814"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

/* =========================
   Constants
========================= */

const API_BASE_URL = "https://www.liketiger.info:443";

/* =========================
   Helper Components
========================= */

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="13"
    viewBox="0 0 15 13"
    fill="none"
  >
    <path
      d="M7.5 0.223633L9.0716 5.06051H14.1574L10.0429 8.04987L11.6145 12.8868L7.5 9.8974L3.3855 12.8868L4.9571 8.04987L0.842604 5.06051H5.9284L7.5 0.223633Z"
      fill="#FF658C"
    />
  </svg>
);

function CompareRow({ d, onRemove }) {
  const [imgOk, setImgOk] = useState(Boolean(d?.imgUrl));
  return (
    <Row>
      {imgOk ? (
        <Img
          src={d.imgUrl}
          alt={d.name ?? "강습소 이미지"}
          onError={() => setImgOk(false)}
        />
      ) : (
        <PlaceholderImg>(image)</PlaceholderImg>
      )}

      <Name>{d?.name ?? "-"}</Name>

      <div>
        <RateWrap>
          <StarIcon />
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
          >
            <span>{d?.score != null ? Number(d.score).toFixed(1) : "-"}</span>
            <small>({d?.reviewCount ?? 0})</small>
          </div>
        </RateWrap>
      </div>

      <DongCol>{d?.region ?? "-"}</DongCol>

      <PriceCol>
        <div>
          <b>1회 강습료:</b>
        </div>
        <div>{d?.price1 ?? "-"}</div>
        {/*eslint-disable-next-line */}
        <a
          onClick={() => {
            /* TODO: 가격표 보기 */
          }}
        >
          가격표 보기
        </a>
      </PriceCol>

      <EquipCol>{d?.price2 ?? "-"}</EquipCol>

      <ReviewCol>{d?.aiReview ?? "-"}</ReviewCol>

      <RemoveBtn onClick={onRemove}>×</RemoveBtn>
    </Row>
  );
}

/* =========================
   Page Component
========================= */

const ComparePage = () => {
  // 로컬스토리지 값
  const [{ item1, item2, item3, ids }, setLocal] = useState(() =>
    loadIdsFromLocalStorage()
  );
  const [data, setData] = useState(null);

  // 마운트 시 갱신
  useEffect(() => {
    setLocal(loadIdsFromLocalStorage());
  }, []);

  // 전송할 유효 id 정제
  const payload = useMemo(() => {
    const list = [];
    if (item1 != null && item1 !== -1) list.push(item1);
    if (item2 != null && item2 !== -1) list.push(item2);
    if (item3 != null && item3 !== -1) list.push(item3);
    if (Array.isArray(ids))
      list.push(...ids.filter((v) => v != null && v !== -1));
    const uniq = Array.from(new Set(list));
    return {
      item1: uniq[0] ?? -1,
      item2: uniq[1] ?? -1,
      item3: uniq[2] ?? -1,
      allIds: uniq,
    };
  }, [item1, item2, item3, ids]);

  const validCount = payload.allIds.length;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 유효 id가 1개 이상일 때만 호출
  useEffect(() => {
    let cancelled = false;
    if (validCount === 0) {
      setData(null);
      return;
    }

    const client = axios.create({
      baseURL: API_BASE_URL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      timeout: 15000,
    });

    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await client.post("/compare/details", {
          item1: payload.item1,
          item2: payload.item2,
          item3: payload.item3,
        });
        if (!cancelled) setData(res.data);
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.status;
        const d = err?.response?.data;
        setError(
          typeof d === "string"
            ? d
            : d?.message || `요청 실패 (status: ${status ?? "unknown"})`
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [payload.item1, payload.item2, payload.item3, validCount]);

  // 데이터 표준화: 배열로 맞추기
  const list = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  // 삭제 버튼 클릭 시 (필요하면 compareStorage에 맞춰 저장 로직 추가)
  const handleRemove = (idx) => {
    console.log("remove clicked at index:", idx);
    // TODO: 로컬스토리지 비교함에서 제거하고 setLocal로 갱신
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

      {/* 0개: 파란 안내 상자 3개 */}
      {validCount === 0 && (
        <>
          {[0, 1, 2].map((k) => (
            <Empty key={k}>
              <Box
                onClick={() => navigate("/")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/");
                }}
                aria-label="강습소 선택하러 가기"
              >
                <Plus>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="33"
                    viewBox="0 0 34 33"
                    fill="none"
                  >
                    <path
                      d="M25.1008 18.0705H18.3508V24.8205C18.3508 25.1785 18.2086 25.5219 17.9554 25.7751C17.7022 26.0283 17.3588 26.1705 17.0008 26.1705C16.6427 26.1705 16.2994 26.0283 16.0462 25.7751C15.793 25.5219 15.6508 25.1785 15.6508 24.8205V18.0705H8.90078C8.54274 18.0705 8.19936 17.9283 7.94619 17.6751C7.69301 17.4219 7.55078 17.0786 7.55078 16.7205C7.55078 16.3625 7.69301 16.0191 7.94619 15.7659C8.19936 15.5127 8.54274 15.3705 8.90078 15.3705H15.6508V8.62051C15.6508 8.26247 15.793 7.91909 16.0462 7.66591C16.2994 7.41274 16.6427 7.27051 17.0008 7.27051C17.3588 7.27051 17.7022 7.41274 17.9554 7.66591C18.2086 7.91909 18.3508 8.26247 18.3508 8.62051V15.3705H25.1008C25.4588 15.3705 25.8022 15.5127 26.0554 15.7659C26.3086 16.0191 26.4508 16.3625 26.4508 16.7205C26.4508 17.0786 26.3086 17.4219 26.0554 17.6751C25.8022 17.9283 25.4588 18.0705 25.1008 18.0705Z"
                      fill="#2F83F3"
                    />
                  </svg>
                </Plus>
              </Box>
              <Ment>강습소를 선택해 주세요.</Ment>
            </Empty>
          ))}
        </>
      )}

      {/* 1~2개: 데이터 행 + 빈 자리(파란 박스)로 3칸 맞추기 */}
      {validCount > 0 && validCount < 3 && (
        <>
          {loading && <Empty>불러오는 중…</Empty>}
          {!!error && <Empty style={{ color: "crimson" }}>에러: {error}</Empty>}

          {!loading && !error && list.length > 0 && (
            <>
              {list.slice(0, validCount).map((d, i) => (
                <CompareRow key={i} d={d} onRemove={() => handleRemove(i)} />
              ))}
              {[...Array(3 - validCount)].map((_, k) => (
                <Empty key={`ph-${k}`}>
                  <Box
                    onClick={() => navigate("/")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") navigate("/");
                    }}
                    aria-label="강습소 선택하러 가기"
                  >
                    <Plus>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="33"
                        viewBox="0 0 34 33"
                        fill="none"
                      >
                        <path
                          d="M25.1008 18.0705H18.3508V24.8205C18.3508 25.1785 18.2086 25.5219 17.9554 25.7751C17.7022 26.0283 17.3588 26.1705 17.0008 26.1705C16.6427 26.1705 16.2994 26.0283 16.0462 25.7751C15.793 25.5219 15.6508 25.1785 15.6508 24.8205V18.0705H8.90078C8.54274 18.0705 8.19936 17.9283 7.94619 17.6751C7.69301 17.4219 7.55078 17.0786 7.55078 16.7205C7.55078 16.3625 7.69301 16.0191 7.94619 15.7659C8.19936 15.5127 8.54274 15.3705 8.90078 15.3705H15.6508V8.62051C15.6508 8.26247 15.793 7.91909 16.0462 7.66591C16.2994 7.41274 16.6427 7.27051 17.0008 7.27051C17.3588 7.27051 17.7022 7.41274 17.9554 7.66591C18.2086 7.91909 18.3508 8.26247 18.3508 8.62051V15.3705H25.1008C25.4588 15.3705 25.8022 15.5127 26.0554 15.7659C26.3086 16.0191 26.4508 16.3625 26.4508 16.7205C26.4508 17.0786 26.3086 17.4219 26.0554 17.6751C25.8022 17.9283 25.4588 18.0705 25.1008 18.0705Z"
                          fill="#2F83F3"
                        />
                      </svg>
                    </Plus>
                  </Box>
                  <Ment>강습소를 선택해 주세요.</Ment>
                </Empty>
              ))}
            </>
          )}
        </>
      )}

      {/* 3개: 데이터 3행 */}
      {validCount >= 3 && (
        <>
          {loading && <Empty>불러오는 중…</Empty>}
          {!!error && <Empty style={{ color: "crimson" }}>에러: {error}</Empty>}
          {!loading && !error && list.length > 0 && (
            <>
              {list.slice(0, 3).map((d, i) => (
                <CompareRow key={i} d={d} onRemove={() => handleRemove(i)} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ComparePage;
