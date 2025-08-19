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
  // ✅ Hook들은 무조건 최상단에서 호출
  const mapRef = useRef(null);
  const mapObjRef = useRef(null);
  const markerRef = useRef(null);

  const c = normalizeCenter(center); // 파생값은 Hook 다음에 계산

  useEffect(() => {
    // 좌표가 없으면 아무 것도 안 함 (하지만 Hook은 호출됨)
    if (!c) return;
    if (typeof window === "undefined") return;

    const onLoad = () => {
      window.kakao.maps.load(() => {
        // 맵 생성 (최초 1회)
        if (!mapObjRef.current) {
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(c.latitude, c.longitude), // (lat, lng)
            level: 7,
          });
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
          mapObjRef.current = map;
        }

        // 중심 좌표/마커 갱신
        const latlng = new window.kakao.maps.LatLng(c.latitude, c.longitude);
        mapObjRef.current.setCenter(latlng);

        if (!markerRef.current) {
          markerRef.current = new window.kakao.maps.Marker({
            position: latlng,
            map: mapObjRef.current,
          });
        } else {
          markerRef.current.setPosition(latlng);
        }

        // 레이아웃 보정
        setTimeout(() => mapObjRef.current?.relayout(), 0);
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
  }, [c?.latitude, c?.longitude]); // ✅ 의존성은 안전하게 optional chaining

  // ✅ 렌더링은 여기서 가드 (Hook 이후에 조건부 return)
  if (!c) return null;

  return (
    <div>
      <Text>강습소 위치</Text>
      <Mapstyle ref={mapRef} aria-label="강습소 위치 지도" />
    </div>
  );
}
