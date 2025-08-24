import styled from "styled-components";
import { useCompareBasket } from "../../common/compareBasket";
import React, { useRef, useState, useEffect } from "react"; // ← useRef/useState/useEffect 필요
import Modal from "../../common/fullModal";



const ToastWrap = styled.div`
 position: fixed;
  bottom: 160px;
  right: 70px;
  transform: translateX(-50%);
  z-index: 99999;
  pointer-events: none;
  opacity: ${p => (p.$show ? 1 : 0)};
  transition: opacity 200ms ease;
  
`;

const ToastInner = styled.div`
  position: relative;
  width: 132px;
  height: 43px;
  display: inline-block;
  svg { display: block; }
`;

const ToastText = styled.div`
  position: absolute;
inset: 0;                               /* 전체 채우기 */
display: flex;
align-items: center;                    /* 세로 중앙 */
justify-content: center;                /* 가로 중앙 */
transform: translateY(-5px);            /* 살짝 위로 (원하면 2~4px 조정) */
  color: #fff;
  font-family: Pretendard, system-ui, -apple-system, sans-serif;
font-size: 14px;                        /* 13 → 14로 가독성 ↑ (취향껏) */
font-weight: 600;                       /* 700 → 600: 한글 번짐 ↓ */
line-height: 1.2;
`;

function Toast({ open, children }) {
  return (
    <ToastWrap role="status" aria-live="polite" $show={open}>
      <ToastInner>
        {/* 분홍 말풍선 */}
        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="43" viewBox="0 0 132 43" fill="none" aria-hidden="true">
          <path d="M126 0C129.314 1.15966e-06 132 2.68629 132 6V27.9805C132 31.2942 129.314 33.9805 126 33.9805H119.779L114.866 42.4902C114.481 43.1569 113.519 43.1569 113.134 42.4902L108.221 33.9805H6C2.68629 33.9805 9.27407e-08 31.2942 0 27.9805V6C9.27407e-08 2.68629 2.68629 9.66384e-08 6 0H126Z" fill="#FF658C"/>
        </svg>
        <ToastText>{children}</ToastText>
      </ToastInner>
    </ToastWrap>
  );
}



const Bar = styled.div`
  position: fixed;
  left:0; bottom:0; right:0;
  width: 100%; height: 72px;
  background: #BFD9FB;
  display: flex; justify-content: flex-end; align-items: center; gap: 16px;
  padding: 0 max(120px, env(safe-area-inset-right)) 
           calc(8px + env(safe-area-inset-bottom))
           max(16px, env(safe-area-inset-left));
  z-index: 1000;
  border-top: 1px solid #cfe5ff;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.06);
`;

const Comparebtn = styled.button`
  display: flex; width: 160px; padding: 12px 16px;
  justify-content: center; align-items: center; gap: 8px;
  border-radius: 6px; background: #fff; border: none;
  color: #2285E3; font-family: Pretendard; font-size: 16px; font-weight: 600; line-height: 140%;
  cursor: pointer;
  &:active { background:#EAF3FE; }
`;

const Register = styled.button`
  display: flex; width: 250px; padding: 12px 16px;
  justify-content: center; align-items: center; gap: 8px;
  border: none; border-radius: 6px; background: #2285E3;
  color: #FFF; text-align: center;
  font-family: Pretendard; font-size: 16px; font-weight: 600; line-height: 140%;
  cursor: pointer;
  &:active { background:#2B77DD; }
  &:disabled {
    opacity: .5;
    cursor: not-allowed;
  }
`;

function normalizeCenter(raw) {
  if (!raw) return null;
  const id = raw.id ?? raw.centerId ?? raw.locationId;
  return {
    id: Number.isFinite(Number(id)) ? Number(id) : null,
    reserveLink: raw.reserveLink ?? raw["예약링크"],
  };
}

// https 없으면 자동으로 붙여 절대 URL로
const toAbsUrl = (u) => {
  if (!u || typeof u !== "string") return null;
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u.replace(/^\/*/, "")}`;
};

const BarComponent = ({ center }) => {
  const { add, items = [] } = useCompareBasket();
  const c = normalizeCenter(center);
  const [maxModalOpen, setMaxModalOpen] = useState(false);

    // 🔔 토스트 상태
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const toastTimerRef = useRef(null);
    
  const showToast = (msg) => {
    setToastMsg(msg);
    setToastOpen(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastOpen(false), 1600);
  };

  useEffect(() => () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
  }, []);

  const onClickCompare = () => {
    if (!c?.id) return;

    if (items.includes(c.id)) {
      showToast("이미 담겼어요");
      return;
    }
    if (items.length >= 3) {
      setMaxModalOpen(true);
      return;
    }

    add(c.id);
    // 추가 후 개수(즉시 반영 UX용): 현재 길이 + 1
    showToast(`${items.length + 1}개가 담겼어요`);
  };


  const onClickReserve = () => {
    const url = toAbsUrl(c?.reserveLink);
    if (!url) return; // 버튼이 disabled라서 보통 여기 안 옴
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasReserve = Boolean(toAbsUrl(c?.reserveLink));

  return (
    <>
    <Toast open={toastOpen}>{toastMsg}</Toast>
    <Bar>
      <Comparebtn type="button" onClick={onClickCompare}>비교함 담기</Comparebtn>
      <Register type="button" onClick={onClickReserve} disabled={!hasReserve}>
        예약하기
      </Register>
    </Bar>
     {maxModalOpen && (
   <Modal
     open={maxModalOpen}
     title="비교함은 최대 3개까지"
     description="세 곳까지만 비교할 수 있어요. 담긴 항목을 빼고 다시 시도해 주세요."
     confirmText="확인"
     cancelText=""
     onClose={() => setMaxModalOpen(false)}
     onConfirm={() => setMaxModalOpen(false)}
   />
 )}
    </>
  );
};

export default BarComponent;
