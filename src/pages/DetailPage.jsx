import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const brandColor = 'rgba(177,78,33,1)';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [destination, setDestination] = useState(null);

  // Accommodation Data (Yeogi Style) - duplicated from ListPage
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
      badges: [],
      description: '영종도의 새로운 랜드마크, 인스파이어 엔터테인먼트 리조트에서 잊지 못할 경험을 만드세요.',
      details: '최고급 시설과 서비스, 다양한 엔터테인먼트 시설을 갖춘 복합 리조트입니다. 워터파크, 쇼핑몰, 카지노 등 다양한 즐길 거리가 가득합니다.',
      rooms: [
        { id: 101, name: '디럭스 킹', image: '/images/jeju.png', dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '378,510원', originalPrice: '497,000원' } },
        { id: 102, name: '디럭스 트윈', image: '/images/jeju.png', dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '378,510원', originalPrice: '497,000원' } }
      ],
      reviews: [
        {
          id: 1,
          user: { name: 'movincat', level: '베스트리뷰', stats: '리뷰 98 · 사진 166 · 장소 53' },
          rating: 5,
          date: '26일 전',
          roomType: '더 글램 - 오픈특가',
          images: ['/images/jeju.png', '/images/city.png', '/images/beach.png'],
          content: '구월 더 글램 호텔: 만족스러운 숙박 경험!\n인천 구월동에 위치한 더 글램 호텔은 기대 이상의 만족감을 선사했습니다.\n우선, 객실이 매우 깨끗하고 쾌적해서 기분 좋게 머물 수 있었습니다. 최신 시설과 깔끔하게 정돈된 침구 덕분에 편안한 휴식을 취할 수 있었고, 특히 넉넉한...'
        },
        {
          id: 2,
          user: { name: '내박잡사리', level: '베스트리뷰', stats: '리뷰 40 · 사진 76 · 장소 27' },
          rating: 4.5,
          date: '1개월 전',
          roomType: '스탠다드',
          images: ['/images/city.png', '/images/beach.png', '/images/jeju.png'],
          content: '편안하게 잘 쉬다 갑니다. 위치도 좋고 시설도 깔끔해요.'
        }
      ]
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
      badges: ['대실 특가'],
      description: '도심 속 편안한 휴식처, 구월 호텔반월입니다.',
      details: '깔끔하고 모던한 인테리어와 최신 시설을 갖춘 객실에서 편안한 휴식을 즐기세요. 넷플릭스 등 다양한 OTT 서비스를 이용할 수 있습니다.',
      rooms: [
        { id: 201, name: '스탠다드', image: '/images/city.png', dayUse: { time: '5시간', close: '21:00', price: '22,500원', original: '30,000원' }, stay: { checkIn: '18:00', checkOut: '12:00', price: '60,500원', original: '65,000원' } },
        { id: 202, name: '디럭스', image: '/images/city.png', dayUse: { time: '5시간', close: '21:00', price: '27,500원', original: '35,000원' }, stay: { checkIn: '18:00', checkOut: '12:00', price: '70,500원', original: '80,000원' } }
      ]
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
      badges: [],
      description: '감각적인 디자인과 최고의 서비스, 구월호텔 九입니다.',
      details: '넓고 쾌적한 객실과 친절한 서비스로 고객님을 모십니다. 주변에 맛집과 편의시설이 많아 이용이 편리합니다.',
      rooms: [
        { id: 301, name: '일반실', image: '/images/beach.png', dayUse: { time: '4시간', close: '22:00', price: '25,000원', original: '30,000원' }, stay: { checkIn: '20:00', checkOut: '12:00', price: '55,000원', original: '60,000원' } }
      ]
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
      badges: ['쿠폰할인'],
      description: '송도 국제도시의 랜드마크, 오크우드 프리미어 인천입니다.',
      details: '국내 최고층 빌딩인 포스코타워에 위치하여 탁 트인 전망을 자랑합니다. 레지던스 호텔로 주방 시설이 완비되어 있어 장기 투숙에도 적합합니다.',
      rooms: [
        { id: 401, name: '스튜디오 슈페리어', image: '/images/city.png', dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '250,000원', original: '320,000원' } }
      ]
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
      badges: [],
      description: '자연 속에서 즐기는 진정한 힐링, 강화도 힐링 펜션입니다.',
      details: '아름다운 정원과 바비큐 시설을 갖춘 펜션입니다. 가족, 연인과 함께 소중한 추억을 만들어보세요.',
      rooms: [
        { id: 501, name: '커플룸', image: '/images/jeju.png', dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '120,000원', original: '150,000원' } }
      ]
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
      badges: ['조식포함'],
      description: '디자인 호텔스 멤버, 네스트 호텔입니다.',
      details: '독창적인 건축 디자인과 자연 친화적인 인테리어가 돋보이는 호텔입니다. 서해 바다를 조망하며 여유로운 휴식을 즐길 수 있습니다.',
      rooms: [
        { id: 601, name: '스탠다드 더블', image: '/images/beach.png', dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '180,000원', original: '220,000원' } }
      ]
    }
  ];

  useEffect(() => {
    const found = accommodations.find(d => d.id === parseInt(id));
    setDestination(found);
  }, [id]);

  if (!destination) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-[2930px] bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 w-full flex justify-center">
        <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/list')}>
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
            <a href="#" onClick={() => navigate('/list')} className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">홈</a>
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
              <a href="#" onClick={() => navigate('/list')} className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">홈</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">여행지</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">특가</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">커뮤니티</a>
            </div>
            <div className="pt-4 pb-4 border-t border-gray-100">
              <div className="flex items-center px-5">
                <button
                  className="w-full text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  style={{ backgroundColor: brandColor }}
                >
                  로그인
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content & Sidebar Wrapper */}
      <div className="w-full flex justify-center py-8">
        <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">

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
                <div key={room.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                  {/* Room Image */}
                  <div className="w-full md:w-[300px] h-48 md:h-auto relative flex-shrink-0">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    <button className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">상세정보 &gt;</button>
                  </div>

                  {/* Room Options */}
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{room.name}</h3>

                    <div className="space-y-4">
                      {/* Day Use Option */}
                      {room.dayUse && (
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div>
                            <div className="font-bold text-gray-800 mb-1">대실</div>
                            <div className="text-sm text-gray-500">최대 {room.dayUse.time} 이용</div>
                            <div className="text-xs text-gray-400">마감 {room.dayUse.close}</div>
                          </div>
                          <div className="text-right">
                            {room.dayUse.original && <div className="text-xs text-gray-400 line-through">{room.dayUse.original}</div>}
                            <div className="text-lg font-bold text-gray-900">{room.dayUse.price}</div>
                            <button className="mt-1 bg-red-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-600 transition-colors">대실 예약</button>
                          </div>
                        </div>
                      )}

                      {/* Stay Option */}
                      {room.stay && (
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-gray-800 mb-1">숙박</div>
                            <div className="text-sm text-gray-500">입실 {room.stay.checkIn}</div>
                            <div className="text-xs text-gray-400">퇴실 {room.stay.checkOut}</div>
                          </div>
                          <div className="text-right">
                            <div className="bg-red-100 text-red-500 text-xs px-1 rounded inline-block mb-1">선착순 특가</div>
                            {room.stay.originalPrice && <div className="text-xs text-gray-400 line-through">{room.stay.originalPrice}</div>}
                            <div className="text-lg font-bold text-red-500">{room.stay.price}</div>
                            <button className="mt-1 bg-red-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-red-600 transition-colors">숙박 예약</button>
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
                    <div className="mt-2 text-sm text-gray-500 cursor-pointer hover:underline">더보기 ∨</div>
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
      <footer className="w-full bg-gray-900 text-white py-12 mt-auto flex justify-center">
        <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-6 lg:px-8">
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

export default DetailPage;
