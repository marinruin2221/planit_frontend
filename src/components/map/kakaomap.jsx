import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap({ className, x, y, width = "100%", height = "360px", level = 1, children }) {
  return (
    <Map
      center={{ lat: y, lng: x }} // 지도의 중심 좌표
      style={{ width: width, height: height }} // 지도 크기
      className={className}
      level={level} // 지도 확대 레벨
    >
      <MapMarker position={{ lat: y, lng: x }}>
        {children}
      </MapMarker>
    </Map>
  );
}
