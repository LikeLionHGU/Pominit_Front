
import React, { useEffect, useState, useCallback } from "react";

const KEY = "compare:basket:v1";
const EVT = "compare:basket:changed"; 
const MAX_ITEMS = 3;
const EVICT_OLDEST_WHEN_FULL = true; 
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

    window.dispatchEvent(new Event(EVT));
  } catch {}
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);


const subscribers = new Set(); 

function emit(ids) {
  subscribers.forEach((fn) => {
    try {
      fn(ids);
    } catch {}
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
    if (!EVICT_OLDEST_WHEN_FULL) return curr; 
    const next = [...curr.slice(1), id]; 
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


(function initGlobalListenersOnce() {
  if (typeof window === "undefined") return;

  if (window.__compareBasketInit__) return;
  window.__compareBasketInit__ = true;

  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    emit(read());
  });
  window.addEventListener(EVT, () => emit(read()));
})();


export function useCompareBasket() {
  const [items, setItems] = useState(() => read());

  useEffect(() => {

    const sub = (ids) => setItems((prev) => (eq(prev, ids) ? prev : ids));
    subscribers.add(sub);

    const now = read();
    if (!eq(items, now)) setItems(now);
  
    return () => subscribers.delete(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = useCallback((id) => {
    id = Number(id);
    if (!Number.isFinite(id)) return false;
    // eslint-disable-next-line
    const next = addItem(id);

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
    items,
    add,
    remove,
    clear,
    setAll,
    max: MAX_ITEMS,
    key: KEY,
    evictOldestWhenFull: EVICT_OLDEST_WHEN_FULL,
  };
}


export function CompareProvider({ children }) {
  return <>{children}</>;
}