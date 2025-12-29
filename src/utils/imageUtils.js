/**
 * 숙소 카테고리에 따른 Fallback 이미지를 반환합니다.
 * @param {string} category - 숙소 카테고리 코드 또는 이름 (예: 'B02010100', '호텔', '펜션')
 * @returns {string} 이미지 경로
 */
export const getFallbackImage = (category) => {
  const cat = String(category || '').toLowerCase();
  let mappedCategory = 'default';

  // 호텔, 모텔, 콘도, 레지던스 -> 도시적인 느낌 (city.png)
  if (
    cat.includes('호텔') || cat.includes('hotel') || cat.includes('b02010100') ||
    cat.includes('모텔') || cat.includes('motel') || cat.includes('b02010900') ||
    cat.includes('콘도') || cat.includes('resort') || cat.includes('b02010200') ||
    cat.includes('레지던스')
  ) {
    mappedCategory = 'hotel';
  }
  // 펜션, 민박, 게스트하우스, 한옥 -> 아늑하고 로컬한 느낌 (jeju.png)
  else if (
    cat.includes('펜션') || cat.includes('pension') || cat.includes('b02010700') ||
    cat.includes('민박') || cat.includes('b02010800') ||
    cat.includes('게스트하우스') || cat.includes('guesthouse') || cat.includes('b02011100') ||
    cat.includes('한옥') || cat.includes('hanok') || cat.includes('b02011200')
  ) {
    mappedCategory = 'pension';
  }
  // 캠핑, 글램핑, 야영장 -> 자연적인 느낌 (mountain.png)
  else if (
    cat.includes('캠핑') || cat.includes('camping') || cat.includes('야영') || cat.includes('b02010300') ||
    cat.includes('글램핑') || cat.includes('caravan')
  ) {
    mappedCategory = 'camping';
  }
  // 그 외 (해변 등) -> 휴양지 느낌 (beach.png)
  else {
    mappedCategory = 'pension'; // Default fallback
  }

  return `/api/images/fallback/${mappedCategory}`;
};
