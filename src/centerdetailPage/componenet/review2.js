import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const Review = styled.div`
  position:absolute;
  left: 180px;
  top:1325.72px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  user-select:none;
`;

const Write = styled.div`
  position:absolute;
  left: 973px;
  top:1325.72px;
  color: #2285E3;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  user-select:none;
`;

const Nickname = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  padding-bottom:4px;
  user-select:none;
`;

const Stardate = styled.div`
  color: #C5C5C5;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  padding-bottom:12px;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select:none;
`;

const Content = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  user-select:none;
`;

const ReviewList = styled.div`
  position: absolute;
  left: 180px;
  top: 1381.72px;
  width: 880px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  user-select:none;
 padding-bottom: 150px; /* 전체 리스트 끝에 여백 */
`;

const BoxWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #D9D9D9;
  user-select:none;
  
  
`;

const Rating = styled.span`
  color: #ff517e;
  font-weight: 600;
  user-select:none;
`;

/* 더 보기 버튼 */
const MoreWrap = styled.div`
    display: inline-flex;
    margin-bottom:100px;
    user-select:none;
`;
const MoreButton = styled.button`
  padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 6px;
border:none;
background: var(--Foundation-Blue-blue-200, #DBDFE3);
color: #000;
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 600;
line-height: normal;
  cursor: pointer;
`;

const API_BASE_URL = "https://www.liketiger.info:443";

function normalizeCenter(raw) {
  if (!raw || raw.id == null) return null;
  return { id: Number(raw.id) };
}

export default function Review2({ center }) {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);        // ✅ 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const c = normalizeCenter(center);

  const fetchReviewData = useCallback(async (centerId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/location/reviews/${centerId}`);

      const list = Array.isArray(response.data)
        ? response.data
        : (response.data?.items ?? []);

      const normalized = list.map((it, idx) => ({
        id: it.id ?? idx,
        nickname: it.name ?? it.nickname ?? "익명",
        content: it.content ?? "",
        rating: it.score ?? it.rating ?? 0,
        date: it.time ?? it.createdAt ?? "",
      }));
      setReviews(normalized);
      setVisibleCount(10);                                     // ✅ 새 데이터 들어오면 초기화
    } catch (e) {
      console.error(e);
      setError("데이터를 불러오지 못했습니다.");
      setReviews([]);
      setVisibleCount(10);                                     // ✅ 오류 시도 초기화(안전)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!c) return;
    fetchReviewData(c.id);
  }, [c?.id, fetchReviewData]);

  if (!c) return null;

  const visibleReviews = reviews.slice(0, visibleCount);       // ✅ 잘라서 표시
  const canShowMore = visibleCount < reviews.length;           // ✅ 더 보기가 가능한지

  const handleShowMore = () => {
    setVisibleCount((n) => Math.min(n + 10, reviews.length));  // ✅ 10개씩 증가
  };

  return (
    <div>
      <Review>방문자 리뷰 ({loading ? "…" : reviews.length})</Review>
      <Write>
        리뷰 작성하기{" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M0.625977 11.001L6.62598 6.00098L0.625976 1.00098" stroke="#9A9A9A" strokeWidth="1.4" />
        </svg>
      </Write>

      <ReviewList>
        {loading && <BoxWrapper><Nickname>불러오는 중…</Nickname></BoxWrapper>}
        {error && !loading && <BoxWrapper><Nickname>{error}</Nickname></BoxWrapper>}
        {!loading && !error && reviews.length === 0 && (
          <BoxWrapper><Nickname>아직 리뷰가 없습니다.</Nickname></BoxWrapper>
        )}

        {!loading && !error && visibleReviews.map((r) => (
          <BoxWrapper key={r.id}>
            <Nickname>{r.nickname}</Nickname>
            <Stardate>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M7.62598 0.500977L9.19757 5.33786H14.2834L10.1689 8.32721L11.7405 13.1641L7.62598 10.1747L3.51148 13.1641L5.08308 8.32721L0.968581 5.33786H6.05438L7.62598 0.500977Z" fill="#FF517E"/>
              </svg>
              <Rating>{r.rating}</Rating> · {r.date}일 전
            </Stardate>
            <Content>{r.content}</Content>
          </BoxWrapper>
        ))}

        {/* ✅ 더 보기 버튼 */}
        {!loading && !error && canShowMore && (
          <MoreWrap>
            <MoreButton onClick={handleShowMore}>
              10개의 후기 더보기
            </MoreButton>
          </MoreWrap>
        )}
      </ReviewList>
    </div>
  );
}
