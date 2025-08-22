import styled from "styled-components";
import { useEffect, useRef } from "react";

const Mapstyle = styled.div`
  position: absolute;
  top: 775.72px;
  left: 180px;
  width: 880px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 19px;
  overflow: hidden;
`;
const Text = styled.div`
  position: absolute;
  top: 735.72px;
  left: 180px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
`;

const SDK_ID = "kakao-map-sdk";
const SDK_SRC =
  "https://dapi.kakao.com/v2/maps/sdk.js?appkey=745c210e29dbb3c325c54c97f7f39df7&autoload=false";

function normalizeCenter(raw) {
  if (!raw) return null;
  const lat = Number(raw.latitude);
  const lng = Number(raw.longitude);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  return { latitude: lat, longitude: lng, name: raw.name || "" };
}

export default function Map({ center }) {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const markerRef = useRef(null);
  const infoRef = useRef(null); // ⭐ 이름 라벨(InfoWindow) 참조

  const c = normalizeCenter(center);

  useEffect(() => {
    if (!c) return;
    if (typeof window === "undefined") return;

    const buildLabelHtml = (name) => `
      <div style="
        padding:6px 10px;
        border:1px solid #E5E7EB;
        background:#fff;
        border-radius:6px;
        box-shadow:0 2px 8px rgba(0,0,0,0.12);
        font-family: Pretendard, system-ui, -apple-system, sans-serif;
        font-size:12px; color:#111; white-space:nowrap;">
        ${name ? String(name).replace(/[<>&]/g, (m)=>({ '<':'&lt;','>':'&gt;','&':'&amp;' }[m])) : '강습소'}
      </div>
    `;

    const onLoad = () => {
      window.kakao.maps.load(() => {
        // 맵 최초 생성
        if (!mapObjRef.current) {
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(c.latitude, c.longitude),
            level: 10, // ⭐ 더 확대해서 시작
          });
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
          mapObjRef.current = map;
        }

        const map = mapObjRef.current;
        const latlng = new window.kakao.maps.LatLng(c.latitude, c.longitude);

        // 중심/줌 재설정(이미 만들어진 뒤에도 더 확대)
        map.setCenter(latlng);
        map.setLevel(3); // ⭐ 항상 확대 유지(필요시 2~4 사이에서 조절)

        // 마커 생성/갱신
        if (!markerRef.current) {
          markerRef.current = new window.kakao.maps.Marker({
            position: latlng,
            map,
            title: c.name || "강습소", // 마우스오버 툴팁
          });
        } else {
          markerRef.current.setPosition(latlng);
        }

      

        // 레이아웃 보정
        setTimeout(() => map.relayout(), 0);
      });
    };

    // SDK 로드
    const existing = document.getElementById(SDK_ID);
    if (existing) {
      if (window.kakao?.maps) onLoad();
      else existing.addEventListener("load", onLoad, { once: true });
    } else {
      const s = document.createElement("script");
      s.id = SDK_ID;
      s.async = true;
      s.src = SDK_SRC;
      s.onload = onLoad;
      s.onerror = () => console.error("카카오 SDK 로드 오류");
      document.head.appendChild(s);
    }
  // 이름 변경시 라벨 텍스트도 즉시 갱신되도록 name까지 의존성 포함
  }, [c?.latitude, c?.longitude, c?.name]);

  if (!c) return null;

  return (
    <div>
      <Text>강습소 위치</Text>
      <Mapstyle ref={mapRef} aria-label="강습소 위치 지도" />
    </div>
  );
}
