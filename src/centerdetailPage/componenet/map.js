import styled from "styled-components";
import { useEffect, useRef } from "react";

const Mapstyle = styled.div`
position:absolute;
top:775.72px;
left: 180px;
  width: 880px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 19px;
  overflow: hidden;         
`;
const Text=styled.div`
position:absolute;
top:735.72px;
left: 180px;
color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const SDK_ID = "kakao-map-sdk";
const SDK_SRC =
  "https://dapi.kakao.com/v2/maps/sdk.js?appkey=745c210e29dbb3c325c54c97f7f39df7&autoload=false";

export default function Map() {
  const mapRef = useRef(null);
  const mapObjRef = useRef(null); 

  useEffect(() => {
    const onLoad = () => {
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(36.04, 129.36),
          level: 7,
        });
        mapObjRef.current = map;

        // 컨테이너가 나중에 표시되는 경우 크기 재계산(선택)
        setTimeout(() => mapObjRef.current && mapObjRef.current.relayout(), 0);
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
      s.onerror = () => console.error("카카오 SDK 로드 오류");
      document.head.appendChild(s);
    }
  }, []);

  return (<div>
    <Text>강습소 위치</Text>
   <Mapstyle ref={mapRef} /> </div>);
}
