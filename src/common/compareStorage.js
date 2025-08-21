export function loadIdsFromLocalStorage(key = "compare:basket:v1") {
    try {
      const raw = localStorage.getItem(key);
      const arr = JSON.parse(raw || "[]");
      const ids = Array.isArray(arr)
        ? arr.map(Number).filter(Number.isFinite).slice(0, 3)
        : [];
      // item1~3로 패딩 (-1)
      return {
        item1: ids[0] ?? -1,
        item2: ids[1] ?? -1,
        item3: ids[2] ?? -1,
        ids,
      };
    } catch {
      return { item1: -1, item2: -1, item3: -1, ids: [] };
    }
  }
  