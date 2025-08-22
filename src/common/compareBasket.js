// common/compareBasket.js
// -------------------------------------------------------------
// "비교 바스켓" 전역 저장(Store) + 훅.
// - Provider 없이도 useCompareBasket()를 바로 쓸 수 있습니다.
// - 같은 탭/다른 탭 변경 자동 동기화 (custom event + storage)
// - 중복 방지, 최대 개수 제한, FIFO 정책 기본 적용
// -------------------------------------------------------------

import React, { useEffect, useState, useCallback } from "react";

const KEY = "compare:basket:v1";
const EVT = "compare:basket:changed"; // 같은 탭 동기화용 커스텀 이벤트
const MAX_ITEMS = 3;
const EVICT_OLDEST_WHEN_FULL = true;  // false: 거부, true: 오래된 것 제거(FIFO)

// ---------- 로컬스토리지 IO ----------
function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = JSON.parse(raw || "[]");
    return Array.isArray(arr) ? arr.map(Number).filter(Number.isFinite) : [];
  } catch {
    return [];
  }
}
function write(ids) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
    // 같은 탭 내 다른 훅/컴포넌트에게 변경 알림
    window.dispatchEvent(new Event(EVT));
  } catch {}
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ---------- 싱글톤 스토어(옵저버 패턴) ----------
const subscribers = new Set(); // (ids) => void

function emit(ids) {
  subscribers.forEach((fn) => {
    try { fn(ids); } catch {}
  });
}

function setAndBroadcast(next) {
  write(next);
  emit(next);
}

function addItem(id) {
  const curr = read();
  if (curr.includes(id)) return curr;

  if (curr.length >= MAX_ITEMS) {
    if (!EVICT_OLDEST_WHEN_FULL) return curr;   // 거부 정책
    const next = [...curr.slice(1), id];        // FIFO
    setAndBroadcast(next);
    return next;
  }
  const next = [...curr, id];
  setAndBroadcast(next);
  return next;
}

function removeItem(id) {
  const curr = read();
  const next = curr.filter((x) => x !== id);
  if (!eq(curr, next)) setAndBroadcast(next);
  return next;
}

function clearItems() {
  const curr = read();
  if (curr.length > 0) setAndBroadcast([]);
  return [];
}

function setAllItems(arr) {
  const clean = [...new Set((arr || []).map(Number).filter(Number.isFinite))];
  const sliced = clean.slice(-MAX_ITEMS);
  const curr = read();
  if (!eq(curr, sliced)) setAndBroadcast(sliced);
  return sliced;
}

// 외부 변경(다른 탭/같은 탭) 수신 → 구독자들에게 배포
(function initGlobalListenersOnce() {
  if (typeof window === "undefined") return;
  // 중복 바인딩 방지
  if (window.__compareBasketInit__) return;
  window.__compareBasketInit__ = true;

  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    emit(read());
  });
  window.addEventListener(EVT, () => emit(read()));
})();

// ---------- 훅: Provider 없이도 동작 ----------
export function useCompareBasket() {
  const [items, setItems] = useState(() => read());

  useEffect(() => {
    // 구독
    const sub = (ids) => setItems((prev) => (eq(prev, ids) ? prev : ids));
    subscribers.add(sub);
    // 마운트 시 한 번 동기화
    const now = read();
    if (!eq(items, now)) setItems(now);
    // 언마운트 시 구독 해제
    return () => subscribers.delete(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = useCallback((id) => {
    id = Number(id);
    if (!Number.isFinite(id)) return false;
    const next = addItem(id);
    // addItem 내부에서 브로드캐스트 하므로 여기선 반환만
    return read().includes(id);
  }, []);

  const remove = useCallback((id) => {
    id = Number(id);
    const before = read();
    const next = removeItem(id);
    return !next.includes(id) || !eq(before, next);
  }, []);

  const clear = useCallback(() => {
    const before = read();
    const next = clearItems();
    return !eq(before, next);
  }, []);

  const setAll = useCallback((arr) => {
    const before = read();
    const next = setAllItems(arr);
    return !eq(before, next);
  }, []);

  return {
    items, add, remove, clear, setAll,
    max: MAX_ITEMS, key: KEY, evictOldestWhenFull: EVICT_OLDEST_WHEN_FULL,
  };
}

// ---------- (선택) Provider: 호환용/미래 확장용 ----------
// 기존 코드에서 <CompareProvider>를 이미 사용 중이어도 깨지지 않게
// pass-through로 제공해 둡니다. 필요 시 초기 주입/프리로드 기능을
// 여기에 추가하면 됩니다.
export function CompareProvider({ children }) {
  return <>{children}</>;
}
