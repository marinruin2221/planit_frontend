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
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          {isConfirming ? (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-gray-900">결제 승인 중입니다...</h2>
              <p className="text-gray-500 mt-2">잠시만 기다려주세요.</p>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h2>
              <p className="text-gray-600 mb-6">예약이 확정되었습니다.</p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">주문번호</span>
                  <span className="font-medium">{orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">결제금액</span>
                  <span className="font-medium text-blue-600">{Number(amount).toLocaleString()}원</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                홈으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
