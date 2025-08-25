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


  const handleLeftClick = useCallback(() => {
    setSelectedYearAndMonth((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  }, []);

  const handleRightClick = useCallback(() => {
    setSelectedYearAndMonth((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  }, []);

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

  useEffect(() => {
    if (selectedTimestamp == null) return;
    const selectedDate = toZonedTime(selectedTimestamp, TIMEZONE);
    setSelectedYearAndMonth({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth(),
    });
  }, [selectedTimestamp]);


  const calendarTimestamps = useMemo(() => {
    return getTimestampListForCalendar(
      selectedYearAndMonth.year,
      selectedYearAndMonth.month,
      TIMEZONE
    );
  }, [selectedYearAndMonth.year, selectedYearAndMonth.month]);

  const toggleOpen = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((v) => !v);
  }, []);

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
          lineHeight: "140%" ,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className={styles.selectBox}>

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
