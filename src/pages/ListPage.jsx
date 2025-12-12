import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ListPage = () => {
  const brandColor = 'rgba(177,78,33,1)';
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Accommodation Data (Yeogi Style)
  const accommodations = [
    {
      id: 1,
      type: '블랙 · 5성급 · 호텔',
      name: '인스파이어 엔터테인먼트 리조트',
      location: '중구 · 왕산해수욕장 차량 7분',
      rating: '9.5',
      reviewCount: '1,506',
      price: '378,510원',
      originalPrice: '497,000원',
      image: '/images/jeju.png',
      badges: []
    },
    {
      id: 2,
      type: '모텔',
      name: '구월 호텔반월',
      location: '인천터미널역 도보 14분',
      rating: '9.4',
      reviewCount: '14,023',
      price: '22,500원',
      originalPrice: '25,000원',
      image: '/images/city.png',
      badges: ['대실 특가']
    },
    {
      id: 3,
      type: '모텔',
      name: '구월동 구월호텔 九',
      location: '인천터미널역 도보 14분',
      rating: '9.4',
      reviewCount: '13,971',
      price: '25,000원',
      originalPrice: '30,000원',
      image: '/images/beach.png',
      badges: []
    },
    {
      id: 4,
      type: '호텔',
      name: '오크우드 프리미어 인천',
      location: '연수구 · 인천대입구역 도보 10분',
      rating: '9.7',
      reviewCount: '3,210',
      price: '250,000원',
      originalPrice: '320,000원',
      image: '/images/city.png',
      badges: ['쿠폰할인']
    },
    {
      id: 5,
      type: '펜션',
      name: '강화도 힐링 펜션',
      location: '강화군 · 동막해수욕장 차량 5분',
      rating: '9.2',
      reviewCount: '540',
      price: '120,000원',
      originalPrice: '150,000원',
      image: '/images/jeju.png',
      badges: []
    },
    {
      id: 6,
      type: '리조트',
      name: '네스트 호텔',
      location: '중구 · 인천공항 차량 10분',
      rating: '9.6',
      reviewCount: '5,100',
      price: '180,000원',
      originalPrice: '220,000원',
      image: '/images/beach.png',
      badges: ['조식포함']
    }
  ];

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 w-full flex justify-center">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold" style={{ color: brandColor }}>PlanIt</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">홈</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">여행지</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">특가</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">커뮤니티</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              className="text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap"
              style={{ backgroundColor: brandColor }}
            >
              로그인
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">홈</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">여행지</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">특가</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">커뮤니티</a>
            </div>
            <div className="pt-4 pb-4 border-t border-gray-100">
              <div className="flex items-center px-5">
                <button
                  className="w-full text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                  style={{ backgroundColor: brandColor }}
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Swiper - Full Width */}
      <section className="relative w-full h-[400px] md:h-[600px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
          style={{
            '--swiper-theme-color': brandColor,
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': brandColor,
          }}
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="/images/beach.png"
                alt="Beach"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-20">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">꿈꾸던 여행을 떠나보세요</h1>
                <p className="text-lg md:text-2xl mb-8">당신을 위한 특별한 여행지가 기다리고 있습니다.</p>
                <button
                  className="px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-transform transform hover:scale-105 whitespace-nowrap"
                  style={{ backgroundColor: brandColor }}
                >
                  여행지 찾아보기
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="/images/mountain.png"
                alt="Mountains"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-20">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">자연 속으로의 초대</h1>
                <p className="text-lg md:text-2xl mb-8">일상에서 벗어나 진정한 휴식을 경험하세요.</p>
                <button
                  className="px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-transform transform hover:scale-105 whitespace-nowrap"
                  style={{ backgroundColor: brandColor }}
                >
                  힐링 여행 예약
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="/images/city.png"
                alt="City"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pb-20">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">도시의 낭만</h1>
                <p className="text-lg md:text-2xl mb-8">새로운 문화와 만나는 설레는 순간.</p>
                <button
                  className="px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-semibold transition-transform transform hover:scale-105 whitespace-nowrap"
                  style={{ backgroundColor: brandColor }}
                >
                  도시 여행 가이드
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Search Section */}
      <div className="w-full px-4 relative z-20 -mt-16 mb-16 flex justify-center">
        <div className="w-[70%] mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center border border-gray-100">
          <div className="flex-1 w-full">
            <label className="block text-base font-bold text-gray-900 mb-1">여행지</label>
            <input type="text" placeholder="어디로 떠나시나요?" className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 border text-gray-900" style={{ focusRingColor: brandColor }} />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-base font-bold text-gray-900 mb-1">날짜</label>
            <input type="date" className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 border text-gray-900" style={{ focusRingColor: brandColor }} />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-base font-bold text-gray-900 mb-1">인원</label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 p-2 border text-gray-900" style={{ focusRingColor: brandColor }}>
              <option>성인 2명</option>
              <option>성인 1명</option>
              <option>가족 (성인 2, 아동 1)</option>
            </select>
          </div>
          <button
            className="w-full md:w-auto text-white px-8 py-3 rounded-md font-medium mt-6 md:mt-0 transition-colors whitespace-nowrap"
            style={{ backgroundColor: brandColor }}
          >
            검색
          </button>
        </div>
      </div>

      {/* Main Content Area (Sidebar + List) */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">

          {/* Left Sidebar - Filters */}
          <aside className="hidden lg:block w-[250px] flex-shrink-0 space-y-8">
            {/* Map Button */}
            <div className="rounded-lg overflow-hidden h-32 relative border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
              <img src="/images/city.png" alt="Map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 transition-colors">
                  지도 보기
                </button>
              </div>
            </div>

            {/* Filter: Sold Out */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">필터</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-red-500 rounded border-gray-300 focus:ring-red-500" />
                <span className="text-gray-600">매진 숙소 제외</span>
              </label>
            </div>

            {/* Filter: Accommodation Type */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">숙소유형</h3>
              <div className="space-y-3">
                {['전체', '모텔', '호텔·리조트', '펜션', '홈&빌라', '캠핑', '게하·한옥'].map((type, idx) => (
                  <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="accType" className="form-radio h-4 w-4 text-red-500 border-gray-300 focus:ring-red-500" defaultChecked={idx === 0} />
                    <span className="text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Price */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">가격 <span className="text-xs font-normal text-gray-400">1박 기준</span></h3>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1만원</span>
                <span>30만원~</span>
              </div>
            </div>

            {/* Filter: #Preference */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">#취향</h3>
              <div className="flex flex-wrap gap-2">
                {['#숙박페스타', '#가족여행숙소', '#스파', '#파티룸', '#OTT', '#연인추천', '#감성숙소', '#뷰맛집', '#연박특가'].map((tag, idx) => (
                  <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                    {tag}
                  </button>
                ))}
                <button className="text-xs text-blue-500 font-medium mt-1">더 보기 ⌄</button>
              </div>
            </div>

            {/* Filter: Discount Benefits */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">할인혜택</h3>
              <div className="flex flex-wrap gap-2">
                {['쿠폰할인', '무한대실', '할인특가'].map((benefit, idx) => (
                  <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                    {benefit}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Reservation Type */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">예약유형</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-red-500 rounded border-gray-300 focus:ring-red-500" />
                <span className="text-gray-600">내실예약</span>
              </label>
            </div>

            {/* Filter: Grade */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">등급</h3>
              <div className="flex flex-wrap gap-2">
                {['5성급', '4성급', '블랙', '풀빌라'].map((grade, idx) => (
                  <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Facilities */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">시설</h3>

              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-500 mb-2">공용시설</h4>
                <div className="flex flex-wrap gap-2">
                  {['사우나', '수영장', '바베큐', '레스토랑', '피트니스', '물놀이시설'].map((fac, idx) => (
                    <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-500 mb-2">객실 내 시설</h4>
                <div className="flex flex-wrap gap-2">
                  {['스파/월풀', '객실스파', '미니바', '무선인터넷', '에어컨', '욕실용품'].map((fac, idx) => (
                    <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 mb-2">기타시설</h4>
                <div className="flex flex-wrap gap-2">
                  {['조식제공', '무료주차', '반려견동반'].map((fac, idx) => (
                    <button key={idx} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
                <button className="text-xs text-blue-500 font-medium mt-2">더 보기 ⌄</button>
              </div>
            </div>
          </aside>

          {/* Right Content - List */}
          <section className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">'인천' 검색 결과 {accommodations.length.toLocaleString()}개</h2>
              <div className="relative">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium">
                  <span>추천순</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {accommodations.map((acc) => (
                <div
                  key={acc.id}
                  className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row h-auto sm:h-[220px]"
                  onClick={() => navigate(`/detail/${acc.id}`)}
                >
                  {/* Image */}
                  <div className="w-full sm:w-[320px] h-48 sm:h-full relative flex-shrink-0">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">{acc.type}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{acc.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">{acc.location}</div>
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="bg-yellow-400 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          {acc.rating}
                        </span>
                        <span className="text-sm text-gray-400">({acc.reviewCount}명 평가)</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                      {acc.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mb-1">{acc.originalPrice}</span>
                      )}
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 mb-1">쿠폰 적용시</span>
                        <span className="text-2xl font-bold text-gray-900">{acc.price}</span>
                      </div>
                      {acc.badges.length > 0 && (
                        <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {acc.badges[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Banner Section */}
      <section className="w-full py-16 flex justify-center">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 shadow-lg">
            <img
              src="/images/jeju.png"
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">특별한 멤버십 혜택</h2>
              <p className="text-base md:text-xl mb-8 max-w-xl">지금 가입하고 전 세계 호텔 10% 추가 할인 혜택을 받으세요. 더 많은 여행이 당신을 기다립니다.</p>
              <button
                className="w-fit bg-white text-gray-900 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                멤버십 가입하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12 mt-auto flex justify-center">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <span className="text-2xl font-bold" style={{ color: brandColor }}>PlanIt</span>
              <p className="mt-4 text-gray-400">
                당신의 모든 여행을 함께합니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">여행지</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">국내 여행</a></li>
                <li><a href="#" className="hover:text-white">해외 여행</a></li>
                <li><a href="#" className="hover:text-white">테마 여행</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">고객 지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">공지사항</a></li>
                <li><a href="#" className="hover:text-white">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white">1:1 문의</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">SNS</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Youtube</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 PlanIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ListPage;
