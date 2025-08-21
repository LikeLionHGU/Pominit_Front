import styled from "styled-components";
import { useCompareBasket } from "../../common/compareBasket";
import React from "react";
import { useNavigate } from "react-router-dom";

const Bar = styled.div`
  position: fixed;
  left:0;
  bottom:0;
  right:0;
  width: 100%;
  height: 72px;
  background: #D6EBFF;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 0 max(120px, env(safe-area-inset-right)) 
           calc(8px + env(safe-area-inset-bottom))
           max(16px, env(safe-area-inset-left));
  z-index: 1000;
  border-top: 1px solid #cfe5ff;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.06);
`;

const Comparebtn = styled.button`
  display: flex;
  width: 160px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  background: white;
  border: none;
  color: #2285E3;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
`;

const Register = styled.button`
  display: flex;
  width: 250px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 6px;
  background: #2285E3;
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
`;

function normalizeCenter(raw) {
  if (!raw) return null;
  const id = raw.id ?? raw.centerId ?? raw.locationId;
  return { id: Number.isFinite(Number(id)) ? Number(id) : null };
}

const BarComponent = ({ center }) => {
  const navigate = useNavigate();
  const { add, items = [] } = useCompareBasket();
  const c = normalizeCenter(center);

  const onClickCompare = () => {
    if (!c?.id) return; // 안전 가드

    // 이미 담겨 있으면 바로 이동
    if (items.includes(c.id)) {
      navigate("/compare");
      return;
    }

    // 최대 3개 제한
    if (items.length >= 3) {
      // 정책: 꽉 차 있으면 그냥 비교 페이지로만 이동 (UI 변화 없음)
      navigate("/compare");
      return;
    }

    // 담고 이동
    add(c.id);
    navigate("/compare");
  };

  return (
    <Bar>
      <Comparebtn type="button" onClick={onClickCompare}>비교하기</Comparebtn>
      <Register type="button">예약하기</Register>
    </Bar>
  );
};

export default BarComponent;
