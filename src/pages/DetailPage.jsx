import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import KakaoMap from "@components/map/kakaomap.jsx";
import AIRecommendationWindow from "@components/ai/AIRecommendationWindow.jsx";
import ImageGalleryModal from "@components/common/ImageGalleryModal.jsx";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [images, setImages] = useState([]);
  const [intro, setIntro] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [isAIWindowOpen, setIsAIWindowOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [estimatedPrice, setEstimatedPrice] = useState(null); // 추가: 예상 가격 상태

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tours/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDestination(data);
      } catch (error) {
        console.error("Failed to fetch detail:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/tours/${id}/images`);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    const fetchIntro = async () => {
      try {
        const response = await fetch(`/api/tours/${id}/intro`);
        if (response.ok) {
          const data = await response.json();
          setIntro(data);
        }
      } catch (error) {
        console.error("Failed to fetch intro:", error);
      }
    };

    const fetchRooms = async () => {
      setRoomsLoading(true);
      try {
        const response = await fetch(`/api/tours/${id}/rooms`);
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setRoomsLoading(false);
      }
    };

    const fetchPrice = async () => {
      try {
        const response = await fetch(`/api/tours/${id}/price`);
        if (response.ok) {
          const data = await response.json();
          if (data.minPrice) {
            setEstimatedPrice(data.minPrice);
          }
        }
      } catch (error) {
        console.error("Failed to fetch price:", error);
      }
    };

    fetchDetail();
    fetchImages();
    fetchIntro();
    fetchRooms();
    fetchPrice(); // 가격 호출 추가
  }, [id]);

  // 카카오맵 초기화
  useEffect(() => {
  }, [destination]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!destination) {
    return <div className="min-h-screen flex items-center justify-center">데이터를 불러올 수 없습니다.</div>;
  }

  // Combine main images with fetched images and deduplicate
  const rawImages = [
    destination.firstimage,
    ...images
  ].filter(Boolean);

  const uniqueImages = rawImages.filter((url, index, self) => {
    const getFilename = (u) => {
      try {
        return u.split('/').pop().split('?')[0];
      } catch (e) {
        return u;
      }
    };
    return index === self.findIndex((t) => getFilename(t) === getFilename(url));
  });

  // Fallback images if not enough
  const displayImages = [
    ...uniqueImages,
    '/images/city.png',
    '/images/beach.png',
    '/images/mountain.png',
    '/images/jeju.png',
    '/images/city.png'
  ].slice(0, 5);

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content & Sidebar Wrapper */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

          {/* Left Content (70%) */}
          <div className="w-full lg:w-[70%]">

            {/* Image Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] mb-8 rounded-xl overflow-hidden bg-gray-200">
              <div className="col-span-2 row-span-2 relative h-full">
                <img src={displayImages[0]} alt="Main" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/jeju.png' }} />
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 z-10 cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  사진 더보기
                </button>
              </div>
              <div className="col-span-1 row-span-1 h-full bg-gray-200"><img src={displayImages[1]} alt="Sub 1" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/city.png' }} /></div>
              <div className="col-span-1 row-span-1 h-full bg-gray-200"><img src={displayImages[2]} alt="Sub 2" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/beach.png' }} /></div>
              <div className="col-span-1 row-span-1 h-full bg-gray-200"><img src={displayImages[3]} alt="Sub 3" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/jeju.png' }} /></div>
              <div className="col-span-1 row-span-1 h-full bg-gray-200"><img src={displayImages[4]} alt="Sub 4" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/images/city.png' }} /></div>
            </div>

            {/* Header Info */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="text-sm text-gray-500 mb-2">숙박</div>
              <h1 className="font-bold text-gray-900 mb-3 leading-tight text-title-xl">{destination.title}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">9.2</span>
                <span className="text-sm font-medium text-gray-900">최고예요</span>
                <span className="text-sm text-gray-500">· 이용자 리뷰 1,234개</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {destination.addr1}
              </div>
            </div>

            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">숙소 소개</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {destination.overview || "편안한 휴식을 위한 최고의 선택입니다. 아름다운 전망과 최상의 서비스를 제공합니다."}
              </p>

              {/* 숙소 이용 정보 (Intro Data) */}
              {intro && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">숙소 이용 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {intro.checkintime && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">입실 시간</span>
                        <span className="font-medium text-gray-900">{intro.checkintime}</span>
                      </div>
                    )}
                    {intro.checkouttime && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">퇴실 시간</span>
                        <span className="font-medium text-gray-900">{intro.checkouttime}</span>
                      </div>
                    )}
                    {intro.roomcount && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">객실 수</span>
                        <span className="font-medium text-gray-900">{intro.roomcount}</span>
                      </div>
                    )}
                    {intro.parkinglodging && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">주차 시설</span>
                        <span className="font-medium text-gray-900">{intro.parkinglodging}</span>
                      </div>
                    )}
                    {intro.infocenterlodging && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">문의 및 안내</span>
                        <span className="font-medium text-gray-900">{intro.infocenterlodging}</span>
                      </div>
                    )}
                    {intro.subfacility && (
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500">부대시설</span>
                        <span className="font-medium text-gray-900">{intro.subfacility}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {intro && intro.subfacility ? (
                  intro.subfacility.split(',').map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{tag.trim()}</span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">시설 정보가 제공되지 않습니다.</span>
                )}
              </div>
            </div>

            {/* Room Types - API Data */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">객실 선택</h2>
              <div className="space-y-4">
                {roomsLoading ? (
                  <div className="text-center py-10 text-gray-500">객실 정보를 불러오는 중입니다...</div>
                ) : rooms.length > 0 ? (
                  rooms.map((room, index) => {
                    // 객실 이미지 우선순위: roomimg1 > roomimg2 > API images > fallback
                    const roomImage = room.roomimg1 || room.roomimg2 || room.roomimg3 || images[index + 2] || `/images/${['city', 'beach', 'mountain'][index % 3]}.png`;
                    // 가격 포맷팅 (숫자만 추출)
                    let priceStr = room.roomoffseasonminfee1 || room.roomoffseasonminfee2 || room.roompeakseasonminfee1;
                    let displayPrice = '가격 문의';
                    let priceValue = null;

                    if (priceStr) {
                      priceValue = parseInt(priceStr);
                      displayPrice = priceValue.toLocaleString() + '원';
                    } else if (estimatedPrice) {
                      // 실제 가격이 없고 예상 가격이 있는 경우
                      priceValue = estimatedPrice;
                      displayPrice = `${estimatedPrice.toLocaleString()}원`;
                    }

                    // 편의시설 태그 생성
                    const amenities = [];
                    if (room.roombathfacility === 'Y') amenities.push('욕실');
                    if (room.roomtv === 'Y') amenities.push('TV');
                    if (room.roominternet === 'Y') amenities.push('인터넷');
                    if (room.roomrefrigerator === 'Y') amenities.push('냉장고');
                    if (room.roomaircondition === 'Y') amenities.push('에어컨');
                    if (room.roomhairdryer === 'Y') amenities.push('드라이기');
                    if (room.roomcook === 'Y') amenities.push('취사 가능');

                    return (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:border-gray-900 transition-colors">
                        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={roomImage}
                            alt={room.roomtitle || `객실 ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/jeju.png' }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{room.roomtitle || `객실 ${index + 1}`}</h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {room.roombasecount ? `기준 ${room.roombasecount}인` : ''}
                              {room.roommaxcount ? ` / 최대 ${room.roommaxcount}인` : ''}
                              {room.roomsize2 ? ` · ${room.roomsize2}㎡` : ''}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {amenities.slice(0, 4).map((amenity, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{amenity}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-end mt-4 md:mt-0">
                            <div className="text-xs text-red-500"></div>
                            <div className="text-right flex flex-col items-end gap-2 sm:gap-0 sm:block">
                              <div className="text-lg font-bold text-gray-900">{displayPrice}</div>
                              <div className="text-xs text-gray-400 mb-2">1박, 세금 포함</div>
                              <button
                                onClick={() => alert(`${room.roomtitle || '객실'} 예약이 진행됩니다. (가격: ${displayPrice})`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
                              >
                                예약하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : estimatedPrice ? (
                  // 객실 정보가 없지만 예상 가격이 있는 경우 (가상 객실 표시)
                  <div className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:border-gray-900 transition-colors">
                    <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={destination.firstimage || '/images/hotel_default.png'}
                        alt="Standard Room"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = '/images/jeju.png' }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Standard Room</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          기준 2인 / 최대 2인
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">더블 침대</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">무료 와이파이</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4 md:mt-0">
                        <div className="text-xs text-red-500"></div>
                        <div className="text-right flex flex-col items-end gap-2 sm:gap-0 sm:block">
                          <div className="text-lg font-bold text-gray-900">{estimatedPrice.toLocaleString()}원</div>
                          <div className="text-xs text-gray-400 mb-2">1박, 세금 포함</div>
                          <button
                            onClick={() => alert(`Standard Room 예약이 진행됩니다. (가격: ${estimatedPrice.toLocaleString()}원)`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
                          >
                            예약하기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-500 mb-2">이 숙소의 상세 객실 정보가 제공되지 않습니다.</p>
                    <p className="text-sm text-gray-400">
                      {intro && intro.infocenterlodging ? `문의: ${intro.infocenterlodging}` : "숙소에 직접 문의해주세요."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities & Map */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">서비스 및 부대시설</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {intro && intro.subfacility ? (
                  intro.subfacility.split(',').slice(0, 8).map((fac, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {fac.trim()}
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-gray-400 text-sm">시설 정보가 제공되지 않습니다.</div>
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">위치</h2>
              <h2 className="text-xl font-bold text-gray-900 mb-4">위치</h2>
              <KakaoMap x={destination.mapx} y={destination.mapy} className="rounded-xl overflow-hidden h-[300px] bg-gray-100 relative w-full">
              </KakaoMap>

              <div className="mt-4 text-gray-600 text-sm">
                {destination.addr1} <span className="text-blue-500 cursor-pointer ml-2">주소복사</span>
              </div>
            </div>

            {/* Review Section */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl mr-2">★</span>
                  <h2 className="text-xl font-bold text-gray-900">리얼 리뷰 <span className="text-2xl">9.0</span></h2>
                  <span className="text-gray-400 text-sm ml-2">100명 평가 · 100개 리뷰</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center cursor-pointer">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  추천순
                </div>
              </div>

              <div className="space-y-8">
                {/* Mock Review */}
                <div className="border-b border-gray-100 pb-8 last:border-0">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <img src="/images/jeju.png" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-bold text-gray-900 text-sm mr-2">Lv. 1</span>
                        <span className="font-bold text-gray-900 text-sm">사용자</span>
                      </div>
                      <div className="text-xs text-gray-400">리뷰 1</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-sm mr-2">
                      ★★★★★
                    </div>
                    <span className="text-xs text-gray-400">2024.01.01</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    좋은 숙소입니다.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar (30%) */}
          <div className="hidden lg:block w-[30%]">
            <div className="sticky top-24 space-y-4">

              {/* AI Recommendation Button */}


              {/* Coupon Box */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900">숙박 4,500원 쿠폰</span>
                  <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">전체 받기</button>
                </div>
                <div className="text-sm text-gray-500">대실 2,500원 쿠폰</div>
                <div className="mt-3 text-xs text-gray-400 flex items-center cursor-pointer">
                  적용 가능한 쿠폰 혜택 <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {/* Payment Benefits */}
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900">결제 혜택</span>
                  <span className="text-xs text-gray-500 cursor-pointer">더보기 &gt;</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">토스페이</span>
                    <span>3만원 이상, 10% 최대 1만원 할인</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-500 font-bold mr-2">카카오페이</span>
                    <span>2만원 이상, 2천원 할인</span>
                  </div>
                </div>
              </div>

              {/* Ad Banner */}
              <div className="rounded-xl overflow-hidden bg-gray-100 h-32 flex items-center justify-center text-gray-400">
                광고 배너 영역
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* AI Recommendation Window */}
      <AIRecommendationWindow
        isOpen={isAIWindowOpen}
        onClose={() => setIsAIWindowOpen(false)}
        reviews={[]}
        accommodationName={destination.title}
      />

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={uniqueImages.length > 0 ? uniqueImages : displayImages}
      />
    </div>
  );
};

export default DetailPage;
