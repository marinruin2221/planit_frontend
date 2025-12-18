import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIRecommendationWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: '안녕하세요! AI 여행 비서입니다. 👋\n\n저는 다음과 같은 도움을 드릴 수 있어요:\n\n1. **지능형 여행 일정 플래너**: "제주도 3박 4일 가족 여행 일정 짜줘" 처럼 말씀해 보세요.\n2. **대화형 여행 검색**: "조용한 부산 오션뷰 호텔 추천해줘" 처럼 물어보세요.\n\n무엇을 도와드릴까요?'
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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        // Mock response if no key
        await new Promise(resolve => setTimeout(resolve, 1500));
        setMessages(prev => [...prev, {
          role: 'model',
          text: '[MOCK] API 키가 설정되지 않았습니다. \n\n하지만 실제로는 다음과 같이 답변할 것입니다:\n\n사용자님의 요청에 맞춰 멋진 여행 일정을 계획해 보았습니다! \n1일차: 공항 도착 -> 렌터카 수령 -> 애월 해안도로 드라이브...'
        }]);
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      const systemPrompt = `
        당신은 전문적인 'AI 여행 비서'입니다. 다음 두 가지 핵심 기능을 수행합니다.

        1. **지능형 여행 일정 플래너 (Itinerary Generator)**:
           - 사용자의 입력(목적지, 기간, 취향, 예산 등)을 바탕으로 상세 일정을 생성합니다.
           - 정보가 부족하면 친절하게 되물어주세요 (예: "몇 박 며칠 일정인가요?", "선호하는 여행 스타일이 있으신가요?").
           - "아이와 함께하는", "가성비", "힐링" 등 구체적인 요구사항을 반영하여 경로를 제안합니다.
           - 이동 시간과 경로를 고려하여 현실적인 일정을 짜주세요.

        2. **대화형 여행 검색 및 추천 (Conversational Search)**:
           - 사용자가 자연어로 숙소나 장소를 찾을 때 최적의 추천을 제공합니다.
           - 예: "조용히 책 읽기 좋은 부산 호텔", "강릉의 뷰 좋은 카페"
           - 추천 이유와 주요 특징을 함께 설명해주세요.

        **응답 스타일**:
        - 친절하고 전문적인 톤을 유지하세요.
        - 마크다운(Markdown)을 사용하여 가독성 좋게 출력하세요 (볼드체, 리스트 등 활용).
        - 이모지를 적절히 사용하여 생동감을 주세요.
      `;

      // Note: Gemini API doesn't support system prompt in startChat directly in all versions, 
      // but we can prepend it to the first message or rely on the context. 
      // For this implementation, we'll send the user message directly, 
      // but ideally we would set the system instruction if the SDK supports it or prepend context.
      // Let's prepend context to the current prompt effectively.

      const result = await chat.sendMessage(`${systemPrompt}\n\n사용자 메시지: ${userMessage}`);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text: text }]);

    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { role: 'model', text: "죄송합니다. 오류가 발생하여 답변을 드릴 수 없습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 custom-scrollbar space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user'
                  ? 'bg-[var(--brand_color)] text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}
              >
                {msg.text}
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

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="여행 계획이나 숙소 추천을 물어보세요..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand_color)] focus:border-transparent text-sm"
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
