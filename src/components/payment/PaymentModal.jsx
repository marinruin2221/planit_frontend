import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { nanoid } from 'nanoid';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-day-picker/style.css';

// Toss Payments 클라이언트 키 (사용자 요청으로 하드코딩)
// API 개별 연동 키는 'test_ck_'로 시작하며, 결제 위젯이 아닌 일반 결제창(tosspayments-sdk)을 사용해야 합니다.
const clientKey = 'test_ck_PBal2vxj81zazxgQz7ek35RQgOAN'.trim();
const customerKey = ANONYMOUS;

const PaymentModal = ({ isOpen, onClose, amount, orderName, customerName, customerEmail, contentId, name, dateF, dateT, nights: initialNights, pricePerNight }) => {
  const [isProductSelected, setIsProductSelected] = useState(true);
  const [totalPrice, setTotalPrice] = useState(amount);

  // 날짜 선택 상태
  const [checkIn, setCheckIn] = useState(dateF || format(new Date(), 'yyyy-MM-dd'));
  const [checkOut, setCheckOut] = useState(dateT || format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'));
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  // 숙박 일수 계산
  const calculateNights = (checkInDate, checkOutDate) => {
    const diffTime = new Date(checkOutDate) - new Date(checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };
  const nights = calculateNights(checkIn, checkOut);
  const calculatedAmount = pricePerNight ? pricePerNight * nights : amount;

  // 상품 선택 상태에 따라 총 금액 업데이트
  useEffect(() => {
    if (isProductSelected) {
      setTotalPrice(calculatedAmount);
    } else {
      setTotalPrice(0);
    }
  }, [isProductSelected, calculatedAmount]);

  // props 변경 시 날짜 동기화
  useEffect(() => {
    if (dateF) setCheckIn(dateF);
    if (dateT) setCheckOut(dateT);
  }, [dateF, dateT]);

  const handleProductToggle = () => {
    setIsProductSelected(!isProductSelected);
  };

  const handlePayment = async () => {
    if (totalPrice <= 0) {
      alert('상품을 선택해주세요.');
      return;
    }

    try {
      const tossPayments = await loadTossPayments(clientKey);
      const payment = tossPayments.payment({ customerKey });

      fetch("/api/mypage/breakdownCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: contentId,
          userId: localStorage.getItem("userId"),
          name: name,
          dateF: checkIn,
          dateT: checkOut,
          price: totalPrice,
          status: "1"
        })
      })

      await payment.requestPayment({
        method: "CARD", // 카드/간편결제 통합 결제창
        amount: {
          currency: "KRW",
          value: totalPrice,
        },
        orderId: nanoid(),
        orderName: orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: customerEmail || 'customer@example.com',
        customerName: customerName || '익명',
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert('결제 요청 중 오류가 발생했습니다: ' + error.message);
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

          {/* 날짜 선택 카드 */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            {/* 체크인 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>체크인</span>
              <button
                onClick={() => { setIsCheckInOpen(!isCheckInOpen); setIsCheckOutOpen(false); }}
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--brand_color)',
                  background: 'none',
                  border: '1px solid var(--brand_color)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                {checkIn} ▼
              </button>
              {isCheckInOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 100,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: '0.5rem',
                  marginTop: '0.25rem'
                }}>
                  <DayPicker
                    mode="single"
                    locale={ko}
                    selected={checkIn ? new Date(checkIn) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        const formatted = format(date, 'yyyy-MM-dd');
                        setCheckIn(formatted);
                        setIsCheckInOpen(false);
                        if (new Date(formatted) >= new Date(checkOut)) {
                          const nextDay = new Date(date);
                          nextDay.setDate(nextDay.getDate() + 1);
                          setCheckOut(format(nextDay, 'yyyy-MM-dd'));
                        }
                      }
                    }}
                    disabled={{ before: new Date() }}
                  />
                </div>
              )}
            </div>

            {/* 체크아웃 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', position: 'relative' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>체크아웃</span>
              <button
                onClick={() => { setIsCheckOutOpen(!isCheckOutOpen); setIsCheckInOpen(false); }}
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: 'var(--brand_color)',
                  background: 'none',
                  border: '1px solid var(--brand_color)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                {checkOut} ▼
              </button>
              {isCheckOutOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 100,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  borderRadius: '0.5rem',
                  marginTop: '0.25rem'
                }}>
                  <DayPicker
                    mode="single"
                    locale={ko}
                    selected={checkOut ? new Date(checkOut) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setCheckOut(format(date, 'yyyy-MM-dd'));
                        setIsCheckOutOpen(false);
                      }
                    }}
                    disabled={{ before: checkIn ? new Date(checkIn) : new Date() }}
                  />
                </div>
              )}
            </div>

            {/* 숙박 기간 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>숙박 기간</span>
              <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--brand_color)' }}>
                {nights}박 {nights + 1}일
              </span>
            </div>
            {pricePerNight && nights > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>1박 기준 가격</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                  {pricePerNight?.toLocaleString()}원 × {nights}박
                </span>
              </div>
            )}
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

          {totalPrice <= 0 && (
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

          <div style={{
            backgroundColor: '#eff6ff',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            fontSize: '0.875rem'
          }}>
            <p style={{ margin: 0 }}>
              ℹ️ <strong>결제하기</strong> 버튼을 누르면 토스페이먼츠 결제창이 팝업으로 열립니다.
            </p>
          </div>
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
            disabled={totalPrice <= 0}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: (totalPrice > 0) ? 'var(--brand_color)' : '#d1d5db',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: (totalPrice > 0) ? 'pointer' : 'not-allowed',
              boxShadow: (totalPrice > 0) ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {totalPrice?.toLocaleString() || 0}원 결제하기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;
