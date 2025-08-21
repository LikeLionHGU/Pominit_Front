import React, { useCallback, useEffect, useMemo, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";
import Presenter from "./Presenter";
import { getTimestampListForCalendar } from "../utils";

const TIMEZONE = "Asia/Seoul";

const Calendar = () => {
  // 최초 nowDate 계산 1회만
  const initialNowDate = useMemo(
    () => utcToZonedTime(new Date(), TIMEZONE),
    []
  );
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState({
    year: initialNowDate.getFullYear(),
    month: initialNowDate.getMonth(),
  });

  const [selectedTimestamp, setSelectedTimestamp] = useState(
    initialNowDate.setHours(0, 0, 0, 0)
  );

  // '<' 클릭 시
  const handleLeftClick = useCallback(() => {
    setSelectedYearAndMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  }, []);

  // '>' 클릭 시
  const handleRightClick = useCallback(() => {
    setSelectedYearAndMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  }, []);

  // 날짜 클릭 시
  const handleDayClick = useCallback(
    (timestamp) => () => {
      setSelectedTimestamp(timestamp);
    },
    []
  );

  // '오늘' 클릭 시
  const handleTodayClick = useCallback(() => {
    const now = utcToZonedTime(new Date(), TIMEZONE);
    const ts = now.setHours(0, 0, 0, 0);
    setSelectedTimestamp(ts);
    setSelectedYearAndMonth({
      year: now.getFullYear(),
      month: now.getMonth(),
    });
  }, []);

  // 선택된 날짜 바뀌면 연/월 동기화
  useEffect(() => {
    const selectedDate = utcToZonedTime(selectedTimestamp, TIMEZONE);
    setSelectedYearAndMonth({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth(),
    });
  }, [selectedTimestamp]);

  // 렌더링용 날짜 리스트 계산
  const calendarTimestamps = useMemo(() => {
    return getTimestampListForCalendar(
      selectedYearAndMonth.year,
      selectedYearAndMonth.month,
      TIMEZONE
    );
  }, [selectedYearAndMonth.year, selectedYearAndMonth.month]);

  return (
    <Presenter
      selectedYearAndMonth={selectedYearAndMonth}
      selectedTimestamp={selectedTimestamp}
      onLeftClick={handleLeftClick}
      onRightClick={handleRightClick}
      onTodayClick={handleTodayClick}
      onDayClick={handleDayClick}
      calendarTimestamps={calendarTimestamps}
      timeZone={TIMEZONE}
    />
  );
};

export default Calendar;
