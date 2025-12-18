import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SimpleGrid, Button } from "@chakra-ui/react";

const AIRecommendationWindow = ({ isOpen, onClose, reviews, accommodationName }) => {
  const [mbti, setMbti] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const mbtiOptions = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ];

  const handleAnalyze = async () => {
    if (!mbti) {
      setError('MBTI를 선택해주세요.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');

    try {
      // API Key from environment variable
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        // Mock response if no key is provided
        await new Promise(resolve => setTimeout(resolve, 2000));
        setResult(`[MOCK RESULT] ${mbti} 유형의 여행자님에게 ${accommodationName}을(를) 추천합니다! \n\n이 숙소는 ${reviews.length}개의 리뷰를 바탕으로 분석했을 때, 조용하고 편안한 분위기가 특징입니다. \n\n특히 ${mbti}의 성향에 맞는 ... (API 키를 설정하면 실제 분석 결과가 표시됩니다)`);
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const reviewTexts = reviews.map(r => r.content).join('\n');
      const prompt = `
        당신은 여행 전문가 AI입니다.
        사용자의 MBTI는 "${mbti}"입니다.
        숙소 이름은 "${accommodationName}"입니다.
        아래는 이 숙소의 실제 이용객 후기들입니다:
        ---
        ${reviewTexts.substring(0, 5000)}
        ---
        이 후기들을 바탕으로, ${mbti} 성향을 가진 사용자에게 이 숙소가 적합한지, 어떤 점을 즐길 수 있을지 추천 멘트를 작성해주세요.
        말투는 친절하고 전문적이게 해주세요.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setResult(text);

    } catch (err) {
      console.error("AI Error:", err);
      setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-[42rem] rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">

        {/* Header */}
        <div className="bg-[var(--brand_color)] p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-lg font-bold">MBTI로 알아보는 여행 추천</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            <span className="font-bold text-[var(--brand_color)]">{accommodationName}</span>의 실제 후기를 AI가 분석하여<br />
            당신의 성향에 딱 맞는 여행 포인트를 알려드립니다.
          </p>

          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">당신의 MBTI는?</label>
            <SimpleGrid columns={4} spacing={2}>
              {mbtiOptions.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={mbti === type ? "solid" : "outline"}
                  colorPalette={mbti === type ? "orange" : "gray"}
                  onClick={() => setMbti(type)}
                  className={`transition-all ${mbti === type ? 'ring-2 ring-offset-1 ring-orange-500' : 'hover:bg-gray-50'}`}
                >
                  {type}
                </Button>
              ))}
            </SimpleGrid>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          {/* Result Area */}
          {result && (
            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100 mb-8 max-h-72 overflow-y-auto custom-scrollbar">
              <h3 className="font-bold text-[var(--brand_color)] mb-3 flex items-center gap-2">
                <span className="text-xl">✨</span> 분석 결과
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {result}
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--brand_color)] hover:bg-[var(--brand_hover_color)] hover:shadow-orange-500/30'}
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                분석중입니다...
              </div>
            ) : (
              'AI 추천 받기'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationWindow;
