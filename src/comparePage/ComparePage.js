import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Delete from "../common/Deletemodal"; // ✅ 삭제 확인 모달
import Footer from "../common/Footer";
import { useCompareBasket } from "../common/compareBasket";
import PriceImageModal from "../common/PriceImageModal";
import { toAbsUrl } from "../common/url";
/* =========================
   Styled Components
========================= */

const SidebarWrapper = styled.div`
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 1060px;
  height: 60px;
  flex-shrink: 0;
`;

const Category = styled.div`
  margin-left: 175px;
  width: 880px;
  height: 60px;
  background: #2f83f3;
  border-radius: 12px 12px 0 0;
  padding: 0 8px 0 16px;
  display: grid;
  grid-template-columns: 160px 101px 100px 280px 200px 40px;
  align-items: center;
  color: #fff;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  user-select: none;
  padding: 0 8px 0 0;
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
const HeadCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  margin-left: 175px;
  width: 880px;
  height: 220px;
  background: ${({ $isEdge }) => ($isEdge ? "#F1F7FF" : "transparent")};
`;

const Img = styled.img`
  width: 160px;
  height: 220px;
  object-fit: cover;
  background: #e5e7eb;
  color: #9ca3af;
`;

const PlaceholderImg = styled.div`
  position: absolute;
  width: 160px;
  height: 220px;
  background: #e5e7eb;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const RegionWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  line-height: 1.4;
  border-right: 1px solid #e7e9ec;

  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const PriceWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: left;
  justify-content: center;
  box-sizing: border-box;
  text-align: left;
  line-height: 1.4;
  padding-left: 11px;

  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #111827;
  min-width: 0;
  border-right: 1px solid #e7e9ec;
`;

const Practice = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
`;

const Price = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const PriceText = styled.div`
  color: #000;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
const Space = styled.div`
  padding-top: 3px;
  padding-left: 35px;
`;

const GBbox = styled.div`
  display: flex;
  flex-direction: column;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const GoodWrapper = styled.div`
  width: 280px;

  display: flex;
  justify-content: left;
  padding-left: 15px;
  border-right: 1px solid #e7e9ec;
  flex-direction: column;
`;

const GoodList = styled.ol`
  margin: 0;
  padding-left: 18px; /* 번호 들여쓰기 */
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere; /* 긴 단어 줄바꿈 */
  text-align: left;
  white-space: normal; /* 자동 줄바꿈 허용 */
  overflow-wrap: anywhere; /* 긴 단어도 강제 줄바꿈 */
  word-break: keep-all; /* 한글 단어 중간 끊김 최소화 */
  width: 100%;
  list-style-type: disc;
`;
const BadList = styled.ol`
  margin: 0;
  padding-left: 18px; /* 번호 들여쓰기 */
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: anywhere; /* 긴 단어 줄바꿈 */
  text-align: left;
  white-space: normal; /* 자동 줄바꿈 허용 */
  overflow-wrap: anywhere; /* 긴 단어도 강제 줄바꿈 */
  word-break: keep-all; /* 한글 단어 중간 끊김 최소화 */
  width: 100%;
  list-style-type: disc;
`;
const BadWrapper = styled.div`
  padding-bottom: 20px;
  padding-left: 15px;
  width: 280px;
  height: 50%;
  display: flex;
  justify-content: left;
  border-right: 1px solid #e7e9ec;
  flex-direction: column;
