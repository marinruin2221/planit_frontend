import { getFallbackImage } from '@utils/imageUtils'; // Import utility

import React, { useState, useEffect, useRef } from 'react';

import { Button, HStack, Stack, Box, Text, Accordion, Checkbox, Tag } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";
import SearchForm from "@components/main/SearchForm.jsx";
import EventForm from "@components/main/EventForm.jsx";
import { EventList } from "@data/mockData";

const ListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchPersonnel, setSearchPersonnel] = useState('성인 2명');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [accommodations, setAccommodations] = useState([]); // API Data
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // 전체 검색 결과 수
  const [prices, setPrices] = useState({}); // {contentid: price }
  const [showMap, setShowMap] = useState(false); // 지도 보기 토글
  const mapRef = useRef(null); // 지도 인스턴스 저장

  const listRef = useRef(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 10;



  // Initialize state from URL params
  useEffect(() => {
    const keywordParam = searchParams.get('keyword');
    const dateParam = searchParams.get('date');
    const personnelParam = searchParams.get('personnel');

    if (keywordParam) {
      setSearchTerm(keywordParam);
    }
    if (dateParam) {
      setSearchDate(dateParam);
    }
    if (personnelParam) {
      setSearchPersonnel(personnelParam);
    }
  }, []);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 지역 코드 매핑 (VisitKorea 공식 코드)
        const regionCodeMap = {
          '서울': '1',
          '인천': '2',
          '대전': '3',
          '대구': '4',
          '광주': '5',
          '부산': '6',
          '울산': '7',
          '세종': '8',
          '경기': '31',
          '강원': '32',
          '충북': '33',
          '충남': '34',
          '경북': '35',
          '경남': '36',
          '전북': '37',
          '전남': '38',
          '제주': '39',
          '충청': '33', // 충북 대표
          '경상': '35', // 경북 대표
          '전라': '37', // 전북 대표
        };

        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('size', itemsPerPage);

        // 지역 필터
        if (selectedRegion.length > 0 && !selectedRegion.includes('전체')) {
          selectedRegion.forEach(region => {
            const code = regionCodeMap[region];
            if (code) {
              params.append('areaCode', code);
            }
          });
        }

        if (selectedType.length > 0 && !selectedType.includes('전체')) {
          selectedType.forEach(type => {
            params.append('category', type);
          });
        }

        // 가격 API 필터
        params.append('minPrice', priceRange[0]);
        params.append('maxPrice', priceRange[1]);

        const response = await fetch(`/api/tours?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Handle new response structure {items: [], totalCount: 0 }
        if (data.items) {
          setAccommodations(data.items);
          setTotalCount(data.totalCount); // 전체 결과 수 저장
          setTotalPages(Math.ceil(data.totalCount / itemsPerPage));
        } else {
          // Fallback for old structure (array)
          setAccommodations(data);
          setTotalPages(1);
        }

      } catch (error) {
        console.error("Failed to fetch tours:", error);
      } finally {
        setLoading(false);
      }
    };

    // 가격 필터 디바운스 적용
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, selectedRegion, selectedType, priceRange]);

  // Fetch prices asynchronously after accommodations load
  // Fetch prices asynchronously after accommodations load
  useEffect(() => {
    const fetchPrices = async () => {
      if (accommodations.length === 0) return;

      // 이미 가격 정보가 있는 항목(minPrice 존재)은 제외
      const itemsToFetch = accommodations.filter(acc => prices[acc.contentid] === undefined && acc.minPrice === undefined);
      if (itemsToFetch.length === 0) return;

      const newPriceUpdates = {};

      // 병렬로 API 호출하여 속도 향상 (minPrice가 없는 경우에만)
      await Promise.all(itemsToFetch.map(async (acc) => {
        try {
          const response = await fetch(`/api/tours/${acc.contentid}/price`);
          if (response.ok) {
            const data = await response.json();
            newPriceUpdates[acc.contentid] = data.hasPrice ? data.minPrice : null;
          } else {
            newPriceUpdates[acc.contentid] = null;
          }
        } catch (error) {
          console.error(`Failed to fetch price for ${acc.contentid}:`, error);
          newPriceUpdates[acc.contentid] = null;
        }
      }));

      // 상태 한 번에 업데이트 (렌더링 횟수 최소화)
      setPrices(prev => ({ ...prev, ...newPriceUpdates }));
    };

    fetchPrices();
  }, [accommodations]);



  // 카카오맵 초기화 및 마커 표시
  useEffect(() => {
    if (!showMap || accommodations.length === 0) return;

    const initMap = () => {
      const container = document.getElementById('list-map');
      if (!container) return;

      // 첫 번째 숙소 좌표를 중심으로 설정하거나, 서울 시청 등을 기본값으로
      const firstAcc = accommodations.find(acc => acc.mapy && acc.mapx);
      const center = firstAcc
        ? new window.kakao.maps.LatLng(firstAcc.mapy, firstAcc.mapx)
        : new window.kakao.maps.LatLng(37.566826, 126.9786567);

      const options = {
        center: center,
        level: 7
      };
      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      // 마커 생성
      accommodations.forEach(acc => {
        if (acc.mapy && acc.mapx) {
          const position = new window.kakao.maps.LatLng(acc.mapy, acc.mapx);
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
            title: acc.title
          });

          // 마커 클릭 이벤트 (인포윈도우 또는 커스텀 오버레이)
          const content = `
      <div style="padding:10px;background:white;border-radius:8px;border:1px solid #ccc;font-size:12px;width:150px;">
        <div style="font-weight:bold;margin-bottom:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${acc.title}</div>
        <div style="color:#888;">${getCategoryName(acc.cat3)}</div>
      </div>
      `;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: content
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });

          window.kakao.maps.event.addListener(marker, 'click', function () {
            navigate(`/detail/${acc.contentid}`);
          });
        }
      });
    };


    // SDK 로드 체크
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        initMap();
      });
    } else {
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          window.kakao.maps.load(() => {
            initMap();
          });
        }
      }, 100);
    }

  }, [showMap, accommodations]);

  const handleSearch = () => {
    setSearchParams({
      keyword: searchTerm,
      date: searchDate,
      personnel: searchPersonnel,
    });
    scrollToList();
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
    // 페이지 1로 리셋 필요할 수 있음
    setSearchParams(prev => {
      prev.set('page', '1');
      return prev;
    });
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
    // 페이지 1로 리셋
    setSearchParams(prev => {
      prev.set('page', '1');
      return prev;
    });
    scrollToList();
  };

  const paginate = (pageNumber) => {
    setSearchParams(prev => {
      prev.set('page', pageNumber);
      return prev;
    });
    window.scrollTo(0, 0);
  };

  // Pagination Window Logic
  const pageGroupSize = 10;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const getCategoryName = (cat3) => {
    if (!cat3) return '숙박';
    // 호텔 (B02010100)
    if (cat3 === 'B02010100') return '호텔';
    // 콘도미니엄 (B02010200)
    if (cat3 === 'B02010200') return '콘도미니엄';
    // 유스호스텔 (B02010300)
    if (cat3 === 'B02010300') return '유스호스텔';
    // 펜션 (B02010400)
    if (cat3 === 'B02010400') return '펜션';
    // 모텔 (B02010500)
    if (cat3 === 'B02010500') return '모텔';
    // 민박 (B02010600)
    if (cat3 === 'B02010600') return '민박';
    // 게스트하우스 (B02010700)
    if (cat3 === 'B02010700') return '게스트하우스';
    // 홈스테이 (B02010800)
    if (cat3 === 'B02010800') return '홈스테이';
    // 서비스드레지던스 (B02010900)
    if (cat3 === 'B02010900') return '서비스드레지던스';
    // 한옥 (B02011000)
    if (cat3 === 'B02011000') return '한옥';
    // 캠핑장 (B02011100)
    if (cat3 === 'B02011100') return '캠핑장';
    // 글램핑 (B02011200)
    if (cat3 === 'B02011200') return '글램핑';
    // 카라반 (B02011300)
    if (cat3 === 'B02011300') return '카라반';
    // 기타 숙박 (B02011600)
    if (cat3 === 'B02011600') return '기타';
    // 야영장/오토캠핑장 (A03020200 - 레포츠 카테고리)
    if (cat3 === 'A03020200') return '야영장';
    // 기타 숙박 (알 수 없는 코드)
    return '숙박';
  };

  return (
    <div className="min-h-[2930px] bg-gray-50 flex flex-col">
      <style>{`
        .heart-icon-btn { color: #FFB6C1 !important; }
        .heart-icon-btn:hover { color: #ef4444 !important; }
      `}</style>
      {/* Header */}
      <Header />

      {/* Search Form */}
      <div className="w-full flex justify-center mt-8 mb-16">
        <div className="w-[70%]">
          <SearchForm /> <br />
        </div>
      </div>

      {/* Main Content Area (Sidebar + List) */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">

          {/* Left Sidebar - Filters */}
          <aside className="hidden lg:block w-[250px] flex-shrink-0">
            {/* Map Button */}
            <div
              className="rounded-lg overflow-hidden h-32 relative border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity mb-12"
              onClick={() => setShowMap(!showMap)}
            >
              <img src="/images/city.png" alt="Map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-blue-600 transition-colors">
                  {showMap ? '리스트 보기' : '지도 보기'}
                </button>
              </div>
            </div><br />

            {/* Filter: Sold Out */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">필터</h3><br />
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors -ml-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 rounded border-gray-300 accent-[var(--brand_color)] focus:ring-[var(--brand_color)]" onChange={handleFilterClick} />
                <span className="text-gray-700">매진 숙소 제외</span>
              </label>
            </div><br />

            {/* Filter: Region */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">지  역</h3><br />
              <Stack direction="column" gap={3}>
                <Checkbox.Root
                  checked={selectedRegion.length === 0}
                  onCheckedChange={(e) => handleRegionChange('전체', !!e.checked)}
                  colorPalette="orange"
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded -ml-1 transition-colors"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-5 h-5 rounded border flex items-center justify-center transition-colors">
                    <Checkbox.Indicator className="text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
                    </Checkbox.Indicator>
                  </Checkbox.Control>
                  <Checkbox.Label className="text-gray-700">전체</Checkbox.Label>
                </Checkbox.Root>
                {['서울', '경기', '인천', '강원', '제주', '부산', '경상', '전라', '충청'].map((region) => (
                  <Checkbox.Root
                    key={region}
                    checked={selectedRegion.includes(region)}
                    onCheckedChange={(e) => handleRegionChange(region, !!e.checked)}
                    colorPalette="orange"
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded -ml-1 transition-colors"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-5 h-5 rounded border flex items-center justify-center transition-colors">
                      <Checkbox.Indicator className="text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
                      </Checkbox.Indicator>
                    </Checkbox.Control>
                    <Checkbox.Label className="text-gray-700">{region}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
            </div><br />

            {/* Filter: Check Box Type */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">숙소 유형</h3><br />
              <Stack direction="column" gap={3}>
                <Checkbox.Root
                  checked={selectedType.length === 0}
                  onCheckedChange={(e) => handleTypeChange('전체', !!e.checked)}
                  colorPalette="orange"
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded -ml-1 transition-colors"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-5 h-5 rounded border flex items-center justify-center transition-colors">
                    <Checkbox.Indicator className="text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
                    </Checkbox.Indicator>
                  </Checkbox.Control>
                  <Checkbox.Label className="text-gray-700">전체</Checkbox.Label>
                </Checkbox.Root>
                {['호텔', '콘도미니엄', '펜션', '모텔', '게스트하우스', '한옥', '캠핑장', '글램핑', '야영장 및 기타'].map((type) => (
                  <Checkbox.Root
                    key={type}
                    checked={selectedType.includes(type)}
                    onCheckedChange={(e) => handleTypeChange(type, !!e.checked)}
                    colorPalette="orange"
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded -ml-1 transition-colors"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control className="border-gray-300 data-[checked]:bg-[var(--brand_color)] data-[checked]:border-[var(--brand_color)] w-5 h-5 rounded border flex items-center justify-center transition-colors">
                      <Checkbox.Indicator className="text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>
                      </Checkbox.Indicator>
                    </Checkbox.Control>
                    <Checkbox.Label className="text-gray-700">{type}</Checkbox.Label>
                  </Checkbox.Root>
                ))}
              </Stack>
            </div><br />

            {/* Filter: Price */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">가격 <span className="text-sm font-normal text-gray-500 ml-1">&nbsp;1박 기준</span></h3>
              <div className="px-2 py-2">
                <input
                  type="range"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand_color)]"
                  min={0}
                  max={500000}
                  step={10000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-4 font-medium">
                <span>0원</span>
                <span>{priceRange[1] === 500000 ? '50만원 이상' : `${priceRange[1].toLocaleString()}원`}</span>
              </div>
            </div><br />

            {/* Filter: #Preference */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">#취향</h3><br />
              <div className="flex flex-wrap gap-2 mb-2">
                {['#숙박페스타', '#가족여행숙소', '#스파', '#파티룸', '#OTT', '#연인추천', '#감성숙소', '#뷰맛집', '#연박특가'].map((tag, idx) => (
                  <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                    <Tag.Label>{tag}</Tag.Label>
                  </Tag.Root>
                ))}
              </div><br />
              <Accordion.Root collapsible>
                <Accordion.Item value="more-pref" border="none">
                  <Accordion.ItemContent p={0}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['#애견동반', '#조식포함', '#오션뷰', '#마운틴뷰', '#시티뷰'].map((tag, idx) => (
                        <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                          <Tag.Label>{tag}</Tag.Label>
                        </Tag.Root>
                      ))}
                    </div>
                  </Accordion.ItemContent>
                  <Accordion.ItemTrigger className="text-sm text-blue-500 font-medium mt-3 p-0 hover:no-underline hover:text-blue-600 justify-start transition-colors flex items-center">
                    더보기 <span className="ml-1 text-xs">v</span>
                  </Accordion.ItemTrigger>
                </Accordion.Item>
              </Accordion.Root>
            </div><br />

            {/* Filter: Discount Benefits */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">할인혜택</h3><br />
              <div className="flex flex-wrap gap-2">
                {['쿠폰할인', '무한대실', '할인특가'].map((benefit, idx) => (
                  <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                    <Tag.Label>{benefit}</Tag.Label>
                  </Tag.Root>
                ))}
              </div><br />
            </div>

            {/* Filter: Reservation Type */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">예약유형</h3><br />
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors -ml-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-red-500 rounded border-gray-300 focus:ring-red-500 accent-[var(--brand_color)]" onChange={handleFilterClick} />
                <span className="text-gray-700">내실예약</span>
              </label><br />
            </div>

            {/* Filter: Grade */}
            <div className="border-b border-solid border-gray-300 py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">등급</h3><br />
              <div className="flex flex-wrap gap-2">
                {['5성급', '4성급', '블랙', '풀빌라'].map((grade, idx) => (
                  <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                    <Tag.Label>{grade}</Tag.Label>
                  </Tag.Root>
                ))}
              </div><br />
            </div>

            {/* Filter: Facilities */}
            <div className="py-8">
              <h3 className="font-bold text-gray-900 mb-5 text-lg">시설</h3><br />

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 mb-3">공용시설</h4><br />
                <div className="flex flex-wrap gap-2">
                  {['사우나', '수영장', '바베큐', '레스토랑', '피트니스', '물놀이시설'].map((fac, idx) => (
                    <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                      <Tag.Label>{fac}</Tag.Label>
                    </Tag.Root>
                  ))}
                </div>
              </div><br />

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 mb-3">객실 내 시설</h4><br />
                <div className="flex flex-wrap gap-2">
                  {['스파/월풀', '객실스파', '미니바', '무선인터넷', '에어컨', '욕실용품'].map((fac, idx) => (
                    <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                      <Tag.Label>{fac}</Tag.Label>
                    </Tag.Root>
                  ))}
                </div>
              </div><br />

              <div>
                <h4 className="text-sm font-bold text-gray-500 mb-3">기타시설</h4><br />
                <div className="flex flex-wrap gap-2">
                  {['조식제공', '무료주차', '반려견동반'].map((fac, idx) => (
                    <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                      <Tag.Label>{fac}</Tag.Label>
                    </Tag.Root>
                  ))}
                </div>
                <Accordion.Root collapsible>
                  <Accordion.Item value="more-fac" border="none">
                    <Accordion.ItemContent p={0}>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['수화물보관', '노래방', '편의점', '카페', '비즈니스센터'].map((fac, idx) => (
                          <Tag.Root key={idx} onClick={handleFilterClick} cursor="pointer" variant="outline" size="lg" borderRadius="full" _hover={{ borderColor: "var(--brand_color)", color: "var(--brand_color)", bg: "orange.50" }} transition="all 0.2s">
                            <Tag.Label>{fac}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </div>
                    </Accordion.ItemContent>
                    <Accordion.ItemTrigger className="text-sm text-blue-500 font-medium mt-3 p-0 hover:no-underline hover:text-blue-600 justify-start transition-colors flex items-center">
                      더보기 <span className="ml-1 text-xs">v</span>
                    </Accordion.ItemTrigger>
                  </Accordion.Item>
                </Accordion.Root>
              </div><br />
            </div>
          </aside>

          {/* Right Content - List */}
          <section className="flex-1" ref={listRef}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">검색 결과 {totalCount.toLocaleString()}개</h2><br />
              <div className="relative">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium">
                  <span>추천순</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Text>Loading...</Text>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {accommodations.map((acc, index) => (
                  <React.Fragment key={acc.contentid}>
                    <div
                      className="group bg-white overflow-hidden cursor-pointer flex flex-col sm:flex-row gap-12 h-auto sm:h-[240px] py-6 px-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-md border-b border-gray-100 last:border-0"
                      onClick={() => navigate(`/detail/${acc.contentid}`)}
                    >
                      {/* Image */}
                      <div className="w-full sm:w-[320px] h-48 sm:h-full relative flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={acc.firstimage || getFallbackImage(acc.cat3)}
                          alt={acc.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(acc.cat3); }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow justify-between py-2 w-full">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-xs text-gray-500 mb-1 font-medium transition-colors">{getCategoryName(acc.cat3)}</div>
                              <h3 className="font-bold text-gray-900 mb-2 transition-colors leading-tight text-title-lg text-2xl">{acc.title}</h3>
                            </div>
                            {/* Heart Icon Moved Here */}
                            <button className="transition-colors heart-icon-btn">
                              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </button>
                          </div>

                          <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-yellow-400 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                              9.0
                            </span>
                            <span className="text-yellow-500 text-sm font-bold transition-colors">추천해요</span>
                            <span className="text-sm text-gray-400 transition-colors">(100개 리뷰)</span>
                          </div>
                          <div className="text-sm text-gray-500 mb-1 transition-colors flex items-center">
                            {acc.addr1}
                          </div>
                        </div>

                        <div className="flex flex-col items-end mt-4 sm:mt-0">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs text-gray-500 transition-colors">{getCategoryName(acc.cat3)}</span>
                            <span className="text-xs bg-gray-200 text-gray-600 px-1 rounded transition-colors">쿠폰적용가</span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900 transition-colors">
                            {(acc.minPrice || (prices[acc.contentid] !== undefined && prices[acc.contentid] !== null)) ? (
                              `${(acc.minPrice || prices[acc.contentid]).toLocaleString()}원~`
                            ) : (
                              prices[acc.contentid] === null ? (
                                '가격 문의'
                              ) : (
                                <span className="text-gray-400">가격 조회중...</span>
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Map View Area */}
            {showMap && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-10">
                <div className="bg-white rounded-xl w-full h-full max-w-6xl max-h-[80vh] flex flex-col overflow-hidden relative">
                  <button
                    onClick={() => setShowMap(false)}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div id="list-map" className="w-full h-full"></div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <HStack mt={16} spacing={2} justify="center">
                {/* 맨 앞으로 버튼 */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => paginate(1)}
                  isDisabled={currentPage === 1}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  &lt;&lt;
                </Button>

                {/* 이전 버튼 */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  isDisabled={currentPage === 1}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  &lt;
                </Button>

                {/* 번호 버튼들 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => {
                  const isActive = page === currentPage;
                  return (
                    <Button
                      key={page}
                      size="sm"
                      borderRadius="full"
                      variant={isActive ? "solid" : "outline"}
                      bg={isActive ? "var(--brand_color)" : "transparent"}
                      color={isActive ? "white" : "gray.700"}
                      borderColor={isActive ? "var(--brand_color)" : "gray.300"}
                      _hover={{
                        bg: isActive ? "var(--brand_color)" : "gray.100",
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
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  isDisabled={currentPage === totalPages}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  &gt;
                </Button>

                {/* 맨 뒤로 버튼 */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => paginate(totalPages)}
                  isDisabled={currentPage === totalPages}
                  borderRadius="full"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                >
                  &gt;&gt;
                </Button>
              </HStack>
            )}
          </section>
        </div>
      </div><br />

      {/* Banner Section */}
      <section className="w-full py-16 flex justify-center">
        <div className="w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
          <EventForm data={EventList} />
        </div>
      </section>

      {/* Footer */}
      < Footer />
    </div >
  );
};

export default ListPage;
