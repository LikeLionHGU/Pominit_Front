import React, { memo, useMemo } from "react";
import { toZonedTime } from "date-fns-tz";
import { isCurrentMonth, isToday } from "./utils";
import styled, { css } from "styled-components";

/* ================= Colors ================= */
export const Colors = {
  red: "#FF517E",
  blue: "#2F83F3",
  black: "#111111",
  gray900: "#2F2F33",
  gray700: "#6E6E73",
  gray500: "#A0A0A5",
  gray300: "#D8D9DE",
  gray200: "#EDEEF2",
  white: "#FFFFFF",
};

/* ================= Icons ================= */
const Back = ({ width = 24, height = 24 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M15 18L9 12L15 6"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Forward = ({ width = 24, height = 24 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 6L15 12L9 18"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================= 상단 요일 ================= */
const KoreanDayEnum = ["일", "월", "화", "수", "목", "금", "토"];

/* ================= Styled Components ================= */
export const Wrapper = styled.div`
  width: 292px;
  height: 295px;
  padding: 1.25rem;
  background: ${Colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
`;

export const IconBtn = styled.button`
  all: unset;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  color: ${Colors.blue};

  &:hover {
    background: ${Colors.gray200};
  }
  &:active {
    transform: translateY(1px);
  }

  svg path {
    stroke: ${Colors.black};
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h3`
  color: var(--Foundation-main-blue-500, #2f83f3);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
`;

export const CalendarWrap = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 6px;
`;

export const KoreanDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${Colors.gray700};
  font-size: 12px;
`;

export const Cell = styled.div`
  display: grid;
  place-items: center;
  height: 36px;
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.25rem;
  column-gap: 0.25rem;
`;

/** ✅ transient props: $isSelected / $isToday / $isCurrentMonth */
/** ✅ transient props: $isSelected / $isToday / $isCurrentMonth */
export const Day = styled(Cell)`
  cursor: pointer;
  position: relative;

  span {
    display: inline-grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 50%;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${Colors.black};
  }

  /* 선택된 날짜 (채움) */
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      span {
        background: ${Colors.red};
        color: ${Colors.white};
      }
    `}

  /* 오늘 (윤곽선) — 선택과 겹치면 선택 스타일 우선 */
  ${({ $isToday, $isSelected }) =>
    $isToday &&
    !$isSelected &&
    css`
      span {
        border: 2px solid ${Colors.gray300};
        background: transparent;
      }
    `}

  /* 이번 달이 아니면 흐리게 + 클릭 방지 */
  ${({ $isCurrentMonth }) =>
    !$isCurrentMonth &&
    css`
      pointer-events: none;
      border: none;
      background: transparent;
    `}

  &:hover span {
    background: ${({ $isSelected }) =>
      $isSelected ? Colors.red : Colors.white};
    border: 1px solid ${Colors.red};
  }

  &:active span {
    transform: translateY(1px);
  }
`;

/** ✅ color도 transient prop로 처리 (선택사항) */
export const Typo = styled.span`
  color: ${({ $color }) => $color || Colors.black};
  font-size: 14px;
`;

/* ================= Presenter ================= */
const Presenter = ({
  selectedYearAndMonth,
  selectedTimestamp,
  onLeftClick,
  onRightClick,
  onTodayClick,
  onDayClick,
  calendarTimestamps,
  timeZone,
}) => {
  const todayKey = useMemo(
    () => toZonedTime(new Date(), timeZone).toDateString(),
    [timeZone]
  );

  return (
    <Wrapper>
      <Header>
        <Center>
          <IconBtn onClick={onLeftClick}>
            <Back width={24} height={24} />
          </IconBtn>
          <Title>
            {selectedYearAndMonth.year} {selectedYearAndMonth.month + 1}월
          </Title>
          <IconBtn onClick={onRightClick}>
            <Forward width={24} height={24} />
          </IconBtn>
        </Center>
      </Header>

      <CalendarWrap>
        <KoreanDays>
          {KoreanDayEnum.map((koreanDay) => (
            <Cell key={koreanDay}>
              {/* color만 transient prop으로 넘김 */}
              <Typo $color={Colors.gray700} style={{ fontSize: 12 }}>
                {koreanDay}
              </Typo>
            </Cell>
          ))}
        </KoreanDays>

        <Days>
          {calendarTimestamps.map((timestamp) => {
            const selected = timestamp === selectedTimestamp;
            const today = isToday(timestamp, timeZone, todayKey);
            const currentMonth = isCurrentMonth(
              timestamp,
              selectedYearAndMonth.month,
              timeZone
            );

            return (
              <Day
                key={timestamp}
                $isSelected={selected}
                $isToday={today}
                $isCurrentMonth={currentMonth}
                onClick={currentMonth ? onDayClick(timestamp) : undefined}
                aria-hidden={currentMonth ? undefined : true}
              >
                <span>
                  {currentMonth
                    ? toZonedTime(timestamp, timeZone).getDate()
                    : ""}
                </span>
              </Day>
            );
          })}
        </Days>
      </CalendarWrap>
    </Wrapper>
  );
};

export default memo(Presenter);