`;
const Bad = styled.div`
  padding-top: 12px;
  padding-left: 15px;
  color: var(--Foundation-Red-red-600, #e84a73);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  border-right: 1px solid #e7e9ec;
`;

const ReviewWrapper = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  align-items: left;
  justify-content: center;
  box-sizing: border-box;
  text-align: left;
  padding-right: 22px;
  padding-left: 22px;
  width: 200px;
  border-right: 1px solid #e7e9ec;
  flex-direction: column;

  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const RemoveBtn = styled.button`
  width: 49px;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  text-align: center;
  display: inline-flex;
  border: 0;
  background: transparent;
  padding-left: 13px;
  margin: 0 auto;
`;
const Good = styled.div`
  padding-top: 20px;
  padding-left: 11px;
  color: var(--Foundation-main-blue-600, #2b77dd);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  border-right: 1px solid #e7e9ec;
`;
const Card = styled.div`
  position: relative; /* 자식 절대배치 기준 */
`;

const Tag = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;

  display: flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background: var(--Foundation-Red-red-50, #ffeef2);

  color: var(--Foundation-Red-red-500, #ff517e);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */

  text-align: center;
  white-space: nowrap; /* ✅ 줄바꿈 금지 */
  writing-mode: horizontal-tb;
`;

const Tag2 = styled.div`
  position: absolute;
  top: 40px;
  left: 8px;
  border-radius: 6px;
  background: var(--Foundation-Blue-blue-50, #f7f8f9);
  width: 59px;
  height: 28px;
  flex-shrink: 0;
  display: flex;
  width: 47px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: var(--Foundation-Blue-blue-900, #4a4e52);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

/* =========================
   Constants
========================= */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* =========================
   Helper Components
========================= */

function CompareRow({ d, onRemove, isEdge }) {
  const [imgOk, setImgOk] = useState(Boolean(d?.imgUrl));
  const hasPriceImg = Boolean(d?.priceImgUrl);
  const [openPrice, setOpenPrice] = useState(false);
  const priceImgUrl = hasPriceImg ? toAbsUrl(d.priceImgUrl) : null;

  const items = (d?.goodPart || "").split(/\s*,\s*/).filter(Boolean);
  const items2 = (d?.badPart || "").split(/\s*,\s*/).filter(Boolean);

  return (
    <Row $isEdge={isEdge}>
      <Card>
        <Tag>{d.name}</Tag>
        <Tag2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 0.723633L8.5716 5.56051H13.6574L9.5429 8.54987L11.1145 13.3868L7 10.3974L2.8855 13.3868L4.4571 8.54987L0.342604 5.56051H5.4284L7 0.723633Z"
              fill="#4A4E52"
            />
          </svg>
          {Number(d.score).toFixed(1)}
        </Tag2>
        {imgOk ? (
          <Img
            src={d.imgUrl}
            alt={d.name ?? "강습소 이미지"}
            onError={() => setImgOk(false)}
          />
        ) : (
          <PlaceholderImg>(image)</PlaceholderImg>
        )}
      </Card>

      <RegionWrapper>{d?.region ?? "-"}</RegionWrapper>

      <PriceWrapper>
        <Practice>강습가</Practice>
        <Space />
        <Price>{d?.price1 ?? "-"}</Price>
        <Space />
        <svg
          width="60"
          height="2"
          viewBox="0 0 60 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.223633" width="60" height="1" fill="#E7E9EC" />
        </svg>
        <Space />
        <Space />
        <Practice>장비렌탈가</Practice>
        <Space />
        <Price>{d?.price2 ?? "-"}</Price>
        <Space />
        <button
          type="button"
          disabled={!hasPriceImg}
          onClick={() => hasPriceImg && setOpenPrice(true)}
          style={{
            all: "unset",
            cursor: hasPriceImg ? "pointer" : "default",
          }}
        >
          <PriceText>
            {hasPriceImg ? "가격표 보기" : "가격 정보 없음"}
          </PriceText>
        </button>

        {openPrice && (
          <PriceImageModal
            src={priceImgUrl}
            onClose={() => setOpenPrice(false)}
          />
        )}
      </PriceWrapper>

      <GBbox>
        <Good>좋은 점</Good>
        <GoodWrapper>
          {items.length ? (
            <GoodList>
              {items.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </GoodList>
          ) : (
            "-"
          )}
        </GoodWrapper>
        <Bad>아쉬운 점</Bad>
        <BadWrapper>
          {items.length ? (
            <BadList>
              {items2.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </BadList>
          ) : (
            "-"
          )}
        </BadWrapper>
      </GBbox>

      <ReviewWrapper>{d?.aiReview ?? "-"}</ReviewWrapper>

      <RemoveBtn aria-label="비교 목록에서 삭제">
        <button
          type="button"
          onClick={onRemove}
          aria-label="삭제"
          style={{
            all: "unset",
            cursor: "pointer",
            lineHeight: 0,
            display: "inline-flex",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            onClick={onRemove}
          >
            <rect width="24" height="24" rx="5" fill="#FF658C" />
            <path
              d="M7 7L17 17M7 17L17 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </RemoveBtn>
    </Row>
  );
}

/* =========================
   Page Component
========================= */

const ComparePage = () => {
  const navigate = useNavigate();

  // ✅ compareBasket 훅 (로컬스토리지  동기화)
  const { items = [], remove } = useCompareBasket();

  // 삭제 모달 state
  const [showDelete, setShowDelete] = useState(false);
  const [pending, setPending] = useState({ idx: null, id: null, name: "" });

  const [data, setData] = useState(null);
  const API = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    timeout: 15000,
  });

  // 바스켓 → API payload (앞에서부터 최대 3개)
  const payload = useMemo(() => {
    const ids = (items || []).slice(0, 3);
    return {
      item1: ids[0] ?? -1,
      item2: ids[1] ?? -1,
      item3: ids[2] ?? -1,
      allIds: ids,
    };
  }, [items]);

  const validCount = payload.allIds.length;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 유효 id가 1개 이상일 때만 호출
  useEffect(() => {
    let cancelled = false;
    if (validCount === 0) {
      setData(null);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.post("/compare/details", {
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
    // eslint-disable-next-line
  }, [payload.item1, payload.item2, payload.item3, validCount]); // items 변하면 재요청

  // 데이터 표준화: 배열로 맞추기
  const list = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  /* =========================
     삭제 동작: 모달 + 실제 제거
  ========================= */

  // 실제 삭제 수행
  const doRemove = (idx) => {
    const idToRemove = payload.allIds[idx];
    if (idToRemove == null) return;

    // 1) UI 낙관적 업데이트
    setData((prev) => {
      if (!prev) return prev;
      const arr = Array.isArray(prev) ? [...prev] : [prev];
      arr.splice(idx, 1);
      return arr;
    });

    // 2) 바스켓에서 제거 → items 변경 → payload/validCount 갱신
    remove(idToRemove);
  };

  // 아이콘 클릭 시: 모달 열기
  const askRemove = (idx) => {
    const id = payload.allIds[idx] ?? null;
    const name = list[idx]?.name || "";
    setPending({ idx, id, name });
    setShowDelete(true);
  };

  const confirmDelete = () => {
    if (pending.idx != null) doRemove(pending.idx);
    setShowDelete(false);
    setPending({ idx: null, id: null, name: "" });
  };

  const cancelDelete = () => {
    setShowDelete(false);
    setPending({ idx: null, id: null, name: "" });
  };

  return (
    <>
      <div className="container">
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>

        <Category>
          <HeadCell>강습소</HeadCell>
          <HeadCell>동네</HeadCell>
          <HeadCell>대표가격</HeadCell>
          <HeadCell>좋은 점/아쉬운 점</HeadCell>
          <HeadCell>리뷰 데이터 분석</HeadCell>
          <HeadCell></HeadCell>
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
                  aria-label="강습소 선택해 주세요"
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

        {/* 1~2개: 데이터 행 + 빈자리 채우기 */}
        {validCount > 0 && validCount < 3 && (
          <>
            {loading && <Empty>불러오는 중…</Empty>}
            {!!error && (
              <Empty style={{ color: "crimson" }}>에러: {error}</Empty>
            )}
            {!loading && !error && list.length > 0 && (
              <>
                {list.slice(0, validCount).map((d, i) => (
                  <CompareRow
                    key={i}
                    d={d}
                    onRemove={() => askRemove(i)}
                    isEdge={i === 0}
                  />
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
                      aria-label="강습소 선택해 주세요"
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
            {!!error && (
              <Empty style={{ color: "crimson" }}>에러: {error}</Empty>
            )}
            {!loading && !error && list.length > 0 && (
              <>
                {list.slice(0, 3).map((d, i) => (
                  <CompareRow
                    key={i}
                    d={d}
                    onRemove={() => askRemove(i)}
                    isEdge={i === 0 || i === 2}
                  />
                ))}
              </>
            )}
          </>
        )}

        {/* ✅ 삭제 확인 모달 */}
        {showDelete && (
          <Delete
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            title="삭제하시겠어요?"
            description={`"${
              pending.name || "선택한 항목"
            }"을(를) 비교 목록에서 제거합니다.`}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ComparePage;
