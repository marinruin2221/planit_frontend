import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const message = searchParams.get('message') || '결제에 실패했습니다.';
  const code = searchParams.get('code');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">결제 실패</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          {code && (
            <div className="bg-gray-50 rounded-lg p-3 mb-6 text-sm text-gray-500">
              에러 코드: {code}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailPage;
