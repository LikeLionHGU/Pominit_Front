import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
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
const SDK_SRC ="https://dapi.kakao.com/v2/maps/sdk.js?appkey=745c210e29dbb3c325c54c97f7f39df7&autoload=false";

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
  const [interactive, setInteractive] = useState(false);
  const c = useMemo(() => normalizeCenter(center), [center]);

  useEffect(() => {
    if (!c) return;
    if (typeof window === "undefined") return;

    const onLoad = () => {
      window.kakao.maps.load(() => {
        if (!mapObjRef.current) {
          const map = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(c.latitude, c.longitude),
            level: 10,
          });
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
          mapObjRef.current = map;

            map.setDraggable(false);
            if (map.setZoomable) map.setZoomable(false);
  
            window.kakao.maps.event.addListener(map, "click", () => {
              setInteractive(true);
            });
        }

        const map = mapObjRef.current;
        const latlng = new window.kakao.maps.LatLng(c.latitude, c.longitude);

        
        map.setCenter(latlng);
        map.setLevel(3); 

     
        if (!markerRef.current) {
          markerRef.current = new window.kakao.maps.Marker({
            position: latlng,
            map,
            title: c.name || "강습소",
          });
        } else {
          markerRef.current.setPosition(latlng);
        }
        setTimeout(() => map.relayout(), 0);
      });
    };

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
      document.head.appendChild(s);
    }

  }, [c]);

  useEffect(() => {
    if (!mapObjRef.current) return;
    const map = mapObjRef.current;
    map.setDraggable(interactive);
    if (map.setZoomable) map.setZoomable(interactive);
  }, [interactive]);

  if (!c) return null;

  return (
    <div>
      <Text>강습소 위치</Text>
      <Mapstyle ref={mapRef} aria-label="강습소 위치 지도" />
    </div>
  );
}
