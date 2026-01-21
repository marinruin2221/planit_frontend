import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "@components/common/Header.jsx";
import Footer from "@components/common/Footer.jsx";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(true);
  const [result, setResult] = useState(null);

  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      alert('결제 정보가 올바르지 않습니다.');
      navigate('/');
      return;
    }

    const confirmPayment = async () => {
      try {
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
          }),
        });

        if (!response.ok) {
          throw new Error('Payment confirmation failed');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Payment confirmation error:', error);
        alert('결제 승인 중 오류가 발생했습니다.');
        navigate('/payment/fail');
      } finally {
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out hover:scale-[1.005]">

          {/* Top Image Section */}
          <div className="relative h-80 bg-orange-50 flex items-center justify-center overflow-hidden">
            <img
              src="/images/payment_success.png"
              alt="Payment Success"
              className="w-full h-full object-cover opacity-95 animate-fade-in-up"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white/40 to-transparent"></div>
          </div>

          <div className="px-10 pb-12 pt-8 text-center relative z-10">
            {isConfirming ? (
              <div className="py-12">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#DD6B20] border-t-transparent mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-800">결제 승인 중입니다...</h2>
                <p className="text-gray-500 mt-3 text-base">잠시만 기다려주세요.</p>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  결제 완료!
                </h2>
                <p className="text-gray-500 mb-10 text-xl font-medium">
                  설레는 여행이 확정되었습니다.
                </p>

                {/* Info Card */}
                <div className="bg-orange-50/50 rounded-2xl p-8 mb-10 text-left border border-orange-100 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col sm:border-r sm:border-orange-200 sm:pr-6">
                      <span className="text-gray-500 text-sm font-medium mb-1">주문번호</span>
                      <span className="font-semibold text-gray-800 text-lg break-all">{orderId}</span>
                    </div>
                    <div className="flex flex-col sm:pl-2">
                      <span className="text-gray-500 text-sm font-medium mb-1">결제금액</span>
                      <span className="font-bold text-3xl text-[#DD6B20] tracking-tight">
                        {Number(amount).toLocaleString()}
                        <span className="text-lg font-normal text-gray-400 ml-1">원</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto min-w-[200px] group relative inline-flex justify-center py-4 px-8 border border-transparent text-lg font-bold rounded-xl text-white bg-[#DD6B20] hover:bg-[#C05621] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DD6B20] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  <span className="group-hover:pl-6 transition-all duration-200">홈으로 돌아가기</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccessPage;
