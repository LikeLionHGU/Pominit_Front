import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { loadIdsFromLocalStorage } from "../common/compareStorage";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Wrapper = styled.div`
  user-select: none;
  position: fixed;
  bottom: 30px;
  right: 40px;
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
  img { width: 100%; height: 100%; object-fit: cover; border-radius: 6px; }
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
  
    const [open, setOpen] = useState(false);
    const [thumbs, setThumbs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    // 1) 로컬스토리지
    const [local, setLocal] = useState(() => loadIdsFromLocalStorage());
    useEffect(() => { setLocal(loadIdsFromLocalStorage()); }, []);
  
    // 2) 라우터 state(있으면 합침)
    const routePayload = location.state?.comparePayload; // { item1, item2, item3 } | undefined
  
    // 3) 최종 payload(중복 제거, 최대 3개, 없는 값은 -1로 채움)
    const payload = useMemo(() => {
      const fromLocal = [local?.item1, local?.item2, local?.item3, ...(Array.isArray(local?.ids) ? local.ids : [])]
        .filter(v => v != null && v !== -1);
      const fromRoute = [routePayload?.item1, routePayload?.item2, routePayload?.item3]
        .filter(v => v != null && v !== -1);
  
      const uniq = Array.from(new Set([...fromRoute, ...fromLocal])); // 라우터 우선
      return {
        item1: uniq[0] ?? -1,
        item2: uniq[1] ?? -1,
        item3: uniq[2] ?? -1,
        allIds: uniq,
      };
    }, [local, routePayload]);
  
    // API 호출 (POST)
    useEffect(() => {
      // 최소 하나라도 유효 id (-1 제외) 있어야 호출
      const hasAnyValid = [payload.item1, payload.item2, payload.item3]
        .some(v => v != null && v !== -1);
      if (!hasAnyValid) { setThumbs([]); return; }
    
      let cancelled = false;
    
      (async () => {
        try {
          setLoading(true);
          setError("");
    
          // ✅ POST: data 바디에 그대로 넣기 (params 아님!)
          const res = await axios.post(
            `${API_BASE_URL}/compare/thumb`,
            {
              item1: payload.item1,
              item2: payload.item2,
              item3: payload.item3,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              timeout: 15000,
            }
          );
    
          const { thumb1, thumb2, thumb3 } = res.data ?? {};
          // ✅ 중복을 "유지"하므로 Set 제거. null/빈문자만 필터
          const urls = [thumb1, thumb2, thumb3].filter(
            u => typeof u === "string" && u.trim() !== ""
          );
          console.log("🧪 urls(dup kept):", urls);
    
          if (!cancelled) setThumbs(urls);
        } catch (err) {
          if (cancelled) return;
          console.error("❌ API error:", err);
          const status = err?.response?.status;
          const d = err?.response?.data;
          setError(typeof d === "string" ? d : d?.message || `요청 실패 (status: ${status ?? "unknown"})`);
          setThumbs([]); // ✅ 문자열 말고 반드시 빈 배열
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    
      return () => { cancelled = true; };
    }, [payload, API_BASE_URL]);
    
  
    // 특정 경로에서 숨길 경우
    if (location.pathname === "/signup") return null;
    if (location.pathname === "/login") return null;
  
    const toggle = () => setOpen(v => !v);
    const goCompare = (e) => { e.stopPropagation(); navigate("/compare"); };
    const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } };
    const handleRemove = (e, i) => { e.stopPropagation(); /* TODO: 제거 로직 */ };
    const imgs = Array.isArray(thumbs) ? thumbs : []; 
    return (
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
  
    

{loading && (
  <ImgBox title="로딩 중"><img src={FALLBACK_THUMB} alt="로딩 중" /></ImgBox>
)}

{!loading && imgs.length > 0 && imgs.map((url, i) => (
  <ImgBox key={`${url}-${i}`} title={toAbsUrl(url)}>
    <img
      src={toAbsUrl(url)}
      alt={`비교 썸네일 ${i + 1}`}
      onError={(e) => { e.currentTarget.src = FALLBACK_THUMB; }}
    />
    <CloseButton onClick={(e) => { e.stopPropagation(); /* TODO: 제거 */ }} aria-label="삭제">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 5 L15 15 M15 5 L5 15" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </CloseButton>
  </ImgBox>
))}

{/* ✅ 에러가 있어도 최소한 플레이스홀더는 보이게 */}
{!loading && imgs.length === 0 && (
  <ImgBox title={error ? `오류: ${error}` : "썸네일 없음"}>
    <img src={FALLBACK_THUMB} alt="썸네일 없음" />
  </ImgBox>
)}

          <Action onClick={goCompare}>
            {loading ? "불러오는 중..." : "비교하기"}
          </Action>
        </Expand>
      </Wrapper>
    );
  }