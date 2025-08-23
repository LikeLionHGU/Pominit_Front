import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// eslint-disable-next-line
import ReviewModal from "../../common/ReviewModal";
import LoginModal1 from "../../common/loginmodal"; // ✅ 네가 만든 로그인 모달

const Review = styled.div`
  position: absolute;
  left: 180px;
  top: 1325.72px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  user-select: none;
`;

const GO = styled.div`
  color: var(--Foundation-Blue-blue-700, #7d838a);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: normal; /* margin-right:5px; ← 삭제 */
`;

const Write = styled.div`
  position: absolute;
  left: 960px;
  top: 1325.72px;
  user-select: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 5px;

  padding: 6px 8px;
  border-radius: 6px;

  svg {
    display: block;
  }

  &:active {
    background: #e7e9ec;
    color: #7d838a;
  }
`;

const Nickname = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  padding-bottom: 4px;
  user-select: none;
`;

const Stardate = styled.div`
  color: #c5c5c5;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
`;

const Content = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  user-select: none;
`;

const ReviewList = styled.div`
  position: absolute;
  left: 180px;
  top: 1381.72px;
  width: 880px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  user-select: none;
  padding-bottom: 150px;
`;

const BoxWrapper = styled.div`
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #d9d9d9;
  user-select: none;
`;

const Rating = styled.span`
  color: #ff517e;
  font-weight: 600;
  user-select: none;
`;

const MoreWrap = styled.div`
  display: inline-flex;
  margin-bottom: 100px;
  user-select: none;
`;
const MoreButton = styled.button`
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: none;
  background: var(--Foundation-Blue-blue-200, #dbdfe3);
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function normalizeCenter(raw) {
  if (!raw || raw.id == null) return null;
  return { id: Number(raw.id) };
}

export default function Review2({ center }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false); // 리뷰 작성 모달

  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ 로그인 필요 모달
  const [selectedId, setSelectedId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const c = normalizeCenter(center);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return Boolean(token && token.trim());
  };

  const handleOpenModal = (id) => {
    if (!isLoggedIn()) {
      setShowLoginModal(true); // ✅ 로그인 모달 열기

      return;
    }
    setSelectedId(id);
    setShowModal(true); // 리뷰 작성 모달 열기
  };

  const fetchReviewData = useCallback(async (centerId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_BASE_URL}/location/reviews/${centerId}`
      );

      const list = Array.isArray(response.data)
        ? response.data
        : response.data?.items ?? [];

      const normalized = list.map((it, idx) => ({
        id: it.id ?? idx,
        nickname: it.name ?? it.nickname ?? "익명",
        content: it.content ?? "",
        rating: it.score ?? it.rating ?? 0,
        date: it.time ?? it.createdAt ?? "",
      }));
      setReviews(normalized);
      setVisibleCount(10);
    } catch (e) {
      console.error(e);
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
    // eslint-disable-next-line
  }, [c?.id, fetchReviewData]);

  if (!c) return null;

  const visibleReviews = reviews.slice(0, visibleCount);
  const canShowMore = visibleCount < reviews.length;
  const handleShowMore = () =>
    setVisibleCount((n) => Math.min(n + 10, reviews.length));

  return (
    <div>
      <Review>방문자 리뷰 ({loading ? "…" : reviews.length})</Review>

      <Write
        onClick={() => handleOpenModal(c.id)}
        role="button"
        aria-disabled={!c?.id}
        style={{
          opacity: c?.id ? 1 : 0.5,
          pointerEvents: c?.id ? "auto" : "none",
        }}
      >
        <GO>리뷰 작성하기</GO>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
        >
          <path
            d="M1.5 11L6.5 6L1.5 1"
            stroke="#7D838A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Write>

      {/* ✅ 로그인 필요 모달 */}
      <LoginModal1
        open={showLoginModal}
        title="로그인이 필요합니다"
        description="로그인하셔야 본 서비스를 이용하실 수 있습니다"
        confirmText="로그인 하기"
        cancelText="취소"
        onClose={() => setShowLoginModal(false)}
        onCancel={() => setShowLoginModal(false)}
        onConfirm={() => {
          setShowLoginModal(false);
          navigate("/login", { state: { from: location.pathname } });
        }}
      />

      {/* 기존 리뷰 작성 모달 */}
      {showModal && (
        <ReviewModal
          id={selectedId}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            fetchReviewData(c.id);
            setShowModal(false);
          }}
        />
      )}

      <ReviewList>
        {loading && (
          <BoxWrapper>
            <Nickname>불러오는 중…</Nickname>
          </BoxWrapper>
        )}
        {error && !loading && (
          <BoxWrapper>
            <Nickname>{error}</Nickname>
          </BoxWrapper>
        )}
        {!loading && !error && reviews.length === 0 && (
          <BoxWrapper>
            <Nickname>아직 리뷰가 없습니다.</Nickname>
          </BoxWrapper>
        )}

        {!loading &&
          !error &&
          visibleReviews.map((r) => (
            <BoxWrapper key={r.id}>
              <Nickname>{r.nickname}</Nickname>
              <Stardate>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                >
                  <path
                    d="M7.62598 0.500977L9.19757 5.33786H14.2834L10.1689 8.32721L11.7405 13.1641L7.62598 10.1747L3.51148 13.1641L5.08308 8.32721L0.968581 5.33786H6.05438L7.62598 0.500977Z"
                    fill="#FF517E"
                  />
                </svg>
                <Rating>{r.rating}</Rating> · {r.date}일 전
              </Stardate>
              <Content>{r.content}</Content>
            </BoxWrapper>
          ))}

        {!loading && !error && canShowMore && (
          <MoreWrap>
            <MoreButton onClick={handleShowMore}>10개의 후기 더보기</MoreButton>
          </MoreWrap>
        )}
      </ReviewList>
    </div>
  );
}
