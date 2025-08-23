export const toAbsUrl = (u, base = process.env.REACT_APP_API_BASE_URL) => {
    if (!u) return "";
    if (/^https?:\/\//i.test(u)) return u;
    if (!base) return u;
    return `${base}${u.startsWith("/") ? "" : "/"}${u}`;
  };
  