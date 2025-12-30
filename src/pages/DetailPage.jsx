import { getFallbackImage } from '@utils/imageUtils'; // Import utility

import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { Accordion } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import KakaoMap from "@components/map/kakaomap.jsx";
import AIRecommendationWindow from "@components/ai/AIRecommendationWindow.jsx";
import ImageGalleryModal from "@components/common/ImageGalleryModal.jsx";
import PaymentModal from "@components/payment/PaymentModal.jsx";

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
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // 결제 관련 상태
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRoomForPayment, setSelectedRoomForPayment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

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
    fetchPrice();
  }, [id]);

  useEffect(() => {
  }, [destination]);

  const handlePaymentClick = (roomName, price) => {
    setSelectedRoomForPayment(roomName);
    setPaymentAmount(price);
    setIsPaymentModalOpen(true);
  };

  // contentid 기반 일관된 랜덤 값 생성 (ListPage와 동일한 로직)
  const getRandomRating = (contentid) => {
    if (!contentid) return { score: 7.5, reviewCount: 50, label: '추천해요' };

    let hash = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }

    // 점수: 3.0 ~ 9.0 (0.1 단위)
    const score = (Math.abs(hash % 61) + 30) / 10;

    // 리뷰 수: 10 ~ 120
    const reviewCount = (Math.abs((hash >> 8) % 111)) + 10;

    // 점수에 따른 추천 문구 및 색상
    let label = '좋아요';
    let colorClass = 'text-green-500';

    if (score >= 8.5) {
      label = '최고에요';
      colorClass = 'text-orange-600';
    } else if (score >= 7.0) {
      label = '추천해요';
      colorClass = 'text-yellow-500';
    } else if (score >= 5.0) {
      label = '괜찮아요';
      colorClass = 'text-blue-500';
    } else {
      label = '보통이에요';
      colorClass = 'text-gray-500';
    }

    return { score: score.toFixed(1), reviewCount, label, colorClass };
  };

  // 더미 리뷰 생성 함수
  const generateDummyReviews = (contentid, reviewCount) => {
    const reviewerNames = [
      '여행러버', '힐링여행', '가족여행자', '커플여행', '솔로여행러',
      '맛집탐험가', '휴식추구', '액티비티러버', '뷰맛집탐방', '청결중시',
      '서비스중시', '위치중시', '가성비왕', '럭셔리러버', '조용한휴식'
    ];

    const reviewContents = [
      '정말 좋았습니다! 다음에 또 방문하고 싶어요.',
      '깨끗하고 위치도 좋았습니다. 추천합니다.',
      '직원분들이 친절하셔서 기분 좋게 묵었습니다.',
      '가격 대비 만족스러웠어요. 시설이 깔끔합니다.',
      '전망이 정말 좋았어요! 사진보다 실제가 더 좋았습니다.',
      '조용하고 편안하게 쉬다 왔습니다.',
      '위치가 좋아서 관광하기 편했어요.',
      '침구가 깨끗하고 푹신해서 잘 잤습니다.',
      '조식도 맛있고, 전체적으로 만족스러웠어요.',
      '화장실이 넓고 깨끗해서 좋았습니다.',
      '주차가 편리해서 좋았어요.',
      '체크인/체크아웃이 빠르고 편리했습니다.',
      '가족 여행으로 방문했는데 아이들도 좋아했어요.',
      '커플 여행으로 왔는데 분위기가 좋았습니다.',
      '비즈니스 출장으로 이용했는데 편했습니다.'
    ];

    // contentid 기반 시드 생성
    let seed = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed = seed & seed;
    }

    const reviews = [];

    for (let i = 0; i < reviewCount; i++) {
      const reviewSeed = Math.abs((seed * (i + 1)) & 0xFFFFFFFF);

      // 리뷰어 정보
      const nameIdx = reviewSeed % reviewerNames.length;
      const level = (reviewSeed % 10) + 1;
      const userReviewCount = ((reviewSeed >> 4) % 50) + 1;

      // 별점 (3~5점)
      const starCount = (reviewSeed % 3) + 3;

      // 리뷰 내용
      const contentIdx = (reviewSeed >> 8) % reviewContents.length;

      // 날짜 (최근 1년 내)
      const daysAgo = (reviewSeed % 365);
      const reviewDate = new Date();
      reviewDate.setDate(reviewDate.getDate() - daysAgo);
      const dateStr = `${reviewDate.getFullYear()}.${String(reviewDate.getMonth() + 1).padStart(2, '0')}.${String(reviewDate.getDate()).padStart(2, '0')}`;

      reviews.push({
        id: i,
        name: reviewerNames[nameIdx],
        level: level,
        userReviewCount: userReviewCount,
        stars: starCount,
        date: dateStr,
        content: reviewContents[contentIdx]
      });
    }

    return reviews;
  };

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

  // Ensure we have exactly 5 images using the correct fallback strategy
  const fallbackImg = getFallbackImage(destination.cat3);
  const displayImages = Array.from({ length: 5 }, (_, i) => uniqueImages[i] || fallbackImg);

  const SafeImage = ({ src, alt, className, fallback }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleError = () => {
      if (!hasError) {
        setImgSrc(fallback);
        setHasError(true);
      }
    };

    return (
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        onError={handleError}
      />
    );
  };

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content & Sidebar Wrapper */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

          {/* Left Content (70%) */}
          <div className="w-full lg:w-[70%]">

            {/* Image Gallery - Flexbox Mosaic Layout */}
            <div className="flex h-[400px] mb-8 rounded-xl overflow-hidden bg-black">
              {/* Left: Main Image (50%) */}
              <div className="w-1/2 h-full relative">
                <SafeImage
                  src={displayImages[0]}
                  fallback={getFallbackImage(destination.cat3)}
                  alt="Main"
                  className="w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover -m-[1px]"
                />
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute bottom-4 right-4 !bg-[#FCFCFC] !text-[#DD6B20] px-6 py-3 rounded-full text-sm font-bold inline-flex items-center justify-center shadow-lg hover:!text-[#C05621] hover:bg-gray-50 transition-all transform hover:scale-105 z-50 cursor-pointer whitespace-nowrap w-fit gap-2"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  사진 전체보기
                </button>
              </div>

              {/* Right: Sub Images Grid (50%) */}
              <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2">
                <div className="relative h-full overflow-hidden">
                  <SafeImage
                    src={displayImages[1]}
                    fallback={getFallbackImage(destination.cat3)}
                    alt="Sub 1"
                    className="w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover -m-[1px]"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <SafeImage
                    src={displayImages[2]}
                    fallback={getFallbackImage(destination.cat3)}
                    alt="Sub 2"
                    className="w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover -m-[1px]"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <SafeImage
                    src={displayImages[3]}
                    fallback={getFallbackImage(destination.cat3)}
                    alt="Sub 3"
                    className="w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover -m-[1px]"
                  />
                </div>
                <div className="relative h-full overflow-hidden">
                  <SafeImage
                    src={displayImages[4]}
                    fallback={getFallbackImage(destination.cat3)}
                    alt="Sub 4"
                    className="w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover -m-[1px]"
                  />
                </div>
              </div>
            </div>

            {/* Header Info */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="text-sm text-gray-500 mb-2">숙박</div>
              <h1 className="font-bold text-gray-900 mb-3 leading-tight text-title-xl">{destination.title}</h1>
              {(() => {
                const { score, reviewCount, label, colorClass } = getRandomRating(id);
                const rating = parseFloat(score) / 2;
                return (
                  <div className="flex items-center mb-4 gap-3">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (rating >= star) return <FaStar key={star} className="text-yellow-400 text-sm" />;
                        if (rating >= star - 0.5) return <FaStarHalfAlt key={star} className="text-yellow-400 text-sm" />;
                        return <FaRegStar key={star} className="text-gray-300 text-sm" />;
                      })}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{score}</span>
                    <span className={`text-sm font-medium ${colorClass}`}>{label}</span>
                    <span className="text-sm text-gray-500">· 이용자 리뷰 {reviewCount}개</span>
                  </div>
                );
              })()}
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
                    const roomImage = room.roomimg1 || room.roomimg2 || room.roomimg3 || images[index + 2] || getFallbackImage(destination.cat3);
                    let priceStr = room.roomoffseasonminfee1 || room.roomoffseasonminfee2 || room.roompeakseasonminfee1;
                    let displayPrice = '가격 문의';
                    let priceValue = null;

                    if (priceStr) {
                      priceValue = parseInt(priceStr);
                      displayPrice = priceValue.toLocaleString() + '원';
                    } else if (estimatedPrice) {
                      priceValue = estimatedPrice;
                      displayPrice = `${estimatedPrice.toLocaleString()}원`;
                    }

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
                            onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(destination.cat3); }}
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
                          <div className="flex justify-end items-center mt-4 md:mt-0">
                            <div className="flex flex-col items-center gap-1">
                              <div className="text-lg font-bold text-gray-900">{displayPrice}</div>
                              <div className="text-xs text-gray-400">1박, 세금 포함</div>
                              <button
                                onClick={() => handlePaymentClick(room.roomtitle || `객실 ${index + 1}`, priceValue || 50000)}
                                style={{ backgroundColor: '#DD6B20', color: '#FCFCFC', minWidth: '120px' }}
                                className="hover:brightness-90 font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-md mt-2"
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
                  <div className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:border-gray-900 transition-colors">
                    <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={destination.firstimage || getFallbackImage(destination.cat3)}
                        alt="Standard Room"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(destination.cat3); }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Standard Room</h3>
                        <p className="text-sm text-gray-500 mb-2">기준 2인 / 최대 2인</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">더블 침대</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">무료 와이파이</span>
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-4 md:mt-0">
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-lg font-bold text-gray-900">{estimatedPrice.toLocaleString()}원</div>
                          <div className="text-xs text-gray-400">1박, 세금 포함</div>
                          <button
                            onClick={() => handlePaymentClick('Standard Room', estimatedPrice)}
                            style={{ backgroundColor: '#DD6B20', color: '#FCFCFC', minWidth: '120px' }}
                            className="hover:brightness-90 font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-md mt-2"
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

            {/* Location */}
            <div className="mb-12">
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
                {(() => {
                  const { score, reviewCount, label } = getRandomRating(id);
                  return (
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-2xl mr-2">★</span>
                      <h2 className="text-xl font-bold text-gray-900">리얼 리뷰 <span className="text-2xl">{score}</span></h2>
                      <span className="text-gray-400 text-sm ml-2">{reviewCount}명 평가 · {reviewCount}개 리뷰</span>
                    </div>
                  );
                })()}
                <div className="text-sm text-gray-500 flex items-center cursor-pointer">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  추천순
                </div>
              </div>

              <div className="space-y-8">
                {(() => {
                  const { reviewCount } = getRandomRating(id);
                  const dummyReviews = generateDummyReviews(id, reviewCount);
                  return dummyReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mr-3 flex items-center justify-center text-white font-bold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-bold text-gray-900 text-sm mr-2">Lv. {review.level}</span>
                            <span className="font-bold text-gray-900 text-sm">{review.name}</span>
                          </div>
                          <div className="text-xs text-gray-400">리뷰 {review.userReviewCount}</div>
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 text-sm mr-2">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{review.content}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar (30%) */}
          <div className="hidden lg:block w-[30%]">
            <div className="sticky top-24 space-y-4">

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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={paymentAmount}
        orderName={selectedRoomForPayment}
        customerName="테스트유저"
      />
    </div>
  );
};

export default DetailPage;
