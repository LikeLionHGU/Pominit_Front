import React, { memo, useMemo } from "react";
import { utcToZonedTime } from "date-fns-tz";
import { isCurrentMonth, isToday } from "../utils";
// styled-components 정의는 그대로 사용
import styled, { css } from "styled-components";

export const Colors = {
  green: "#2AA772", // 선택된 날짜 채움
  black: "#111111", // 기본 텍스트
  gray900: "#2F2F33",
  gray700: "#6E6E73",
  gray500: "#A0A0A5",
  gray300: "#D8D9DE",
  gray200: "#EDEEF2",
  white: "#FFFFFF",
};

export const Wrapper = styled.div`
  width: 320px; /* 320~360 중 선택. 360이면 여백이 살짝 넉넉 */
  padding: 8px 12px 14px;
  background: ${Colors.white};
  border-radius: 12px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  margin-bottom: 8px;
`;

export const IconBtn = styled.button`
  all: unset;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${Colors.gray200};
  }
  &:active {
    transform: translateY(1px);
  }

  /* svg 아이콘 컬러 */
  svg path {
    stroke: ${Colors.black};
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* 타이틀과 '오늘' 사이 간격 */
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.black};
`;

export const TodayBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${Colors.gray300};
  background: ${Colors.white};
  color: ${Colors.gray900};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${Colors.gray200};
  }
  &:active {
    transform: translateY(1px);
  }
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
  padding: 6px 0;
`;

export const Cell = styled.div`
  display: grid;
  place-items: center;
  height: 36px;
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;
  column-gap: 0px; /* 스샷처럼 타이트한 간격 */
`;

/**
 * Day: 선택/오늘/이달여부 스타일
 * - isSelected: 채움(그린) + 흰 글자
 * - isToday && !isSelected: 회색 테두리 원
 * - isCurrentMonth: 진한 글자, 아니면 흐리게
 */
export const Day = styled(Cell)`
  cursor: pointer;
  position: relative;

  /* 원형 배지 사이즈를 숫자 주변에 딱 맞게 */
  span {
    display: inline-grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      span {
        background: ${Colors.green};
        color: ${Colors.white};
      }
    `}

  ${({ isToday, isSelected }) =>
    isToday &&
    !isSelected &&
    css`
      span {
        border: 2px solid ${Colors.gray300};
        color: ${Colors.black};
        background: transparent;
      }
    `}

  ${({ isCurrentMonth }) =>
    !isCurrentMonth &&
    css`
      span {
        color: ${Colors.gray500};
        font-weight: 500;
      }
    `}

  &:hover span {
    background: ${({ isSelected }) =>
      isSelected ? Colors.green : Colors.gray200};
  }

  &:active span {
    transform: translateY(1px);
  }
`;

/* 일반 텍스트용 */
export const Typo = styled.span`
  color: ${({ color }) => color || Colors.black};
  font-size: 14px;
`;

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
    () => utcToZonedTime(new Date(), timeZone).toDateString(),
    [timeZone]
  );

  return (
    <Wrapper>
      <Header>
        <Btn onClick={onLeftClick}>
          <Back width={24} height={24} />
        </Btn>
        <Center>
          <Typo>
            {selectedYearAndMonth.year}년 {selectedYearAndMonth.month + 1}월
          </Typo>
          <TodayBtn onClick={onTodayClick}>
            <Typo>오늘</Typo>
          </TodayBtn>
        </Center>
        <Btn onClick={onRightClick}>
          <Forward width={24} height={24} />
        </Btn>
      </Header>

      <Calendar>
        <KoreanDays>
          {Object.values(KoreanDayEnum).map((koreanDay) => (
            <Cell key={koreanDay}>
              <Typo>{koreanDay}</Typo>
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
                isSelected={selected}
                isToday={today}
                isCurrentMonth={currentMonth}
                onClick={onDayClick(timestamp)}
              >
                <Typo
                  color={
                    selected
                      ? Colors.white
                      : currentMonth
                      ? Colors.black
                      : Colors.gray
                  }
                >
                  {utcToZonedTime(timestamp, timeZone).getDate()}
                </Typo>
              </Day>
            );
          })}
        </Days>
      </Calendar>
    </Wrapper>
  );
};

export default memo(Presenter);
