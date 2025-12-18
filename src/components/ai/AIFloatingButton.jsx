import React, { useState } from 'react';
import AIRecommendationWindow from './AIRecommendationWindow';

const AIFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[var(--brand_color)] text-white rounded-full shadow-lg hover:bg-[var(--brand_hover_color)] hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="MBTI로 알아보는 여행 추천"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-16 bg-[var(--brand_color)] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          MBTI로 알아보는 여행 추천
        </span>
      </button>

      {/* AI Recommendation Modal */}
      <AIRecommendationWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        reviews={[]}
        accommodationName="전체 여행지"
      />
    </>
  );
};

export default AIFloatingButton;
