import { toZonedTime } from "date-fns-tz";
import { setDate, setMonth } from "date-fns";

const MS_DAY = 24 * 60 * 60 * 1000;

export function isToday(timestamp, timeZone = "Asia/Seoul", todayKey) {
  if (todayKey) {
    return toZonedTime(timestamp, timeZone).toDateString() === todayKey;
  }
  return (
    toZonedTime(timestamp, timeZone).toDateString() ===
    toZonedTime(new Date(), timeZone).toDateString()
  );
}

export function getTimestampListForCalendar(
  selectedYear,
  selectedMonth,
  timeZone = "Asia/Seoul"
) {
  const dateObjOfStartDay = toZonedTime(
    new Date(selectedYear, selectedMonth),
    timeZone
  );
  const dateObjOfEndDay = setDate(
    setMonth(dateObjOfStartDay, dateObjOfStartDay.getMonth() + 1),
    0
  );

  const endDay = dateObjOfEndDay.getDate();
  const dayOfStartDay = dateObjOfStartDay.getDay();
  const dayOfEndDay = dateObjOfEndDay.getDay();

  // 일요일(0) 시작 기준 로직
  // Date.getDay(): 0=일, 1=월, ... 6=토
  const numOfPrev = dayOfStartDay; // 일요일이면 0, 월요일이면 1, ...
  const numOfNext = dayOfEndDay === 6 ? 0 : 6 - dayOfEndDay; // 토요일이면 0, 그 외는 남은 칸 수

  const startValue = dateObjOfStartDay.valueOf();
  const endValue = dateObjOfEndDay.valueOf();

  const prev = Array.from(
    { length: numOfPrev },
    (_, i) => startValue - MS_DAY * numOfPrev + MS_DAY * i
  );
  const current = Array.from(
    { length: endDay },
    (_, i) => startValue + MS_DAY * i
  );
  const next = Array.from(
    { length: numOfNext },
    (_, i) => endValue + MS_DAY * (i + 1)
  );

  return prev.concat(current, next);
}

export function isCurrentMonth(timestamp, month, timeZone = "Asia/Seoul") {
  return toZonedTime(timestamp, timeZone).getMonth() === month;
}
