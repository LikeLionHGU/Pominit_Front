import { utcToZonedTime } from "date-fns-tz";
import { setDate, setMonth } from "date-fns";

const MS_DAY = 24 * 60 * 60 * 1000;

export function isToday(timestamp, timeZone = "Asia/Seoul", todayKey) {
  if (todayKey) {
    return utcToZonedTime(timestamp, timeZone).toDateString() === todayKey;
  }
  return (
    utcToZonedTime(timestamp, timeZone).toDateString() ===
    utcToZonedTime(new Date(), timeZone).toDateString()
  );
}

export function getTimestampListForCalendar(
  selectedYear,
  selectedMonth,
  timeZone = "Asia/Seoul"
) {
  const dateObjOfStartDay = utcToZonedTime(
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

  const numOfPrev = dayOfStartDay === 0 ? 6 : dayOfStartDay - 1;
  const numOfNext = dayOfEndDay === 0 ? 0 : 7 - dayOfEndDay;

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
  return utcToZonedTime(timestamp, timeZone).getMonth() === month;
}
