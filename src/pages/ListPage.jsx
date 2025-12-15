import React, { useState, useEffect, useRef } from 'react';
import { Button, HStack, RadioGroup, Stack, Box, Text, Accordion } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { accommodations as mockAccommodations } from '../data/mockData';

const ListPage = () => {
  const brandColor = 'rgba(177,78,33,1)';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchPersonnel, setSearchPersonnel] = useState('성인 2명');
  const [selectedType, setSelectedType] = useState('전체');
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [filteredAccommodations, setFilteredAccommodations] = useState(mockAccommodations);

  const listRef = useRef(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 10;

  // Initialize state from URL params
  useEffect(() => {
    const keywordParam = searchParams.get('keyword');
    const dateParam = searchParams.get('date');
    const personnelParam = searchParams.get('personnel');
    const categoryParam = searchParams.get('category');
    // Note: 'personal', 'checkIn', 'checkOut', 'sortType' are available in params but not yet fully implemented in filter logic

    if (keywordParam) {
      setSearchTerm(keywordParam);
    }
    if (dateParam) {
      setSearchDate(dateParam);
    }
    if (personnelParam) {
      setSearchPersonnel(personnelParam);
    }

    // Map category param to selectedType if needed, or just use it directly if values match
    // For now, we'll stick to the internal state names but you could add a mapping here
  }, []); // Run once on mount

  // Filter logic
  useEffect(() => {
    let result = mockAccommodations;

    // Filter by Type
    if (selectedType !== '전체') {
      if (selectedType === '호텔·리조트') {
        result = result.filter(acc => acc.type === '호텔' || acc.type === '리조트');
      } else if (selectedType === '게하·한옥') {
        result = result.filter(acc => acc.type === '게하·한옥' || acc.type === '게스트하우스' || acc.type === '한옥');
      } else {
        result = result.filter(acc => acc.type === selectedType);
      }
    }

    // Filter by Region
    if (selectedRegion !== '전체') {
      result = result.filter(acc => acc.location.includes(selectedRegion));
    }

    // Filter by Search Term (if any)
    if (searchTerm) {
      result = result.filter(acc =>
        acc.name.includes(searchTerm) || acc.location.includes(searchTerm)
      );
    }

    setFilteredAccommodations(result);
    // We don't reset page here to avoid loops if params change, but if filters change manually we might want to.
    // For now, let's keep it simple.
  }, [selectedType, selectedRegion, searchTerm]);

  const handleSearch = () => {
    // Update URL with current search state
    setSearchParams({
      keyword: searchTerm,
      date: searchDate,
      personnel: searchPersonnel,
      // Add other params as needed
    });
    scrollToList();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToList = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterClick = () => {
    scrollToList();
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccommodations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccommodations.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setSearchParams(prev => {
      prev.set('page', pageNumber);
      return prev;
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col" style={{ fontFamily: 'SCoreDream4, sans-serif' }}>
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
          <div className="flex-1 w-full border border-gray-200 rounded-lg px-4 py-2 flex flex-col justify-center h-full">
            <label className="block text-xs font-bold text-gray-500 mb-0.5">여행지</label>
            <input
              type="text"
              placeholder="어디로 떠나시나요?"
              className="w-full border-none p-0 text-gray-900 focus:ring-0 text-sm font-medium placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex-1 w-full border border-gray-200 rounded-lg px-4 py-2 flex flex-col justify-center h-full">
            <label className="block text-xs font-bold text-gray-500 mb-0.5">날짜</label>
            <input
              type="date"
              className="w-full border-none p-0 text-gray-900 focus:ring-0 text-sm font-medium"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="flex-1 w-full border border-gray-200 rounded-lg px-4 py-2 flex flex-col justify-center h-full">
            <label className="block text-xs font-bold text-gray-500 mb-0.5">인원</label>
            <select
              className="w-full border-none p-0 text-gray-900 focus:ring-0 text-sm font-medium"
              value={searchPersonnel}
              onChange={(e) => setSearchPersonnel(e.target.value)}
            >
              <option>성인 2명</option>
              <option>성인 1명</option>
              <option>가족 (성인 2, 아동 1)</option>
            </select>
          </div>
          <Button
            onClick={handleSearch}
            size="lg"
            borderRadius="full"
            bg="#dd6b20"
            color="white"
            _hover={{ bg: "#c05621" }}
            px={8}
            mt={{ base: 6, md: 0 }}
            w={{ base: "full", md: "auto" }}
          >
            검색
          </Button>
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
                <input type="checkbox" className="form-checkbox h-5 w-5 text-red-500 rounded border-gray-300 focus:ring-red-500" onChange={handleFilterClick} />
                <span className="text-gray-600">매진 숙소 제외</span>
              </label>
            </div>

            {/* Filter: Region */}
            <div className="border-b border-gray-100 pb-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">지역</h3>
              <RadioGroup.Root value={selectedRegion} onValueChange={(e) => { setSelectedRegion(e.value); handleFilterClick(); }} colorPalette="orange">
                <Stack direction="column" gap={2}>
                  {['전체', '서울', '경기', '인천', '강원', '제주', '부산', '경상', '전라', '충청'].map((region) => (
                    <RadioGroup.Item key={region} value={region} className="flex items-center gap-2 cursor-pointer">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded-full border flex items-center justify-center transition-colors" />
                      <RadioGroup.ItemText className="text-sm text-gray-600">{region}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </Stack>
              </RadioGroup.Root>
            </div>

            {/* Filter: Accommodation Type */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">숙소유형</h3>
              <RadioGroup.Root value={selectedType} onValueChange={(e) => { setSelectedType(e.value); handleFilterClick(); }} colorPalette="orange">
                <Stack direction="column" gap={2}>
                  {['전체', '모텔', '호텔·리조트', '펜션', '홈&빌라', '캠핑', '게하·한옥'].map((type) => (
                    <RadioGroup.Item key={type} value={type} className="flex items-center gap-2 cursor-pointer">
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemControl className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded-full border flex items-center justify-center transition-colors" />
                      <RadioGroup.ItemText className="text-sm text-gray-600">{type}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </Stack>
              </RadioGroup.Root>
            </div>

            {/* Filter: Price */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">가격 <span className="text-xs font-normal text-gray-400">1박 기준</span></h3>
              <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" onChange={handleFilterClick} />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1만원</span>
                <span>30만원~</span>
              </div>
            </div>

            {/* Filter: #Preference */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">#취향</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {['#숙박페스타', '#가족여행숙소', '#스파', '#파티룸', '#OTT', '#연인추천', '#감성숙소', '#뷰맛집', '#연박특가'].map((tag, idx) => (
                  <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
              <Accordion.Root collapsible>
                <Accordion.Item value="more-pref" border="none">
                  <Accordion.ItemContent p={0}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['#애견동반', '#조식포함', '#오션뷰', '#마운틴뷰', '#시티뷰'].map((tag, idx) => (
                        <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </Accordion.ItemContent>
                  <Accordion.ItemTrigger className="text-xs text-blue-500 font-medium mt-1 p-0 hover:no-underline justify-start">
                    더 보기 ⌄
                  </Accordion.ItemTrigger>
                </Accordion.Item>
              </Accordion.Root>
            </div>

            {/* Filter: Discount Benefits */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">할인혜택</h3>
              <div className="flex flex-wrap gap-2">
                {['쿠폰할인', '무한대실', '할인특가'].map((benefit, idx) => (
                  <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                    {benefit}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Reservation Type */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">예약유형</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-red-500 rounded border-gray-300 focus:ring-red-500" onChange={handleFilterClick} />
                <span className="text-gray-600">내실예약</span>
              </label>
            </div>

            {/* Filter: Grade */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">등급</h3>
              <div className="flex flex-wrap gap-2">
                {['5성급', '4성급', '블랙', '풀빌라'].map((grade, idx) => (
                  <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
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
                    <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-500 mb-2">객실 내 시설</h4>
                <div className="flex flex-wrap gap-2">
                  {['스파/월풀', '객실스파', '미니바', '무선인터넷', '에어컨', '욕실용품'].map((fac, idx) => (
                    <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 mb-2">기타시설</h4>
                <div className="flex flex-wrap gap-2">
                  {['조식제공', '무료주차', '반려견동반'].map((fac, idx) => (
                    <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      {fac}
                    </button>
                  ))}
                </div>
                <Accordion.Root collapsible>
                  <Accordion.Item value="more-fac" border="none">
                    <Accordion.ItemContent p={0}>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['수화물보관', '노래방', '편의점', '카페', '비즈니스센터'].map((fac, idx) => (
                          <button key={idx} onClick={handleFilterClick} className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                            {fac}
                          </button>
                        ))}
                      </div>
                    </Accordion.ItemContent>
                    <Accordion.ItemTrigger className="text-xs text-blue-500 font-medium mt-2 p-0 hover:no-underline justify-start">
                      더 보기 ⌄
                    </Accordion.ItemTrigger>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </div>
          </aside>

          {/* Right Content - List */}
          <section className="flex-1" ref={listRef}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">검색 결과 {filteredAccommodations.length.toLocaleString()}개</h2>
              <div className="relative">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium">
                  <span>추천순</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {currentItems.map((acc, index) => (
                <div
                  key={acc.id}
                  className={`group bg-white overflow-hidden cursor-pointer flex flex-col sm:flex-row h-auto sm:h-[240px] py-8 px-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-[#dd6b20] hover:shadow-lg ${index !== currentItems.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  onClick={() => navigate(`/detail/${acc.id}`)}
                >
                  {/* Image */}
                  <div className="w-full sm:w-[320px] h-48 sm:h-full relative flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 text-white hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:px-8 sm:py-2 flex flex-col flex-grow justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 group-hover:text-white/80 transition-colors">{acc.type}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">{acc.name}</h3>
                      <div className="text-sm text-gray-500 mb-2 group-hover:text-white/80 transition-colors">{acc.location}</div>
                      <div className="flex items-center space-x-1 mb-2">
                        <span className="bg-yellow-400 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                          {acc.rating}
                        </span>
                        <span className="text-sm text-gray-400 group-hover:text-white/80 transition-colors">({acc.reviewCount}명 평가)</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                      {acc.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mb-1 group-hover:text-white/60 transition-colors">{acc.originalPrice}</span>
                      )}
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 mb-1 group-hover:text-white/80 transition-colors">쿠폰 적용시</span>
                        <span className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors">{acc.price}</span>
                      </div>
                      {acc.badges.length > 0 && (
                        <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded group-hover:bg-white group-hover:text-[#dd6b20] transition-colors">
                          {acc.badges[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <HStack mt={10} spacing={2} justify="center">
                {/* 이전 버튼 */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => paginate(currentPage - 1)}
                  isDisabled={currentPage === 1}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  이전
                </Button>

                {/* 번호 버튼들 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === currentPage;
                  return (
                    <Button
                      key={page}
                      size="sm"
                      borderRadius="full"
                      variant={isActive ? "solid" : "outline"}
                      bg={isActive ? "#dd6b20" : "transparent"}
                      color={isActive ? "white" : "gray.700"}
                      borderColor={isActive ? "#dd6b20" : "gray.300"}
                      _hover={{
                        bg: isActive ? "#dd6b20" : "gray.100",
                      }}
                      onClick={() => paginate(page)}
                    >
                      {page}
                    </Button>
                  );
                })}

                {/* 다음 버튼 */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => paginate(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  다음
                </Button>
              </HStack>
            )}
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
