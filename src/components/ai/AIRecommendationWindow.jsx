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

// Suggestion Chip 버튼 컴포넌트 (hover 효과 적용)
const SuggestionChipButton = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexShrink: 0,
        backgroundColor: isHovered ? 'var(--brand_color)' : '#f3f4f6',
        color: isHovered ? 'white' : 'var(--brand_color)',
        fontSize: '0.75rem',
        fontWeight: '600',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      {text}
    </button>
  );
};

const AIRecommendationWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: '안녕하세요! AI 여행 비서입니다.\n\n저는 다음과 같은 도움을 드릴 수 있어요:\n\n1. **지능형 여행 일정 플래너**: "제주도 3박 4일 가족 여행 일정 짜줘" 처럼 말씀해 보세요.\n2. **대화형 여행 검색**: "조용한 부산 오션뷰 호텔 추천해줘" 처럼 물어보세요.\n\n무엇을 도와드릴까요?',
      recommendations: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ESC 키로 요청 중지
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && loading) {
        handleAbort();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [loading]);

  // 요청 중지 함수
  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
      setMessages(prev => [...prev, { role: 'model', text: '요청이 중지되었습니다.' }]);
    }
  };

  const handleChipClick = (chipText) => {
    setInput(chipText);
    sendMessage(chipText);
  };

  const sendMessage = async (textProp) => {
    const textToSend = textProp || input;
    if (!textToSend.trim()) return;

    // 이전 요청이 있으면 중지
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새 AbortController 생성
    abortControllerRef.current = new AbortController();

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
        signal: abortControllerRef.current.signal,
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
      if (err.name === 'AbortError') {
        console.log('Request aborted');
        return;
      }
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: "죄송합니다. 오류가 발생하여 답변을 드릴 수 없습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = () => sendMessage();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // ESC 키로 요청 중지
    if (e.key === 'Escape' && loading) {
      e.preventDefault();
      handleAbort();
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
        height: '85vh',
        minHeight: '400px',
        maxHeight: '700px',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxSizing: 'border-box'
      }}>

        {/* Header */}
        <div style={{
          backgroundColor: 'var(--brand_color)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>AI 여행 비서</h2>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            padding: '4px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }} className="custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              width: '100%'
            }}>
              <div
                style={{
                  maxWidth: '85%',
                  borderRadius: '1rem',
                  padding: '1.25rem 1.5rem',
                  fontSize: '0.9375rem',
                  lineHeight: '1.6',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  backgroundColor: msg.role === 'user' ? 'var(--brand_color)' : 'white',
                  color: msg.role === 'user' ? 'white' : '#1f2937',
                  border: msg.role === 'user' ? 'none' : '1px solid #f3f4f6',
                  borderTopRightRadius: msg.role === 'user' ? '0.25rem' : '1rem',
                  borderTopLeftRadius: msg.role === 'user' ? '1rem' : '0.25rem'
                }}
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
            <div className="flex justify-start items-center gap-2">
              <div className="bg-white text-gray-500 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <button
                onClick={handleAbort}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                중지 (ESC)
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips (입력이 비어있을 때만 노출) */}
        {!input.trim() && messages.length < 3 && !loading && (
          <div style={{
            padding: '0.5rem 1rem 0.75rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto'
          }} className="custom-scrollbar">
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <SuggestionChipButton
                key={idx}
                text={chip}
                onClick={() => handleChipClick(chip)}
              />
            ))}
          </div>
        )}

        {/* Input Area */}
        <div style={{
          padding: '1rem 1.25rem 1.5rem 1.25rem',
          backgroundColor: 'white',
          borderTop: '1px solid #f3f4f6',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="여행 계획이나 숙소 추천을 물어보세요..."
              style={{
                flex: 1,
                border: '1px solid #d1d5db',
                borderRadius: '9999px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              style={{
                backgroundColor: 'var(--brand_color)',
                color: 'white',
                borderRadius: '50%',
                padding: '0.625rem',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
