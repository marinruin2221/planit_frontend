export const accommodations = Array.from({ length: 100 }, (_, index) => {
  const types = ['호텔', '모텔', '펜션', '리조트', '캠핑', '게하·한옥'];
  const locations = ['서울', '부산', '제주', '강원 강릉', '인천', '강원 속초', '전라 여수', '경상 경주'];
  const images = ['/images/jeju.png', '/images/city.png', '/images/beach.png', '/images/mountain.png'];

  const type = types[Math.floor(Math.random() * types.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const image = images[Math.floor(Math.random() * images.length)];

  return {
    id: index + 1,
    type: type,
    name: `${location} ${type} ${index + 1}호점`,
    location: `${location} 중심가`,
    rating: (Math.random() * (5 - 3) + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 1000) + 10,
    price: `${(Math.floor(Math.random() * 30) + 5) * 10000}원`,
    originalPrice: `${(Math.floor(Math.random() * 40) + 6) * 10000}원`,
    image: image,
    badges: Math.random() > 0.5 ? ['특가', '조식포함'] : [],
    description: `편안한 휴식을 위한 최고의 선택, ${location} ${type} ${index + 1}호점입니다.`,
    details: '최신 시설과 친절한 서비스로 모십니다.',
    rooms: [
      { id: 101, name: '스탠다드', image: image, dayUse: { time: '4시간', close: '22:00', price: '30,000원', original: '40,000원' }, stay: { checkIn: '15:00', checkOut: '11:00', price: '80,000원', original: '100,000원' } },
      { id: 102, name: '디럭스', image: image, dayUse: null, stay: { checkIn: '15:00', checkOut: '11:00', price: '120,000원', original: '150,000원' } }
    ],
    reviews: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      user: {
        name: `User${i + 1}`,
        level: ['VIP', 'Elite', 'Member'][Math.floor(Math.random() * 3)],
        stats: `리뷰 ${Math.floor(Math.random() * 50) + 1}`
      },
      rating: (Math.random() * (5 - 3) + 3).toFixed(1),
      date: `${Math.floor(Math.random() * 30) + 1}일 전`,
      roomType: ['스탠다드', '디럭스', '스위트'][Math.floor(Math.random() * 3)],
      images: Math.random() > 0.5 ? [image] : [],
      content: [
        '정말 좋았습니다. 다음에 또 오고 싶어요.',
        '시설이 깨끗하고 친절해서 만족스러웠습니다.',
        '위치가 좋아서 이동하기 편리했습니다.',
        '가성비 최고의 숙소입니다. 강력 추천합니다!',
        '조식이 맛있고 침구가 편안했어요.'
      ][Math.floor(Math.random() * 5)]
    }))
  };
});

export const AreaList = [
  {
    id: 1,
    subject: "서울",
    content: "도심 속 럭셔리 호텔 & 문화의 중심",
    image: "https://picsum.photos/seed/seoul/600/800",
  }, {
    id: 2,
    subject: "부산",
    content: "낮에는 바다, 밤에는 야경",
    image: "https://picsum.photos/seed/busan/600/800",
  }, {
    id: 3,
    subject: "대구",
    content: "미식과 쇼핑이 살아있는 도시",
    image: "https://picsum.photos/seed/daegu/600/800",
  }, {
    id: 4,
    subject: "인천",
    content: "바다와 도심이 만나는 관문 도시",
    image: "https://picsum.photos/seed/incheon/600/800",
  }, {
    id: 5,
    subject: "광주",
    content: "예술과 맛의 도시",
    image: "https://picsum.photos/seed/gwangju/600/800",
  }, {
    id: 6,
    subject: "대전",
    content: "과학과 자연이 어우러진 도시",
    image: "https://picsum.photos/seed/daejeon/600/800",
  }, {
    id: 7,
    subject: "울산",
    content: "산과 바다를 품은 산업 도시",
    image: "https://picsum.photos/seed/ulsan/600/800",
  }, {
    id: 8,
    subject: "세종",
    content: "여유로운 휴식의 행정 도시",
    image: "https://picsum.photos/seed/sejong/600/800",
  }, {
    id: 9,
    subject: "경기",
    content: "도심 가까운 힐링 여행지",
    image: "https://picsum.photos/seed/gyeonggi/600/800",
  }, {
    id: 10,
    subject: "강원",
    content: "산과 바다, 사계절 자연 여행",
    image: "https://picsum.photos/seed/gangwon/600/800",
  }, {
    id: 11,
    subject: "충북",
    content: "조용한 자연 속 힐링 여행",
    image: "https://picsum.photos/seed/chungbuk/600/800",
  }, {
    id: 12,
    subject: "충남",
    content: "서해 바다와 온천의 여유",
    image: "https://picsum.photos/seed/chungnam/600/800",
  }, {
    id: 13,
    subject: "전북",
    content: "한옥과 미식의 매력",
    image: "https://picsum.photos/seed/jeonbuk/600/800",
  }, {
    id: 14,
    subject: "전남",
    content: "자연과 바다가 살아있는 여행지",
    image: "https://picsum.photos/seed/jeonnam/600/800",
  }, {
    id: 15,
    subject: "경북",
    content: "역사와 전통을 품은 지역",
    image: "https://picsum.photos/seed/gyeongbuk/600/800",
  }, {
    id: 16,
    subject: "경남",
    content: "바다와 도시가 어우러진 여행",
    image: "https://picsum.photos/seed/gyeongnam/600/800",
  }, {
    id: 17,
    subject: "제주",
    content: "자연이 선물한 최고의 휴양지",
    image: "https://picsum.photos/seed/jeju/600/800",
  }
];

export const StayList = [
  {
    id: 1,
    type: "펜션",
    name: "제주 펜션 1호점",
    image: "https://image.withstatic.com/295/32/102/6f52bd9340b54ae8bc413e18ec7259e0.png",
    rating: 4.5,
    review: 1280,
    basePrice: 100000,
    salePrice: 50000,
  }, {
    id: 2,
    type: "호텔",
    name: "서울 시티 호텔",
    image: "https://image.withstatic.com/143/54/40/86119cc7323b4afb89df198f85746276.jpg",
    rating: 4.7,
    review: 980,
    basePrice: 180000,
    salePrice: 129000,
  }
];

export const EventList = [
  {
    id: 1,
    image: "https://image6.yanolja.com/cx-ydm/kzYJoRc7Eo9itmL8",
  }, {
    id: 2,
    image: "https://image6.yanolja.com/cx-ydm/qQ2a8GlG3dDs2sv0",
  }, {
    id: 3,
    image: "https://image6.yanolja.com/cx-ydm/gfgPQFZbAVMKIUQD",
  }, {
    id: 4,
    image: "https://image6.yanolja.com/cx-ydm/Tv7mRL1cDUvQlWxD",
  }
];
