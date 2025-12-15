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
    reviews: [
      {
        id: 1,
        user: { name: 'User1', level: 'VIP', stats: '리뷰 10' },
        rating: 5,
        date: '1일 전',
        roomType: '스탠다드',
        images: [image],
        content: '정말 좋았습니다. 다음에 또 오고 싶어요.'
      }
    ]
  };
});
