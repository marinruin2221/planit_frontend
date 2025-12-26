import React from 'react';

const AccommodationCard = ({ accommodation, onClick }) => {
    const { title, addr1, firstimage, minPrice } = accommodation;

    // 이미지 fallback 처리
    const imageUrl = firstimage || '/images/hotel_default.png';

    // 가격 포맷팅
    const formattedPrice = minPrice
        ? `${minPrice.toLocaleString()}원`
        : '가격 정보 없음';

    return (
        <div
            className="min-w-[280px] w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
            onClick={onClick}
        >
            <div className="h-40 bg-gray-200 relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/images/jeju.png' }}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center shadow-sm">
                    <span className="text-yellow-400 mr-1">★</span> 9.0
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-3">{addr1}</p>
                </div>

                <div className="flex items-end justify-between mt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">1박, 세금 포함</span>
                        <span className="text-lg font-bold text-[var(--brand_color)]">{formattedPrice}</span>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                        자세히
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCard;
