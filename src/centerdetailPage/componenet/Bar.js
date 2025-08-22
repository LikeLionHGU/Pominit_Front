import styled from "styled-components";
import { useCompareBasket } from "../../common/compareBasket";
import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { add, items = [] } = useCompareBasket();
  const c = normalizeCenter(center);

  const onClickCompare = () => {
    if (!c?.id) return;
    if (items.includes(c.id) || items.length >= 3) {
      navigate("/compare");
      return;
    }
    add(c.id);
    navigate("/compare");
  };

  const onClickReserve = () => {
    const url = toAbsUrl(c?.reserveLink);
    if (!url) return; // 버튼이 disabled라서 보통 여기 안 옴
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasReserve = Boolean(toAbsUrl(c?.reserveLink));

  return (
    <Bar>
      <Comparebtn type="button" onClick={onClickCompare}>비교하기</Comparebtn>
      <Register type="button" onClick={onClickReserve} disabled={!hasReserve}>
        예약하기
      </Register>
    </Bar>
  );
};

export default BarComponent;
