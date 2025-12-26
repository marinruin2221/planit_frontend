import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

// Toss Payments 클라이언트 키 (환경 변수에서 가져옴)
const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
// const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'; // 공용 테스트 키
const customerKey = ANONYMOUS; // 비회원 결제용 상수 사용

const PaymentModal = ({ isOpen, onClose, amount, orderName, customerName, customerEmail }) => {
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [totalPrice, setTotalPrice] = useState(amount);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [widgetError, setWidgetError] = useState(null);

  // 상품 선택 상태에 따라 총 금액 업데이트
  useEffect(() => {
    if (isProductSelected) {
      setTotalPrice(amount);
    } else {
      setTotalPrice(0);
    }
  }, [isProductSelected, amount]);

  useEffect(() => {
    if (isOpen && totalPrice > 0) {
      setIsWidgetReady(false);
      setWidgetError(null);

      (async () => {
        try {
          console.log('Toss Client Key:', clientKey ? clientKey.substring(0, 10) + '...' : 'undefined'); // 디버깅용 로그

          const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

          const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            '#payment-widget',
            { value: totalPrice }
            // { variantKey: 'DEFAULT' } // 공용 키 사용 시 variantKey 제거 시도
          );

          paymentWidget.renderAgreement(
            '#agreement'
            // { variantKey: 'AGREEMENT' } // 공용 키 사용 시 variantKey 제거 시도
          );

          paymentWidgetRef.current = paymentWidget;
          paymentMethodsWidgetRef.current = paymentMethodsWidget;

          // 위젯 렌더링 완료 이벤트 감지
          paymentMethodsWidget.on('ready', () => {
            console.log('Payment Widget is ready!');
            setIsWidgetReady(true);
          });

        } catch (error) {
          console.error('Widget load error:', error);
          setWidgetError('결제 위젯을 불러오는데 실패했습니다. API 키를 확인해주세요. (' + error.message + ')');
        }
      })();

      // 클린업 함수: 컴포넌트 언마운트 또는 의존성 변경 시 실행
      return () => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;
        if (paymentMethodsWidget && typeof paymentMethodsWidget.destroy === 'function') {
          paymentMethodsWidget.destroy();
        }
        setIsWidgetReady(false);
      };
    }
  }, [isOpen, totalPrice]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(totalPrice);
  }, [totalPrice]);

  const handleProductToggle = () => {
    setIsProductSelected(!isProductSelected);
  };

  const handlePayment = async () => {
    if (totalPrice <= 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    if (!isWidgetReady) {
      alert('결제 위젯이 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const paymentWidget = paymentWidgetRef.current;

    if (!paymentWidget) {
      alert('결제 위젯을 불러오지 못했습니다. 페이지를 새로고침 후 다시 시도해주세요.');
      return;
    }

    try {
      await paymentWidget.requestPayment({
        orderId: nanoid(),
        orderName: orderName,
        customerName: customerName || '익명',
        customerEmail: customerEmail || 'customer@example.com',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
      if (error.message?.includes('렌더링')) {
        alert('결제 위젯이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('결제 요청 중 오류가 발생했습니다.');
      }
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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '90%',
        maxWidth: '600px',
        height: 'auto',
        maxHeight: '90vh',
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
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          flexShrink: 0
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>결제하기</h2>
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

        {/* Content Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxSizing: 'border-box'
        }}>
          {/* Product Selection Card */}
          <div
            onClick={handleProductToggle}
            style={{
              backgroundColor: 'white',
              padding: '1.25rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: isProductSelected ? '2px solid var(--brand_color)' : '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
            {/* Checkbox */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              border: isProductSelected ? 'none' : '2px solid #d1d5db',
              backgroundColor: isProductSelected ? 'var(--brand_color)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s'
            }}>
              {isProductSelected && (
                <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Product Info */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>상품명</p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>{orderName}</h3>
            </div>

            {/* Price */}
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: isProductSelected ? 'var(--brand_color)' : '#9ca3af'
              }}>
                {amount?.toLocaleString() || 0}원
              </span>
            </div>
          </div>

          {/* Total Price Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1rem', color: '#374151', fontWeight: '600' }}>총 결제 금액</span>
              <span style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: totalPrice > 0 ? 'var(--brand_color)' : '#9ca3af'
              }}>
                {totalPrice?.toLocaleString() || 0}원
              </span>
            </div>
          </div>

          {/* Widget Error Message */}
          {widgetError && (
            <div style={{
              backgroundColor: '#fef2f2',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid #fecaca',
              color: '#dc2626'
            }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>⚠️ API 키 오류</p>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                {widgetError}
                <br />
                <a
                  href="https://developers.tosspayments.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                >
                  Toss Payments 개발자 센터
                </a>에서 테스트 키를 발급받으세요.
              </p>
            </div>
          )}

          {/* Payment Widget Container */}
          {totalPrice > 0 && !widgetError && (
            <div style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              width: '100%',
              boxSizing: 'border-box',
              position: 'relative'
            }}>
              {!isWidgetReady && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid #e5e7eb',
                    borderTop: '3px solid var(--brand_color)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.75rem'
                  }} />
                  결제 위젯 로딩 중...
                </div>
              )}
              <div id="payment-widget" style={{ width: '100%', minHeight: isWidgetReady ? '200px' : '0' }} />
              <div id="agreement" style={{ width: '100%', marginTop: '1rem' }} />
            </div>
          )}

          {totalPrice <= 0 && !widgetError && (
            <div style={{
              backgroundColor: '#fef3c7',
              padding: '1rem',
              borderRadius: '0.75rem',
              border: '1px solid #fcd34d',
              textAlign: 'center',
              color: '#92400e'
            }}>
              상품을 선택해주세요.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          flexShrink: 0
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            취소
          </button>
          <button
            onClick={handlePayment}
            disabled={totalPrice <= 0 || !isWidgetReady}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: (totalPrice > 0 && isWidgetReady) ? 'var(--brand_color)' : '#d1d5db',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: (totalPrice > 0 && isWidgetReady) ? 'pointer' : 'not-allowed',
              boxShadow: (totalPrice > 0 && isWidgetReady) ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {isWidgetReady ? `${totalPrice?.toLocaleString() || 0}원 결제하기` : '로딩 중...'}
          </button>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default PaymentModal;
