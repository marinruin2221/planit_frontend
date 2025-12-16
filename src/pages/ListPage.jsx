import React, { useState, useEffect, useRef } from 'react';
import { Button, HStack, Stack, Box, Text, Accordion, Checkbox } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { accommodations as mockAccommodations } from '../data/mockData';
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import SearchForm from "@components/main/SearchForm.jsx";

const ListPage = () => {
  const brandColor = 'rgba(177,78,33,1)';
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchPersonnel, setSearchPersonnel] = useState('성인 2명');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
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
    if (selectedType.length > 0 && !selectedType.includes('전체')) {
      result = result.filter(acc => {
        return selectedType.some(type => {
          if (type === '호텔·리조트') {
            return acc.type === '호텔' || acc.type === '리조트';
          } else if (type === '게하·한옥') {
            return acc.type === '게하·한옥' || acc.type === '게스트하우스' || acc.type === '한옥';
          } else {
            return acc.type === type;
          }
        });
      });
    }

    // Filter by Region
    if (selectedRegion.length > 0 && !selectedRegion.includes('전체')) {
      result = result.filter(acc => selectedRegion.some(region => acc.location.includes(region)));
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

  const handleRegionChange = (value, isChecked) => {
    if (value === '전체') {
      setSelectedRegion(isChecked ? [] : []); // '전체' clicking clears others or just resets
      // Actually, if '전체' is clicked, we usually clear others.
      // But if we want '전체' to be a state, let's say empty array means '전체'.
      // If user clicks '전체', we clear the array.
      setSelectedRegion([]);
    } else {
      let newRegions = [...selectedRegion];
      if (isChecked) {
        newRegions.push(value);
      } else {
        newRegions = newRegions.filter(r => r !== value);
      }
      setSelectedRegion(newRegions);
    }
    scrollToList();
  };

  const handleTypeChange = (value, isChecked) => {
    if (value === '전체') {
      setSelectedType([]);
    } else {
      let newTypes = [...selectedType];
      if (isChecked) {
        newTypes.push(value);
      } else {
        newTypes = newTypes.filter(t => t !== value);
      }
      setSelectedType(newTypes);
    }
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
      {/* Header */}
      <Header />

      {/* Search Form */}
      <div className="w-full flex justify-center mt-8 mb-8">
        <div className="w-[70%]">
          <SearchForm />
        </div>
      </div>

      {/* Main Content Area (Sidebar + List) */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">

          {/* Left Sidebar - Filters */}
          <aside className="hidden lg:block w-[250px] flex-shrink-0 space-y-8" style={{ fontFamily: 'SCoreDream4, sans-serif' }}>
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
              <Stack direction="column" gap={2}>
                <Checkbox.Root
                  checked={selectedRegion.length === 0}
                  onCheckedChange={(e) => handleRegionChange('전체', !!e.checked)}
                  colorPalette="orange"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded border flex items-center justify-center transition-colors">
                    <Checkbox.Indicator className="text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </Checkbox.Indicator>
                  </Checkbox.Control>
                  <Checkbox.Label className="text-sm text-gray-600">전체</Checkbox.Label>
                </Checkbox.Root>
                {['서울', '경기', '인천', '강원', '제주', '부산', '경상', '전라', '충청'].map((region) => (
                  <Checkbox.Root
                    key={region}
                    checked={selectedRegion.includes(region)}
                    onCheckedChange={(e) => handleRegionChange(region, !!e.checked)}
                    colorPalette="orange"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded border flex items-center justify-center transition-colors">
                      <Checkbox.Indicator className="text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      </Checkbox.Indicator>
                    </Checkbox.Control>
                    <Checkbox.Label className="text-sm text-gray-600">{region}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
            </div>

            {/* Filter: Check Box Type */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-bold text-gray-900 mb-4">숙소유형</h3>
              <Stack direction="column" gap={2}>
                <Checkbox.Root
                  checked={selectedType.length === 0}
                  onCheckedChange={(e) => handleTypeChange('전체', !!e.checked)}
                  colorPalette="orange"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded border flex items-center justify-center transition-colors">
                    <Checkbox.Indicator className="text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </Checkbox.Indicator>
                  </Checkbox.Control>
                  <Checkbox.Label className="text-sm text-gray-600">전체</Checkbox.Label>
                </Checkbox.Root>
                {['모텔', '호텔·리조트', '펜션', '홈&빌라', '캠핑', '게하·한옥'].map((type) => (
                  <Checkbox.Root
                    key={type}
                    checked={selectedType.includes(type)}
                    onCheckedChange={(e) => handleTypeChange(type, !!e.checked)}
                    colorPalette="orange"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control className="border-gray-300 data-[checked]:bg-orange-500 data-[checked]:border-orange-500 w-4 h-4 rounded border flex items-center justify-center transition-colors">
                      <Checkbox.Indicator className="text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      </Checkbox.Indicator>
                    </Checkbox.Control>
                    <Checkbox.Label className="text-sm text-gray-600">{type}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
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

            <div className="flex flex-col gap-[10px]">
              {currentItems.map((acc, index) => (
                <React.Fragment key={acc.id}>
                  <div
                    className="group bg-white overflow-hidden cursor-pointer flex flex-col sm:flex-row h-auto sm:h-[240px] py-8 px-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-[#dd6b20] hover:shadow-lg"
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

                </React.Fragment>
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
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListPage;
