import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { toZonedTime } from "date-fns-tz";
import Presenter from "./Presenter";
import { getTimestampListForCalendar } from "./utils";
import styles from "./Calendar.module.css";

import down from "../../asset/img/down.svg";

const TIMEZONE = "Asia/Seoul";

const Calendar = ({ onDateChange, value }) => {
  // 최초 nowDate 계산 1회만
  const initialNowDate = useMemo(() => toZonedTime(new Date(), TIMEZONE), []);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState({
    year: initialNowDate.getFullYear(),
    month: initialNowDate.getMonth(),
  });

  const [selectedTimestamp, setSelectedTimestamp] = useState(
    initialNowDate.setHours(0, 0, 0, 0)
  );

  const toYMD = useCallback((ts) => {
    const d = toZonedTime(ts, TIMEZONE);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

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
      setSelectedTimestamp((prev) => {
        const isSame = prev === timestamp;
        const next = isSame ? null : timestamp;
        onDateChange?.(isSame ? "" : toYMD(timestamp));
        return next;
      });
      setIsOpen(false);
    },
    [onDateChange, toYMD]
  );

  // '오늘' 클릭 시
  const handleTodayClick = useCallback(() => {
    const now = toZonedTime(new Date(), TIMEZONE);
    const ts = now.setHours(0, 0, 0, 0);
    setSelectedTimestamp(ts);
    setSelectedYearAndMonth({
      year: now.getFullYear(),
      month: now.getMonth(),
    });
    onDateChange?.(toYMD(ts));
  }, [onDateChange, toYMD]);

  // 선택된 날짜 바뀌면 연/월 동기화
  useEffect(() => {
    if (selectedTimestamp == null) return;
    const selectedDate = toZonedTime(selectedTimestamp, TIMEZONE);
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

  // ✅ 토글 핸들러
  const toggleOpen = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((v) => !v);
  }, []);

  // ✅ 바깥 클릭/ESC로 닫기
  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (e) => {
      const t = e.target;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(t) &&
        triggerRef.current &&
        !triggerRef.current.contains(t)
      ) {
        setIsOpen(false);
      }
    };
    const onKeydown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* ✅ 이 div를 클릭하면 캘린더 열림 */}
      <div
        ref={triggerRef}
        onClick={toggleOpen}
        style={{
          borderRadius: "6.25rem",
          border: "1px solid #2F83F3",
          background: "#FFF",
          height: "46px",
          width: "148px",
          cursor: "pointer",
          minWidth: 180,
          userSelect: "none",
          color: "#2F83F3",
          textAlign: "center",
          fontFamily: "Pretendard",
          fontSize: "1rem",
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "140%" /* 1.4rem */,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className={styles.selectBox}>
          {/* 표시용: 선택된 날짜를 YYYY-MM-DD 로 보여주고 싶다면 */}
          {selectedTimestamp
            ? new Date(selectedTimestamp).toLocaleDateString("sv-SE", {
                timeZone: "Asia/Seoul",
              })
            : "모임 일자"}
          {"  "}
          <img
            src={down}
            alt="down"
            className={`${styles.arrow} ${isOpen ? styles.rotate : ""}`}
          />
        </span>
      </div>

      {/* ✅ 팝오버로 캘린더 표시 */}
      {isOpen && (
        <div
          ref={popoverRef}
          onClick={(e) => e.stopPropagation()}
          style={{ position: "absolute", zIndex: 2000 }}
        >
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
        </div>
      )}
    </div>
  );
};

export default Calendar;
