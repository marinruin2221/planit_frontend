import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import KakaoMap from "@components/map/kakaomap.jsx";

import AccommodationCard from "./AccommodationCard";

const SUGGESTION_CHIPS = [
  "제주도 가성비 호텔 추천해줘",
  "강원도 오션뷰 펜션 찾아줘",
  "서울 호캉스 하기 좋은 곳",
  "부산 조식 맛있는 호텔"
];

const AIRecommendationWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: '안녕하세요! AI 여행 비서입니다. 👋\n\n저는 다음과 같은 도움을 드릴 수 있어요:\n\n1. **지능형 여행 일정 플래너**: "제주도 3박 4일 가족 여행 일정 짜줘" 처럼 말씀해 보세요.\n2. **대화형 여행 검색**: "조용한 부산 오션뷰 호텔 추천해줘" 처럼 물어보세요.\n\n무엇을 도와드릴까요?',
      recommendations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChipClick = (chipText) => {
    setInput(chipText);
    // 상태 업데이트 후 바로 전송하기 위해 setTimeout 사용 또는 useEffect 처리 필요하지만
    // 여기서는 setInput 후 바로 handleSendMessage를 호출하려면 input state가 반영되기 전일 수 있음.
    // 안전하게 메시지를 인자로 받는 send 함수로 분리하는 것이 좋음.
    sendMessage(chipText);
  };

  const sendMessage = async (textProp) => {
    const textToSend = textProp || input;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({
            role: m.role,
            text: m.text
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'model',
        text: data.response,
        recommendations: data.recommendations || []
      }]);

    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: "죄송합니다. 오류가 발생하여 답변을 드릴 수 없습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => sendMessage();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '500px',
        height: '70vh',
        maxHeight: '550px',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        margin: 'auto'
      }}>

        {/* Header */}
        <div className="bg-[var(--brand_color)] p-4 flex justify-between items-center text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-lg font-bold">AI 여행 비서</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50 custom-scrollbar space-y-6 pb-10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-6 py-5 text-base leading-relaxed shadow-md whitespace-pre-wrap ${msg.role === 'user'
                  ? 'bg-[var(--brand_color)] text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
              >
                {msg.text}

                {/* 추천 숙소 카드 리스트 (Carousel) */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-6 -mx-3">
                    <div className="flex overflow-x-auto gap-4 pb-4 px-3 custom-scrollbar snap-x">
                      {msg.recommendations.map((item, idx) => (
                        <div key={idx} className="snap-center">
                          <AccommodationCard
                            accommodation={item}
                            onClick={() => window.open(`/detail/${item.contentId}`, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 지도 렌더링 */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-4 w-full h-56 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
                    <KakaoMap
                      className="w-full h-full"
                      markers={msg.recommendations.map(item => ({
                        lat: parseFloat(item.mapy),
                        lng: parseFloat(item.mapx),
                        title: item.title,
                        content: item.title
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips (입력이 비어있을 때만 노출) */}
        {!input.trim() && messages.length < 3 && !loading && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar">
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="flex-shrink-0 bg-gray-100 text-[var(--brand_color)] text-xs font-bold px-3 py-2 rounded-full border border-gray-200 hover:bg-[var(--brand_color)] hover:text-white transition-all whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-5 pb-8 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="여행 계획이나 숙소 추천을 물어보세요..."
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand_color)] focus:border-transparent text-sm shadow-sm"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className={`bg-[var(--brand_color)] text-white rounded-full p-2.5 shadow-md transition-all
                ${loading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--brand_hover_color)] hover:scale-105'}
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default AIRecommendationWindow;
