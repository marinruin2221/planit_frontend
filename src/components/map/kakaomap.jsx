import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

export default function KakaoMap({ className, x, y, width = "100%", height = "360px", level = 3, markers = [], children }) {
  // 중심 좌표 결정: markers가 있으면 첫 번째 마커를 중심, 아니면 x, y 사용
  const center = markers.length > 0
    ? { lat: markers[0].lat, lng: markers[0].lng }
    : { lat: y, lng: x };

  return (
    <Map
      center={center} // 지도의 중심 좌표
      style={{ width: width, height: height }} // 지도 크기
      className={className}
      level={level} // 지도 확대 레벨
    >
      {/* 단일 마커 (기존 호환) */}
      {!markers.length && x && y && (
        <>
          <MapMarker position={{ lat: y, lng: x }} />
          {children && (
            <CustomOverlayMap position={{ lat: y, lng: x }} yAnchor={2.2}>
              {children}
            </CustomOverlayMap>
          )}
        </>
      )}

      {/* 다중 마커 */}
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
        >
          {/* 마커에 커스텀 오버레이나 인포윈도우가 필요하면 여기에 추가 */}
          {marker.content && <div style={{ padding: "5px", color: "#000" }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  );
}
