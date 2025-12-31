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
  const [reviewSortOption, setReviewSortOption] = useState('date'); // date, recommend, score

  // 평점 및 리뷰 상태 (DB 연동)
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

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

  // 평점 및 리뷰 API 호출
  useEffect(() => {
    if (!id) return;

    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/ratings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRating(data);
        }
      } catch (error) {
        console.error("Failed to fetch rating:", error);
      }
    };

    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const response = await fetch(`/api/reviews/${id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchRating();
    fetchReviews();
  }, [id]);

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
  const generateDummyReviews = (contentid, reviewCount, overallScore = 8.0) => {
    const reviewerNames = [
      '여행러버', '힐링여행', '가족여행자', '커플여행', '솔로여행러',
      '맛집탐험가', '휴식추구', '액티비티러버', '뷰맛집탐방', '청결중시',
      '서비스중시', '위치중시', '가성비왕', '럭셔리러버', '조용한휴식'
    ];

    const reviewsByRating = {
      high: [ // 4-5점
        '정말 좋았습니다! 다음에 또 방문하고 싶어요.',
        '깨끗하고 위치도 좋았습니다. 추천합니다.',
        '직원분들이 친절하셔서 기분 좋게 묵었습니다.',
        '전망이 정말 좋았어요! 사진보다 실제가 더 좋았습니다.',
        '조식도 맛있고, 전체적으로 만족스러웠어요.',
        '침구가 깨끗하고 푹신해서 잘 잤습니다.',
        '가족 여행으로 방문했는데 아이들도 좋아했어요.',
        '커플 여행으로 왔는데 분위기가 좋았습니다.'
      ],
      mid: [ // 3점
        '가격 대비 무난했습니다.',
        '위치는 좋았지만 시설이 조금 노후되었어요.',
        '나쁘지 않았지만 기대만큼은 아니었어요.',
        '잠만 자기에는 괜찮은 숙소입니다.',
        '주차 공간이 조금 협소해서 아쉬웠어요.',
        '방음이 조금 아쉬웠지만 전반적으로는 괜찮았습니다.'
      ],
      low: [ // 1-2점
        '청소 상태가 조금 아쉬웠습니다.',
        '직원 응대가 조금 불친절했어요.',
        '사진과 방이 많이 달라서 실망했습니다.',
        '소음 때문에 잠을 설쳤어요.',
        '가격 대비 시설이 별로였습니다.'
      ]
    };

    // contentid 기반 시드 생성
    let seed = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed = seed & seed;
    }

    const reviews = [];
    const targetStar = overallScore / 2; // 10점 만점을 5점 만점으로 변환

    for (let i = 0; i < reviewCount; i++) {
      const reviewSeed = Math.abs((seed * (i + 1)) & 0xFFFFFFFF);

      // 리뷰어 정보
      const nameIdx = reviewSeed % reviewerNames.length;
      const level = (reviewSeed % 10) + 1;
      const userReviewCount = ((reviewSeed >> 4) % 50) + 1;

      // 별점 생성 로직 (전체 평점에 기반)
      // 랜덤 값을 0~1 사이로 정규화
      const randVal = (reviewSeed % 100) / 100;
      let starCount;

      if (targetStar >= 4.5) {
        // 고평점 숙소: 5점(60%), 4점(30%), 3점(10%)
        if (randVal < 0.6) starCount = 5;
        else if (randVal < 0.9) starCount = 4;
        else starCount = 3;
      } else if (targetStar >= 4.0) {
        // 우수 숙소: 5점(40%), 4점(40%), 3점(15%), 2점(5%)
        if (randVal < 0.4) starCount = 5;
        else if (randVal < 0.8) starCount = 4;
        else if (randVal < 0.95) starCount = 3;
        else starCount = 2;
      } else if (targetStar >= 3.0) {
        // 보통 숙소: 4점(20%), 3점(50%), 2점(20%), 1점(10%)
        if (randVal < 0.2) starCount = 4;
        else if (randVal < 0.7) starCount = 3;
        else if (randVal < 0.9) starCount = 2;
        else starCount = 1;
      } else {
        // 저평점 숙소
        if (randVal < 0.1) starCount = 4;
        else if (randVal < 0.3) starCount = 3;
        else if (randVal < 0.7) starCount = 2;
        else starCount = 1;
      }

      // 별점에 따른 리뷰 내용 선택
      let contentPool;
      if (starCount >= 4) contentPool = reviewsByRating.high;
      else if (starCount === 3) contentPool = reviewsByRating.mid;
      else contentPool = reviewsByRating.low;

      const contentIdx = (reviewSeed >> 8) % contentPool.length;

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
        content: contentPool[contentIdx]
      });
    }

    // 날짜 최신순 정렬
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

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

  // 숙소 유형 매핑 함수
  const getCategoryName = (cat3) => {
    if (!cat3) return '숙박';
    if (cat3 === 'B02010100') return '호텔';
    if (cat3 === 'B02010200') return '콘도미니엄';
    if (cat3 === 'B02010300') return '유스호스텔';
    if (cat3 === 'B02010400') return '펜션';
    if (cat3 === 'B02010500') return '모텔';
    if (cat3 === 'B02010600') return '민박';
    if (cat3 === 'B02010700') return '게스트하우스';
    if (cat3 === 'B02010800') return '홈스테이';
    if (cat3 === 'B02010900') return '서비스드레지던스';
    if (cat3 === 'B02011000') return '한옥';
    if (cat3 === 'B02011100') return '캠핑장';
    if (cat3 === 'B02011200') return '글램핑';
    if (cat3 === 'B02011300') return '카라반';
    if (cat3 === 'B02011600') return '기타';
    if (cat3 === 'A03020200') return '야영장';
    return '숙박';
  };

  // 더미 소개글 생성 함수 (다양성 강화)
  const generateDummyOverview = (contentid, title, cat3, addr1) => {
    if (!contentid) return "편안한 휴식을 위한 최고의 선택입니다.";

    const categoryName = getCategoryName(cat3);
    const location = addr1 ? addr1.split(' ')[0] : '이곳';

    // 시드 생성
    let seed = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed = seed & seed;
    }
    const rand = (max) => {
      seed = (seed * 9301 + 49297) % 233280;
      if (seed < 0) seed += 233280;
      return Math.floor((seed / 233280) * max);
    };

    // 카테고리별 키워드 설정
    let typeAdjectives = ['편안한', '아늑한', '깔끔한'];
    let typeFeatures = ['친절한 서비스', '깨끗한 객실', '편리한 위치'];

    if (categoryName === '호텔') {
      typeAdjectives = ['럭셔리한', '품격 있는', '세련된', '모던한', '최고급', '우아한'];
      typeFeatures = ['최상의 컨시어지 서비스', '고급스러운 인테리어', '탁 트인 시티뷰', '프리미엄 어메니티', '다이닝 레스토랑'];
    } else if (categoryName === '펜션' || categoryName === '민박') {
      typeAdjectives = ['감성적인', '낭만적인', '조용한', '프라이빗한', '자연 친화적인', '따뜻한'];
      typeFeatures = ['개별 바비큐장', '아름다운 정원', '감성 가득한 인테리어', '편안한 휴식 공간', '숲속의 힐링'];
    } else if (categoryName === '캠핑장' || categoryName === '글램핑' || categoryName === '카라반' || categoryName === '야영장') {
      typeAdjectives = ['자연과 함께하는', '활기찬', '이색적인', '낭만 가득한', '별이 쏟아지는', '상쾌한'];
      typeFeatures = ['불멍을 즐길 수 있는 공간', '청정 자연 환경', '특별한 아웃도어 경험', '가족과 함께하기 좋은 시설', '밤하늘의 별'];
    } else if (categoryName === '한옥') {
      typeAdjectives = ['고즈넉한', '전통적인', '멋스러운', '정겨운', '한국적인', '차분한'];
      typeFeatures = ['아름다운 기와 지붕', '넓은 대청마루', '따뜻한 온돌방', '전통 차 체험', '고풍스러운 마당'];
    }

    // 공통 수식어 및 서술어 확장
    const commonAdjectives = ['잊지 못할', '특별한', '소중한', '완벽한', '기분 좋은', '행복한'];
    const endings = [
      '제공합니다.', '자랑합니다.', '약속드립니다.', '경험해보세요.', '초대합니다.',
      '선사합니다.', '만끽해보세요.', '기다리고 있습니다.'
    ];

    // 템플릿 다양화
    const templates = [
      // 템플릿 1: 위치 강조형
      () => `${location}의 중심에 위치한 ${title}은(는) ${typeAdjectives[rand(typeAdjectives.length)]} 분위기와 ${typeFeatures[rand(typeFeatures.length)]}를 ${endings[rand(endings.length)]}`,

      // 템플릿 2: 경험 강조형
      () => `${title}에서 ${typeAdjectives[rand(typeAdjectives.length)]} 휴식과 함께 ${commonAdjectives[rand(commonAdjectives.length)]} 추억을 만들어보세요. ${typeFeatures[rand(typeFeatures.length)]}이(가) 여러분을 ${endings[rand(endings.length)]}`,

      // 템플릿 3: 시설 강조형
      () => `${typeFeatures[rand(typeFeatures.length)]}와(과) ${typeAdjectives[rand(typeAdjectives.length)]} 공간을 갖춘 ${title}입니다. ${location} 여행의 즐거움을 더해드립니다.`,

      // 템플릿 4: 감성형
      () => `일상에서 벗어나 ${typeAdjectives[rand(typeAdjectives.length)]} 하루를 보내고 싶다면 ${title}을(를) 추천합니다. ${typeFeatures[rand(typeFeatures.length)]}를 통해 진정한 힐링을 ${endings[rand(endings.length)]}`,

      // 템플릿 5: 복합형
      () => `${location}의 아름다움과 어우러진 ${title}. ${typeAdjectives[rand(typeAdjectives.length)]} 시설과 ${typeFeatures[rand(typeFeatures.length)]}로 방문하시는 모든 분들께 ${commonAdjectives[rand(commonAdjectives.length)]} 시간을 ${endings[rand(endings.length)]}`
    ];

    const selectedTemplate = templates[rand(templates.length)];
    return selectedTemplate();
  };

  // 더미 시설 정보 생성 함수
  const generateDummyFacilities = (contentid, cat3) => {
    if (!contentid) return ['#무선인터넷', '#무료주차'];

    const categoryName = getCategoryName(cat3);

    // 공통 태그
    const commonTags = ['#무선인터넷', '#에어컨', '#욕실용품', '#무료주차', '#수화물보관', '#편의점'];

    // 카테고리별 태그 풀
    let typeTags = [];
    if (categoryName === '호텔' || categoryName === '콘도미니엄' || categoryName === '서비스드레지던스') {
      typeTags = ['#5성급', '#4성급', '#블랙', '#수영장', '#레스토랑', '#피트니스', '#사우나', '#비즈니스센터', '#조식제공', '#조식포함', '#시티뷰', '#오션뷰', '#카페', '#미니바'];
    } else if (categoryName === '펜션' || categoryName === '풀빌라' || categoryName === '민박') {
      typeTags = ['#풀빌라', '#바베큐', '#객실스파', '#스파/월풀', '#마운틴뷰', '#오션뷰', '#노래방', '#애견동반', '#반려견동반'];
    } else if (categoryName === '캠핑장' || categoryName === '글램핑' || categoryName === '카라반' || categoryName === '야영장') {
      typeTags = ['#바베큐', '#물놀이시설', '#마운틴뷰', '#애견동반', '#반려견동반', '#불멍'];
    } else {
      typeTags = ['#조식제공', '#카페', '#세탁시설'];
    }

    // 시드 생성
    let seed = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed = seed & seed;
    }
    const rand = (max) => {
      seed = (seed * 9301 + 49297) % 233280;
      if (seed < 0) seed += 233280;
      return Math.floor((seed / 233280) * max);
    };

    const selectedTags = new Set();

    // 공통 태그에서 2~3개 선택
    const commonCount = 2 + rand(2);
    for (let i = 0; i < commonCount; i++) {
      selectedTags.add(commonTags[rand(commonTags.length)]);
    }

    // 타입별 태그에서 3~5개 선택
    const typeCount = 3 + rand(3);
    for (let i = 0; i < typeCount; i++) {
      selectedTags.add(typeTags[rand(typeTags.length)]);
    }

    return Array.from(selectedTags);
  };

  // 주소 복사 핸들러
  const handleCopyAddress = () => {
    if (!destination) return;
    const fullAddress = `${destination.addr1} ${destination.addr2 || ''}`.trim();

    // 1. 최신 방식 (navigator.clipboard)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullAddress).then(() => {
        alert('주소가 복사되었습니다.');
      }).catch(() => {
        fallbackCopyTextToClipboard(fullAddress);
      });
    } else {
      // 2. 구형 방식 (fallback)
      fallbackCopyTextToClipboard(fullAddress);
    }
  };

  // 폴백 복사 함수
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // 화면 밖으로 숨김
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('주소가 복사되었습니다.');
      } else {
        alert('주소 복사에 실패했습니다. (Browser blocked)');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('주소 복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
  };

  // 더미 객실 정보 생성 함수
  const generateDummyRoomInfo = (contentid, cat3) => {
    const categoryName = getCategoryName(cat3);

    let roomNames = ['Standard Room'];
    let capacities = ['기준 2인 / 최대 2인'];
    let tags = ['더블 침대', '무료 와이파이'];

    if (categoryName === '호텔' || categoryName === '콘도미니엄' || categoryName === '서비스드레지던스') {
      roomNames = ['스탠다드 더블', '디럭스 트윈', '이그제큐티브 스위트', '패밀리 트윈'];
      capacities = ['기준 2인 / 최대 2인', '기준 2인 / 최대 3인', '기준 4인 / 최대 4인'];
      tags = ['시티뷰', '욕조', '어메니티', '킹사이즈 침대', '조식 포함', '금연 객실'];
    } else if (categoryName === '펜션' || categoryName === '풀빌라' || categoryName === '민박') {
      roomNames = ['오션뷰 커플룸', '가족형 독채', '복층형 스위트', '감성 테라스룸'];
      capacities = ['기준 2인 / 최대 4인', '기준 4인 / 최대 6인', '기준 6인 / 최대 8인'];
      tags = ['개별 바비큐', '테라스', '스파', '복층', '취사 가능', '넷플릭스'];
    } else if (categoryName === '캠핑장' || categoryName === '글램핑' || categoryName === '카라반' || categoryName === '야영장') {
      roomNames = ['럭셔리 글램핑 A', '오토캠핑 데크', '감성 카라반', '패밀리 텐트'];
      capacities = ['기준 2인 / 최대 4인', '기준 4인 / 최대 4인'];
      tags = ['불멍', '전기 사용', '개별 화장실', '해먹', '바베큐 세트', '온수 사용'];
    } else if (categoryName === '한옥') {
      roomNames = ['사랑채', '안채', '별채', '행랑채'];
      capacities = ['기준 2인 / 최대 3인', '기준 4인 / 최대 6인'];
      tags = ['온돌방', '대청마루', '다도 세트', '고택 체험', '마당 뷰'];
    }

    // 시드 생성
    let seed = 0;
    const str = String(contentid);
    for (let i = 0; i < str.length; i++) {
      seed = ((seed << 5) - seed) + str.charCodeAt(i);
      seed = seed & seed;
    }
    const rand = (max) => {
      seed = (seed * 9301 + 49297) % 233280;
      if (seed < 0) seed += 233280;
      return Math.floor((seed / 233280) * max);
    };

    const roomName = roomNames[rand(roomNames.length)];
    const capacity = capacities[rand(capacities.length)];

    const selectedTags = new Set();
    const tagCount = 2 + rand(2); // 2~3개 태그
    for (let i = 0; i < tagCount; i++) {
      selectedTags.add(tags[rand(tags.length)]);
    }

    return { roomName, capacity, tags: Array.from(selectedTags) };
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

            {/* Image Gallery - Grid Mosaic Layout */}
            <div className="grid grid-cols-4 grid-rows-2 h-[400px] mb-8 rounded-xl overflow-hidden gap-0 w-full">
              {/* Main Image (Left, spans 2x2) */}
              <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <SafeImage
                  src={displayImages[0]}
                  fallback={getFallbackImage(destination.cat3)}
                  alt="Main"
                  className="!w-full !h-full !object-cover block transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsGalleryOpen(true); }}
                  className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  사진 전체보기
                </button>
              </div>

              {/* Sub Images */}
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden" onClick={() => setIsGalleryOpen(true)}>
                  <SafeImage
                    src={displayImages[idx]}
                    fallback={getFallbackImage(destination.cat3)}
                    alt={`Sub ${idx}`}
                    className="!w-full !h-full !object-cover block transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Header Info */}
            <div className="mb-8 border-b border-gray-100 pb-8"><br />
              <div className="text-sm text-gray-500 mb-2">{getCategoryName(destination.cat3)}</div>
              <h1 className="font-bold text-gray-900 mb-3 leading-tight text-title-xl">{destination.title}</h1>
              {rating && (() => {
                const starRating = parseFloat(rating.averageScore) / 2;
                return (
                  <div className="flex items-center mb-4 gap-3">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (starRating >= star) return <FaStar key={star} className="text-yellow-400 text-sm" />;
                        if (starRating >= star - 0.5) return <FaStarHalfAlt key={star} className="text-yellow-400 text-sm" />;
                        return <FaRegStar key={star} className="text-gray-300 text-sm" />;
                      })}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{rating.averageScore}</span>
                    <span className={`text-sm font-medium ${rating.colorClass}`}>{rating.label}</span>
                    <span className="text-sm text-gray-500">· 이용자 리뷰 {rating.reviewCount}개</span>
                  </div>
                );
              })()}
              <div className="flex items-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="mr-2">{destination.addr1} {destination.addr2 || ''}</span>
                <button
                  type="button"
                  onClick={() => handleCopyAddress()}
                  style={{ backgroundColor: '#DD6B20', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginLeft: '8px' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C05621'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#DD6B20'}
                >
                  주소복사
                </button>
              </div><br />
            </div>

            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">숙소 소개</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {destination.overview || generateDummyOverview(id, destination.title, destination.cat3, destination.addr1)}
              </p><br />

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
                  generateDummyFacilities(id, destination.cat3).map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{tag}</span>
                  ))
                )}
              </div><br />
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
                  (() => {
                    const dummyRoom = generateDummyRoomInfo(id, destination.cat3);
                    return (
                      <div className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:border-gray-900 transition-colors">
                        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={destination.firstimage || getFallbackImage(destination.cat3)}
                            alt={dummyRoom.roomName}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = getFallbackImage(destination.cat3); }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{dummyRoom.roomName}</h3>
                            <p className="text-sm text-gray-500 mb-2">{dummyRoom.capacity}</p>
                            <div className="flex flex-wrap gap-2">
                              {dummyRoom.tags.map((tag, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">{tag}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end items-center mt-4 md:mt-0">
                            <div className="flex flex-col items-center gap-1">
                              <div className="text-lg font-bold text-gray-900">{estimatedPrice.toLocaleString()}원</div>
                              <div className="text-xs text-gray-400">1박, 세금 포함</div>
                              <button
                                onClick={() => handlePaymentClick(dummyRoom.roomName, estimatedPrice)}
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
                  })()
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">위치</h2><br />
              <KakaoMap x={destination.mapx} y={destination.mapy} className="rounded-xl overflow-hidden h-[300px] bg-gray-100 relative w-full">
                <div style={{ padding: '4px 8px', backgroundColor: '#DD6B20', borderRadius: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', fontSize: '12px', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', position: 'relative', zIndex: 10, fontFamily: 'SCoreDream, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                  {destination.title}
                </div>
              </KakaoMap><br />
              <div className="mt-4 text-gray-600 text-sm">
                {destination.addr1} {destination.addr2 || ''}
                <button
                  type="button"
                  onClick={() => handleCopyAddress()}
                  style={{ backgroundColor: '#DD6B20', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginLeft: '8px' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C05621'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#DD6B20'}
                >
                  주소복사
                </button>
              </div><br />
            </div>

            {/* Review Section */}
            <div className="mb-12">
              <div className="flex justify-between items-end !mb-12">
                {rating && (
                  <div className="flex items-center">
                    <span className="!text-yellow-400 !text-2xl !mr-3">★</span>
                    <h2 className="!text-xl !font-bold !text-gray-900">리얼 리뷰 <span className="!text-2xl !ml-2">{rating.averageScore}</span></h2><br />
                    <span className="!text-gray-400 !text-base !ml-6 !font-medium">{rating.reviewCount}명 평가 · {rating.reviewCount}개 리뷰</span>
                  </div>
                )}
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span
                    className={`cursor-pointer ${reviewSortOption === 'date' ? 'font-bold text-gray-900' : 'hover:text-gray-700'}`}
                    onClick={() => setReviewSortOption('date')}
                  >
                    날짜순
                  </span>
                  <span className="text-gray-300">|</span>
                  <span
                    className={`cursor-pointer ${reviewSortOption === 'recommend' ? 'font-bold text-gray-900' : 'hover:text-gray-700'}`}
                    onClick={() => setReviewSortOption('recommend')}
                  >
                    추천순
                  </span>
                  <span className="text-gray-300">|</span>
                  <span
                    className={`cursor-pointer ${reviewSortOption === 'score' ? 'font-bold text-gray-900' : 'hover:text-gray-700'}`}
                    onClick={() => setReviewSortOption('score')}
                  >
                    평점순
                  </span>
                </div>
              </div>

              <div className="!space-y-10">
                {reviewsLoading ? (
                  <div className="text-center text-gray-500">리뷰 로딩 중...</div>
                ) : (
                  (() => {
                    // 정렬 로직 적용
                    let sortedReviews = [...reviews];
                    if (reviewSortOption === 'date') {
                      sortedReviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
                    } else if (reviewSortOption === 'recommend' || reviewSortOption === 'score') {
                      sortedReviews.sort((a, b) => b.stars - a.stars);
                    }

                    return sortedReviews.map((review, index) => (
                      <div key={review.id} className="border-b border-gray-100 !pb-10 last:border-0">
                        <div className="flex items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 mr-3 flex items-center justify-center text-white font-bold text-sm">
                            {review.reviewerName?.charAt(0) || '★'}
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="font-bold text-gray-900 text-sm mr-2">Lv. {review.reviewerLevel}</span>
                              <span className="font-bold text-gray-900 text-sm">{review.reviewerName}</span>
                            </div>
                            <div className="text-xs text-gray-400">리뷰 {reviews.length - index}</div>
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 text-sm mr-2">{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
                          <span className="text-xs text-gray-400">{review.reviewDate}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{review.content}</p>
                      </div>
                    ));
                  })()
                )}
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
