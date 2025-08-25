import React, { useState, useEffect, useCallback, useMemo} from "react";
import styled from "styled-components";
import axios from "axios";
const Review =styled.div`
position: absolute;
top: 428.72px;
left: 180px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;
const R1 =styled.div`
position: absolute;
top: 458.72px;
left: 180px;
color: #000;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const Rgaze = styled.div`
  position: absolute;
  overflow:hidden;
  left: 455px;
  width: 520px;
  height: 36px;
  border-radius: 6px;
  background: #E6F3FF;
  display: flex;              
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;           
  z-index: 0;                 
`;

const GaugeFill = styled.div`
  position: absolute;
  inset: 0;              
  width: 0%;              
  background: #cfe7ff;  
  z-index: 0;            
  transition: width 300ms ease; 
`;

const Rtext = styled.div`
  color:#2B77DD;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  z-index:1;
`;

const Rscore = styled.div`
z-index:1;
color: #A0A8B1;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 140%; 
`;


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
function normalizeCenter(raw) {
  if (!raw || raw.id == null) return null;
  return { id: Number(raw.id) };
}


export default function Review1({center}) {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const c = normalizeCenter(center);
  
  const fetchReviewData = useCallback(async (centerId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_BASE_URL}/location/analysis/${centerId}`
      );
     

      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.items ?? [];

      const normalized = list.map((it, idx) => ({
        id: it.id ?? idx,
        count: it.count ?? it.count ?? "익명",
        content: it.content ?? "",
      }));
      setReviews(normalized);
      setVisibleCount(10); 
    } catch (e) {
      setError("데이터를 불러오지 못했습니다.");
      setReviews([]);
      setVisibleCount(10); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!c) return;
    fetchReviewData(c.id);
  }, [c?.id, fetchReviewData]);

  const visibleReviews = reviews.slice(0, visibleCount);

  const maxCount = useMemo(() => {
    if (!reviews.length) return 0;
    return Math.max(...reviews.map(r => Number(r.count) || 0));
  }, [reviews]);
  
  const percent = (n) => {
    const num = Number(n) || 0;
    if (maxCount <= 0) return 0;
    const p = (num / maxCount) * 100;
    return Math.max(8, Math.min(100, p));
  };
    return(
        <div>
           <Review>리뷰 데이터 분석</Review>
<R1>방문자가 작성한 리뷰에서 가장 많이 언급된 내용을 보여드려요!</R1>
{!loading && !error &&
  visibleReviews.map((i, index) => {
    const p = percent(i.count);
    return (
      <div key={i.id ?? index}>
        <Rgaze style={{ top: `${491.72 + index * 40}px` }}>
          <GaugeFill style={{ width: `${p}%` }} />
          <Rtext>{i.content}</Rtext>
          <Rscore>{Number(i.count) || 0}</Rscore>
        </Rgaze>
      </div>
    );
  })
}
        </div>
);
}