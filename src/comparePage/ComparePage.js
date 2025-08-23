import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Delete from "../common/Deletemodal"; // ✅ 삭제 확인 모달
import { useCompareBasket } from "../common/compareBasket";
import PriceImageModal from "../common/PriceImageModal";
import { toAbsUrl } from "../common/url";
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
  margin-left: 175px;
  width: 880px;
  height: 60px;
  background: #2f83f3;
  border-radius: 12px 12px 0 0;
  padding: 0 8px 0 16px;
  display: grid;
  grid-template-columns: 170px 100px 75px 104px 120px 110px 1fr 30px;
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
  height: 220px;
  border-bottom: 1px solid #d9d9d9;
  transition: background 0.15s ease;
  &:hover {
    background: #fafcff;
  }
`;

const Img = styled.img`
  width: 160px;
  height: 220px;
  object-fit: cover;
  background: #e5e7eb;
  color: #9ca3af;
  border-radius: 4px;
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
  border-radius: 4px;
`;

const Namebox = styled.div`
  width: 115px;
  padding: 15px;
`;
const Name = styled.div`
  overflow-wrap: break-word;
  display: flex;
  width: 100px;

  text-align: center;
  padding-top: 75px;
  padding-left: 10px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const Region = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 75px;
  text-align: center;
  padding-left: 0px;
  padding-top: 92.5px;
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const PracticePrice = styled.div`
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  padding-top: 30px;

  text-align: center;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const Space = styled.div`
  padding-top: 3px;
  padding-left: 35px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #111827;
  min-width: 0;
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
`;

const Good = styled.div`
  justify-content: flex-start; /* 수평(주축) 왼쪽 */
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
  text-align: left;

  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 0px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
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
`;
const Bad = styled.div`
  justify-content: flex-start; /* 수평(주축) 왼쪽 */
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;
  text-align: left;
  padding-left: 5px;
  padding-right: 0px;
  padding-bottom: 20px;
  padding-top: 20px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
`;

const ReviewCol = styled.div`
  padding: 10px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
  padding-right: 8px;
  overflow: hidden;
`;

const RemoveBtn = styled.button`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
`;

/* =========================
   Constants
========================= */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/* =========================
   Helper Components
========================= */

function CompareRow({ d, onRemove }) {
  const [imgOk, setImgOk] = useState(Boolean(d?.imgUrl));
  const hasPriceImg = Boolean(d?.priceImgUrl);
  const [openPrice, setOpenPrice] = useState(false);
  const priceImgUrl = hasPriceImg ? toAbsUrl(d.priceImgUrl) : null;

  const items = (d?.goodPart || "").split(/\s*,\s*/).filter(Boolean);

  const items2 = (d?.badPart || "").split(/\s*,\s*/).filter(Boolean);

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
      <Namebox>
        <Name>{d?.name ?? "-"}</Name>
      </Namebox>

      <div>
        <Region>
          <div
            style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
          >
            {d?.region ?? "-"}
          </div>
        </Region>
      </div>

      <PriceWrapper>
        <PracticePrice>
          강습가
          <Space />
          {d?.price1 ?? "-"}원
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
          장비렌탈가
          <Space />
          {d?.price2 ?? "-"}원
          <Space />
          <button
            type="button"
            disabled={!hasPriceImg}
            onClick={() => hasPriceImg && setOpenPrice(true)}
            style={{
              all: "unset",
              textDecoration: hasPriceImg ? "underline" : "none",
              cursor: hasPriceImg ? "pointer" : "default",
            }}
          >
            {hasPriceImg ? "가격표 보기" : "가격 정보 없음"}
          </button>
          {openPrice && (
            <PriceImageModal
              src={priceImgUrl}
              onClose={() => setOpenPrice(false)}
            />
          )}
        </PracticePrice>
      </PriceWrapper>

      <Good>
        {items.length ? (
          <GoodList>
            {items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </GoodList>
        ) : (
          "-"
        )}
      </Good>

      <Bad>
        {items2.length ? (
          <BadList>
            {items2.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </BadList>
        ) : (
          "-"
        )}
      </Bad>

      <ReviewCol>{d?.aiReview ?? "-"}</ReviewCol>

      <RemoveBtn onClick={onRemove} aria-label="비교 목록에서 삭제">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
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
      </RemoveBtn>
    </Row>
  );
}

/* =========================
   Page Component
========================= */

const ComparePage = () => {
  const navigate = useNavigate();

  // ✅ compareBasket 훅 (로컬스토리지 + 동기화)
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
    <div className="container">
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <Category>
        <HeadCell>강습소</HeadCell>
        <HeadCell>강습소명</HeadCell>
        <HeadCell>동네</HeadCell>
        <HeadCell>대표가격</HeadCell>
        <HeadCell>장점</HeadCell>
        <HeadCell>단점</HeadCell>
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
          {!!error && <Empty style={{ color: "crimson" }}>에러: {error}</Empty>}
          {!loading && !error && list.length > 0 && (
            <>
              {list.slice(0, validCount).map((d, i) => (
                <CompareRow key={i} d={d} onRemove={() => askRemove(i)} />
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
          {!!error && <Empty style={{ color: "crimson" }}>에러: {error}</Empty>}
          {!loading && !error && list.length > 0 && (
            <>
              {list.slice(0, 3).map((d, i) => (
                <CompareRow key={i} d={d} onRemove={() => askRemove(i)} />
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
  );
};

export default ComparePage;
