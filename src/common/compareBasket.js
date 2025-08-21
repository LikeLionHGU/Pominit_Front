import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "compare:basket:v1";
const CompareCtx = createContext(null);

export function CompareProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const arr = JSON.parse(raw || "[]");
      return Array.isArray(arr) ? arr.map(Number).filter(n => Number.isFinite(n)) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo(() => ({
    items,                             // e.g. [8, 15]
    add(id) {
      id = Number(id);
      if (!Number.isFinite(id)) return;
      setItems(prev => {
        if (prev.includes(id)) return prev;             // 중복 방지
        const next = [...prev, id];
        return next.length <= 3 ? next : next.slice(next.length - 3); // 최대 3개 유지(최근 3개)
      });
    },
    remove(id) {
      id = Number(id);
      setItems(prev => prev.filter(v => v !== id));
    },
    clear() { setItems([]); },
    setAll(arr) {
      const clean = (arr || []).map(Number).filter(Number.isFinite).slice(-3);
      setItems(clean);
    },
  }), [items]);

  return <CompareCtx.Provider value={api}>{children}</CompareCtx.Provider>;
}

export function useCompareBasket() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error("useCompareBasket must be used within <CompareProvider>");
  return ctx;
}
