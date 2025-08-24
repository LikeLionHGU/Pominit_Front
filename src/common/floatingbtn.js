import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCompareBasket } from "../common/compareBasket"; // ← 경로 확인!

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Wrapper = styled.div`
  user-select: none;
  display: inline-flex;
  padding: 13px 24px;
  align-items: center;
  gap: 12px;
  border-radius: 100px;
  background: #ffecf1;
  box-shadow: 0 4px 4px rgba(0,0,0,0.12);
  color: #ff517e;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  white-space: nowrap;
  overflow: hidden;
  z-index: 2147483647;
  &:focus-visible { outline: 2px solid #ff658c; outline-offset: 2px; }
  &[data-open="false"] { cursor: pointer; }
  &[data-open="true"] { cursor: default; svg { cursor: pointer; } }
`;

const Expand = styled.div`
  display: flex; justify-content: center; align-items: center; gap: 12px;
  max-width: 0; opacity: 0; overflow: hidden; transform: translateX(8px);
  transition: max-width 260ms ease, opacity 200ms ease 60ms, transform 200ms ease 60ms;
  &[data-open="true"] { max-width: 540px; opacity: 1; transform: translateX(0); }
`;

const Action = styled.button`
  display: flex; padding: 10px 32px; justify-content: center; align-items: center; gap: 10px;
  border-radius: 100px; background: #ff658c; border: 0; color: #fbfbfb;
  font-family: Pretendard, system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 600; line-height: 140%;
  cursor: pointer; &:hover { filter: brightness(0.95); } &:active { transform: translateY(1px); }
`;

const ImgBox = styled.div`
  position: relative; width: 96px; height: 54px; border-radius: 6px; border: 1px dashed #ff658c; background: #fff; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
  .placeholder { font-size: 11px; color: #ff658c; user-select: none; }
`;

const CloseButton = styled.button`
  position: absolute; top: 6px; right: 6px; width: 18px; height: 18px; border: none; border-radius: 4px; background: #c9c9c9;
  display: inline-flex; align-items: center; justify-content: center; padding: 0; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  &:hover { background: #bebebe; } &:active { transform: translateY(1px); }
  svg { width: 14px; height: 14px; display: block; }
`;

const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden="true">
    <rect y="24.7764" width="24" height="24" rx="12" transform="rotate(-90 0 24.7764)" fill="#FF658C"/>
    <path d="M14 7.77637L9 12.7764L14 17.7764" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 상대경로 -> 절대경로 보정
const toAbsUrl = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (!API_BASE_URL) {
    console.warn("API_BASE_URL is empty. Cannot build absolute URL for:", u);
    return u;
  }
  return `${API_BASE_URL}${u.startsWith("/") ? "" : "/"}${u}`;
};

