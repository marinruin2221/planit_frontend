// 쿠폰 데이터 및 관리 유틸리티

export const coupons = [
    {
        id: 'coupon_stay_4500',
        name: '숙박 4,500원 할인',
        discount: 4500,
        type: 'stay', // stay: 숙박, hourly: 대실
        minOrderAmount: 30000,
        description: '숙박 예약 시 4,500원 할인',
        expireDays: 30, // 발급일로부터 30일
        category: 'all' // all: 모든 숙소, hotel: 호텔, pension: 펜션
    },
    {
        id: 'coupon_hourly_2500',
        name: '대실 2,500원 할인',
        discount: 2500,
        type: 'hourly',
        minOrderAmount: 20000,
        description: '대실 예약 시 2,500원 할인',
        expireDays: 30,
        category: 'all'
    },
    {
        id: 'coupon_first_5000',
        name: '첫 예약 5,000원 할인',
        discount: 5000,
        type: 'stay',
        minOrderAmount: 50000,
        description: '첫 예약 시 5,000원 할인',
        expireDays: 7,
        category: 'all'
    },
    {
        id: 'coupon_weekend_3000',
        name: '주말 특가 3,000원',
        discount: 3000,
        type: 'stay',
        minOrderAmount: 40000,
        description: '주말(금~일) 숙박 시 3,000원 할인',
        expireDays: 14,
        category: 'all'
    },
    {
        id: 'coupon_hotel_10percent',
        name: '호텔 10% 할인',
        discountPercent: 10,
        maxDiscount: 20000,
        type: 'stay',
        minOrderAmount: 100000,
        description: '호텔 예약 시 10% 할인 (최대 2만원)',
        expireDays: 30,
        category: 'hotel'
    }
];

// LocalStorage 키
const COUPONS_STORAGE_KEY = 'planit_user_coupons';

// 사용자 쿠폰 가져오기
export const getUserCoupons = () => {
    try {
        const stored = localStorage.getItem(COUPONS_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // 만료된 쿠폰 필터링
            const now = new Date().getTime();
            return parsed.filter(c => c.expireAt > now);
        }
    } catch (e) {
        console.error('Failed to get user coupons:', e);
    }
    return [];
};

// 쿠폰 저장하기
export const saveUserCoupons = (couponsToSave) => {
    try {
        localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(couponsToSave));
    } catch (e) {
        console.error('Failed to save user coupons:', e);
    }
};

// 쿠폰 발급하기
export const issueCoupon = (couponId) => {
    const couponData = coupons.find(c => c.id === couponId);
    if (!couponData) return { success: false, message: '존재하지 않는 쿠폰입니다.' };

    const userCoupons = getUserCoupons();

    // 이미 보유한 쿠폰인지 확인
    if (userCoupons.some(c => c.id === couponId)) {
        return { success: false, message: '이미 보유한 쿠폰입니다.' };
    }

    // 발급
    const expireAt = new Date().getTime() + (couponData.expireDays * 24 * 60 * 60 * 1000);
    const issuedAt = new Date().getTime();

    const newCoupon = {
        ...couponData,
        issuedAt,
        expireAt,
        used: false
    };

    userCoupons.push(newCoupon);
    saveUserCoupons(userCoupons);

    return { success: true, message: `${couponData.name} 쿠폰이 발급되었습니다!`, coupon: newCoupon };
};

// 전체 쿠폰 받기
export const issueAllCoupons = () => {
    const userCoupons = getUserCoupons();
    const results = [];
    let issuedCount = 0;

    for (const coupon of coupons) {
        if (!userCoupons.some(c => c.id === coupon.id)) {
            const result = issueCoupon(coupon.id);
            if (result.success) {
                issuedCount++;
            }
            results.push(result);
        }
    }

    if (issuedCount === 0) {
        return { success: false, message: '발급 가능한 쿠폰이 없습니다. (이미 모든 쿠폰을 보유 중)', results };
    }

    return { success: true, message: `${issuedCount}개의 쿠폰이 발급되었습니다!`, results };
};

// 쿠폰 사용하기
export const useCoupon = (couponId) => {
    const userCoupons = getUserCoupons();
    const index = userCoupons.findIndex(c => c.id === couponId && !c.used);

    if (index === -1) {
        return { success: false, message: '사용할 수 없는 쿠폰입니다.' };
    }

    userCoupons[index].used = true;
    saveUserCoupons(userCoupons);

    return { success: true, message: '쿠폰이 적용되었습니다.' };
};

// 사용 가능한 쿠폰 목록 (가격, 숙소 유형에 따라 필터링)
export const getApplicableCoupons = (orderAmount, accommodationType = 'all') => {
    const userCoupons = getUserCoupons();

    return userCoupons.filter(c => {
        if (c.used) return false;
        if (c.minOrderAmount && orderAmount < c.minOrderAmount) return false;
        if (c.category !== 'all' && c.category !== accommodationType) return false;
        return true;
    });
};

// 할인 금액 계산
export const calculateDiscount = (coupon, orderAmount) => {
    if (coupon.discountPercent) {
        const discount = Math.floor(orderAmount * coupon.discountPercent / 100);
        return Math.min(discount, coupon.maxDiscount || Infinity);
    }
    return coupon.discount || 0;
};

// 쿠폰 만료일 포맷
export const formatExpireDate = (expireAt) => {
    const date = new Date(expireAt);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};
