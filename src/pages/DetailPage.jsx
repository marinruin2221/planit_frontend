import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion } from "@chakra-ui/react";

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

import { accommodations } from '../data/mockData';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const brandColor = 'rgba(177,78,33,1)';
  const [destination, setDestination] = useState(null);

  // Accommodation Data (Yeogi Style) - imported from mockData

  useEffect(() => {
    const found = accommodations.find(d => d.id === parseInt(id));
    setDestination(found);
  }, [id]);

  if (!destination) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col" style={{ fontFamily: 'SCoreDream4, sans-serif' }}>
      {/* Header */}
      <Header />

      {/* Main Content & Sidebar Wrapper */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

          {/* Left Content (70%) */}
          <div className="w-full lg:w-[70%]">

            {/* Image Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] mb-8 rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2 relative">
                <img src={destination.image} alt="Main" className="w-full h-full object-cover" />
                <button className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  사진 더보기
                </button>
              </div>
              <div className="col-span-1 row-span-1"><img src="/images/city.png" alt="Sub 1" className="w-full h-full object-cover" /></div>
              <div className="col-span-1 row-span-1"><img src="/images/beach.png" alt="Sub 2" className="w-full h-full object-cover" /></div>
              <div className="col-span-1 row-span-1"><img src="/images/jeju.png" alt="Sub 3" className="w-full h-full object-cover" /></div>
              <div className="col-span-1 row-span-1"><img src="/images/city.png" alt="Sub 4" className="w-full h-full object-cover" /></div>
            </div>

            {/* Header Info */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="text-sm text-gray-500 mb-2">{destination.type}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{destination.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-yellow-400 text-white text-sm font-bold px-1.5 py-0.5 rounded">{destination.rating}</span>
                <span className="text-gray-500 text-sm">{destination.reviewCount}명 평가</span>
              </div>
              <div className="text-gray-600 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {destination.location}
                <button className="ml-2 text-blue-500 text-sm font-medium hover:underline">지도보기</button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <span className="font-bold text-gray-800 mr-2">사장님 한마디</span>
                {destination.description}
              </div>
            </div>

            {/* Room List */}
            <div className="space-y-6 mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">객실 선택</h2>
              {destination.rooms && destination.rooms.map((room) => (
                <div key={room.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row transition-all duration-200 hover:bg-[#dd6b20] hover:shadow-lg">
                  {/* Room Image */}
                  <div className="w-full md:w-[300px] h-48 md:h-auto relative flex-shrink-0">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" />
                    <button className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">상세정보 &gt;</button>
                  </div>

                  {/* Room Options */}
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">{room.name}</h3>

                    <div className="space-y-4">
                      {/* Day Use Option */}
                      {room.dayUse && (
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0 group-hover:border-white/20 transition-colors">
                          <div>
                            <div className="font-bold text-gray-800 mb-1 group-hover:text-white transition-colors">대실</div>
                            <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">최대 {room.dayUse.time} 이용</div>
                            <div className="text-xs text-gray-400 group-hover:text-white/60 transition-colors">마감 {room.dayUse.close}</div>
                          </div>
                          <div className="text-right">
                            {room.dayUse.original && <div className="text-xs text-gray-400 line-through group-hover:text-white/60 transition-colors">{room.dayUse.original}</div>}
                            <div className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors">{room.dayUse.price}</div>
                            <button className="mt-1 bg-red-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-600 group-hover:bg-white group-hover:text-[#dd6b20] transition-colors">대실 예약</button>
                          </div>
                        </div>
                      )}

                      {/* Stay Option */}
                      {room.stay && (
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-gray-800 mb-1 group-hover:text-white transition-colors">숙박</div>
                            <div className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">입실 {room.stay.checkIn}</div>
                            <div className="text-xs text-gray-400 group-hover:text-white/60 transition-colors">퇴실 {room.stay.checkOut}</div>
                          </div>
                          <div className="text-right">
                            <div className="bg-red-100 text-red-500 text-xs px-1 rounded inline-block mb-1 group-hover:bg-white group-hover:text-[#dd6b20] transition-colors">선착순 특가</div>
                            {room.stay.originalPrice && <div className="text-xs text-gray-400 line-through group-hover:text-white/60 transition-colors">{room.stay.originalPrice}</div>}
                            <div className="text-lg font-bold text-red-500 group-hover:text-white transition-colors">{room.stay.price}</div>
                            <button className="mt-1 bg-red-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-600 group-hover:bg-white group-hover:text-[#dd6b20] transition-colors">숙박 예약</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Facilities & Map */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">서비스 및 부대시설</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {['무선인터넷', '주차장', '반신욕', '드윈베드', '게임기', '스타일러', 'OTT', '스프링쿨러'].map((fac, idx) => (
                  <div key={idx} className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {fac}
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-4">위치</h2>
              <div className="rounded-xl overflow-hidden h-[300px] bg-gray-100 relative">
                <img src="/images/city.png" alt="Map" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-gray-800 hover:bg-gray-50">지도 크게 보기</button>
                </div>
              </div>
              <div className="mt-4 text-gray-600 text-sm">
                {destination.location} <span className="text-blue-500 cursor-pointer ml-2">주소복사</span>
              </div>
            </div>

            {/* Review Section */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl mr-2">★</span>
                  <h2 className="text-xl font-bold text-gray-900">리얼 리뷰 <span className="text-2xl">{destination.rating}</span></h2>
                  <span className="text-gray-400 text-sm ml-2">{destination.reviewCount}명 평가 · {destination.reviewCount}개 리뷰</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center cursor-pointer">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  추천순
                </div>
              </div>

              <div className="space-y-8">
                {destination.reviews && destination.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0">
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                        {/* Placeholder for user image */}
                        <img src="/images/jeju.png" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-bold text-gray-900 text-sm mr-2">{review.user.level}</span>
                          <span className="font-bold text-gray-900 text-sm">{review.user.name}</span>
                        </div>
                        <div className="text-xs text-gray-400">{review.user.stats}</div>
                      </div>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 text-sm mr-2">
                        {'★'.repeat(Math.floor(review.rating))}
                        {review.rating % 1 !== 0 && '☆'}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>

                    <div className="flex space-x-2 overflow-x-auto mb-4 pb-2">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                          <img src={img} alt={`Review ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-400 mb-2">{review.roomType}</div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {review.content}
                    </p>
                    <Accordion.Root collapsible>
                      <Accordion.Item value={`review-${review.id}`} border="none">
                        <Accordion.ItemContent p={0}>
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mt-2">
                            (더보기 내용 예시) 이곳에 추가적인 리뷰 내용이 들어갑니다. 숙소의 위생 상태, 서비스, 주변 편의시설 등에 대한 자세한 후기를 확인하실 수 있습니다.
                          </p>
                        </Accordion.ItemContent>
                        <Accordion.ItemTrigger className="text-sm text-gray-500 cursor-pointer hover:underline justify-start p-0 mt-2">
                          더보기 ∨
                        </Accordion.ItemTrigger>
                      </Accordion.Item>
                    </Accordion.Root>
                  </div>
                ))}
                {!destination.reviews && <div className="text-center text-gray-500 py-8">등록된 리뷰가 없습니다.</div>}
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
    </div>
  );
};

export default DetailPage;