const FALLBACK_THUMB =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='192' height='108'>
      <rect width='100%' height='100%' fill='#fff'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Arial' font-size='14' fill='#FF658C'>No Image</text>
    </svg>
  `);

export default function FloatingButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로컬스토리지/동기화는 훅이 담당
  const { items = [], add, remove } = useCompareBasket();

  const [open, setOpen] = useState(false);


  // 항상 길이 3으로 보관하는 썸네일 배열: [string|null, string|null, string|null]
  const [thumbs, setThumbs] = useState([null, null, null]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 라우터 state → 바스켓에 병합(중복/최대치 처리는 add가 담당)
  const routePayload = location.state?.comparePayload; // { item1, item2, item3 } | undefined
  useEffect(() => {
    if (!routePayload) return;
    const routeIds = [routePayload.item1, routePayload.item2, routePayload.item3]
      .map(Number)
      .filter(n => Number.isFinite(n) && n !== -1);
    if (routeIds.length === 0) return;
    routeIds.forEach(id => add(id));
    // 필요시 navigate(…, { replace:true, state:undefined })로 state 비우기 가능
  }, [routePayload, add, navigate]);

 

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

  // 썸네일 조회: 항상 3칸 유지. 없는 건 null로 둬서 빈 칸 유지.
  useEffect(() => {
    const hasAnyValid = [payload.item1, payload.item2, payload.item3]
      .some(v => v != null && v !== -1);

    // 기본값: 언제나 3칸(전부 빈 칸)
    if (!hasAnyValid) { setThumbs([null, null, null]); return; }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.post(
          `${API_BASE_URL}/compare/thumb`,
          { item1: payload.item1, item2: payload.item2, item3: payload.item3 },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            timeout: 15000,
          }
        );

        const { thumb1, thumb2, thumb3 } = res.data ?? {};
        // ✨ index를 보존하기 위해 filter 금지. 없는 건 null로 둔다.
        const byIndex = [
          typeof thumb1 === "string" && thumb1.trim() !== "" ? thumb1 : null,
          typeof thumb2 === "string" && thumb2.trim() !== "" ? thumb2 : null,
          typeof thumb3 === "string" && thumb3.trim() !== "" ? thumb3 : null,
        ];

        if (!cancelled) setThumbs(byIndex);
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.status;
        const d = err?.response?.data;
        setError(typeof d === "string" ? d : d?.message || `요청 실패 (status: ${status ?? "unknown"})`);
        // 에러여도 3칸 플레이스홀더 유지
        setThumbs([null, null, null]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [payload.item1, payload.item2, payload.item3]);

  // 특정 경로에서 숨길 경우
  if (location.pathname === "/signup") return null;
  if (location.pathname === "/login") return null;

  const toggle = () => setOpen(v => !v);
  const goCompare = (e) => { e.stopPropagation(); navigate("/compare"); };
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };

  return (
    <>

    <Wrapper
      data-open={open}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={open ? "비교함 패널 닫기" : "비교함 패널 열기"}
      onClick={toggle}
      onKeyDown={onKey}
    >
      {!open && <Icon />}
      {!open && "비교함"}

      <Expand data-open={open} onClick={(e) => e.stopPropagation()}>
        {/* 닫기 아이콘 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={toggle} aria-label="패널 닫기">
          <rect y="24.4473" width="24" height="24" rx="12" transform="rotate(-90 0 24.4473)" fill="#FF658C"/>
          <path d="M10.5 17.4473L15.5 12.4473L10.5 7.44727" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* 👉 항상 3칸 렌더 */}
        {[0,1,2].map((i) => {
          const idAtSlot = payload.allIds[i];       // 이 칸에 담긴 center id (없으면 undefined)
          const url = thumbs[i];                    // 썸네일 URL 또는 null
          const showRemove = idAtSlot != null;      // 담긴 항목이 있을 때만 X버튼 노출

          return (
            <ImgBox key={i} title={url ? toAbsUrl(url) : (error ? `오류: ${error}` : "빈 칸")}>
              {loading && idAtSlot != null ? (
                // 담긴 항목이면 로딩 중일 때 임시 이미지
                <img src={FALLBACK_THUMB} alt="로딩 중" />
              ) : url ? (
                <img
                  src={toAbsUrl(url)}
                  alt={`비교 썸네일 ${i + 1}`}
                  onError={(e) => { e.currentTarget.src = FALLBACK_THUMB; }}
                />
              ) : (
                <span className="placeholder" />
              )}

              {showRemove && (
                <CloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    // 1) 이 슬롯만 즉시 비우기(자리 유지)
                    setThumbs(prev => {
                      const copy = [...prev];
                      copy[i] = null;
                      return copy;
                    });
                    // 2) 바스켓에서도 제거(실제 항목 제거 → payload/재요청으로 재정렬)
                    remove(idAtSlot);
                  }}
                  aria-label="삭제"
                >
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 5 L15 15 M15 5 L5 15" stroke="#FFFFFF" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </CloseButton>
              )}
            </ImgBox>
          );
        })}

        <Action onClick={goCompare}>
          {loading ? "불러오는 중..." : "비교하기"}
        </Action>
      </Expand>
    </Wrapper>
    </>
  );
}
