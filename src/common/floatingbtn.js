import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCompareBasket } from "../common/compareBasket"; 

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

const toAbsUrl = (u) => {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  if (!API_BASE_URL) {
    
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

 
  const { items = [], add, remove } = useCompareBasket();

  const [open, setOpen] = useState(false);

  const [thumbs, setThumbs] = useState([null, null, null]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const routePayload = location.state?.comparePayload;
  useEffect(() => {
    if (!routePayload) return;
    const routeIds = [routePayload.item1, routePayload.item2, routePayload.item3]
      .map(Number)
      .filter(n => Number.isFinite(n) && n !== -1);
    if (routeIds.length === 0) return;
    routeIds.forEach(id => add(id));

  }, [routePayload, add, navigate]);

 


  const payload = useMemo(() => {
    const ids = (items || []).slice(0, 3);
    return {
      item1: ids[0] ?? -1,
      item2: ids[1] ?? -1,
      item3: ids[2] ?? -1,
      allIds: ids,
    };
  }, [items]);

  useEffect(() => {
    const hasAnyValid = [payload.item1, payload.item2, payload.item3]
      .some(v => v != null && v !== -1);


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
  
        setThumbs([null, null, null]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [payload.item1, payload.item2, payload.item3]);


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
       
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={toggle} aria-label="패널 닫기">
          <rect y="24.4473" width="24" height="24" rx="12" transform="rotate(-90 0 24.4473)" fill="#FF658C"/>
          <path d="M10.5 17.4473L15.5 12.4473L10.5 7.44727" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

     
        {[0,1,2].map((i) => {
          const idAtSlot = payload.allIds[i];       
          const url = thumbs[i];                    
          const showRemove = idAtSlot != null;      

          return (
            <ImgBox key={i} title={url ? toAbsUrl(url) : (error ? `오류: ${error}` : "빈 칸")}>
              {loading && idAtSlot != null ? (
          
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
                  
                    setThumbs(prev => {
                      const copy = [...prev];
                      copy[i] = null;
                      return copy;
                    });
                    
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
