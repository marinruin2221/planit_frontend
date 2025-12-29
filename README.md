# planit_frontend

Fronend workspace for planit project

## 날짜별 작업 기록

| 날짜 | 담당 | 작업 내용 | 관련 파일/링크 | 비고 |
| --- | --- | --- | --- | --- |
| 2025-12-13 | 손종현 | 이벤트 페이지 카테고리별 페이지네이션 구현 완료 | [`src/pages/EventPage.jsx`](src/pages/EventPage.jsx) |  |
| 2025-12-15 | 손종현 | 이벤트 페이지 검색 기능 및 검색 초기화 기능 추가<br> 고객센터 페이지 추가 및 간단한 기능 추가 | [`src/pages/EventPage.jsx`](src/pages/EventPage.jsx)<br>[`src/pages/CustomerservicePage.jsx`](src/pages/CustomerservicePage.jsx) |  |
| 2025-12-15 | 김관범 | 리스트 페이지 필터 기능 구현<br> UI 디자인 구성 / 디테일 페이지 UI 디자인 구성 완료 | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx)<br> [`src/pages/DetailPage.jsx`](src/pages/DetailPage.jsx) |  |
| 2025-12-16 | 손종현 | 푸터 제작 | [`src/components/common/Footer.jsx`](src/components/common/Footer.jsx) |  |
| 2025-12-16 | 김관범 | 리스트페이지 UI 개편(스와이퍼 화면 제거<br> 필터 기능을 체크박스로 교체<br> 리스트 항목 gap 10px로 개선) | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx) |  |
| 2025-12-18 | 손종현 | 이벤트/고객센터 페이지 디자인 수정<br> 이용약관/개인정보처리방침 페이지 추가 | [`src/pages/EventPage.jsx`](src/pages/EventPage.jsx)<br> [`src/pages/CustomerservicePage.jsx`](src/pages/CustomerservicePage.jsx)<br> [`src/pages/AgreementPage.jsx`](src/pages/AgreementPage.jsx)<br> [`src/pages/privacyPage.jsx`](src/pages/privacyPage.jsx) |  |
| 2025-12-18 | 김관범 | AI 여행 추천<br> 이미지 갤러리 구현 및 UI/스타일 리팩토링 | [`src/components/ai/AIRecommendationWindow.jsx`](src/components/ai/AIRecommendationWindow.jsx)<br> [`src/components/common/ImageGalleryModal.jsx`](src/components/common/ImageGalleryModal.jsx)<br> [`src/data/mockData.js`](src/data/mockData.js) |  |
| 2025-12-19 | 김관범 | 리스트페이지 디자인 개선(가격 필터 구현<br> 필터 태그로 변경: 차크라 UI)<br>- MBTI 여행추천 'MBTI' UI (차크라 UI 그리드)로 변경 | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx)<br> [`src/components/main/BestCard.jsx`](src/components/main/BestCard.jsx) |  |
| 2025-12-19 | 김현 | 회원가입 페이지 및 약관 구성 추가 | [`src/pages/SignupPage.jsx`](src/pages/SignupPage.jsx)<br> [`src/components/signup/SignupForm.jsx`](src/components/signup/SignupForm.jsx)<br> [`src/components/signup/TermsSection.jsx`](src/components/signup/TermsSection.jsx)<br> [`src/components/signup/TermsCard.jsx`](src/components/signup/TermsCard.jsx)<br> [`src/data/tos.js`](src/data/tos.js) |  |
| 2025-12-20 | 김현 | 헤더 추가 | [`src/components/common/Header.jsx`](src/components/common/Header.jsx)<br> [`src/data/user.js`](src/data/user.js) | 로고는 임시로 매꿔두었기에 수정必<br>로그인 페이지 없기에 회원가입 페이지로 연동<br>로그인 로직 백엔드 없어서 구현안함 |
| 2025-12-22 | 손종현 | 이벤트 페이지 항목 상세페이지 구현 | [`src/pages/EventDetailPage.jsx`](src/pages/EventDetailPage.jsx)<br> [`src/data/events.js`](src/data/events.js) | 이벤드페이지 백엔드 구현 필요 |
| 2025-12-23 | 김관범 | 리스트 페이지 페이지네이션 구현<br> - API 연동 및 동적 페이지 계산<br> - 페이지네이션 윈도우(5개씩 보기) 적용 | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx) | 백엔드 API 연동 완료 |
| 2025-12-24 | 김관범 | 리스트 페이지 가격 조회 API 연동<br> - 숙박 카테고리 동적 표시<br> - 가격 정보 비동기 로딩 구현<br>디테일 페이지 API 연동 개선<br> - 시설 정보(subfacility) 동적 표시<br> - 이미지 갤러리 중복 제거 로직 적용<br>이미지 갤러리 모달 스타일 개선 | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx)<br>[`src/pages/DetailPage.jsx`](src/pages/DetailPage.jsx)<br>[`src/components/common/ImageGalleryModal.jsx`](src/components/common/ImageGalleryModal.jsx) | 가격 API 연동 완료 |
| 2025-12-25 | 김관범 | 카카오맵 API 로딩 최적화<br> - parser-blocking 경고 해결 (`autoload=false`)<br> - API 인증(401) 오류 해결 (중복 로딩 제거)<br> - 패키지 설치 및 컴포넌트명 수정<br> - 리스트 페이지 가격 비동기 조회(`fetchPrices`) 로직 최적화 (`Promise.all` 병렬 처리) | [`frontend/index.html`](index.html)<br>[`src/App.jsx`](src/App.jsx)<br>[`src/components/map/KakaoMap.jsx`](src/components/map/KakaoMap.jsx)<br>[`src/pages/ListPage.jsx`](src/pages/ListPage.jsx) | 카카오맵 및 가격 표시 개선 완료 |
| 2025-12-26 | AI | **AI 여행 비서 UI/UX 고도화**<br> - **지도 연동**: `KakaoMap` 다중 마커 지원 및 추천 숙소 위치 표시<br> - **숙소 카드(Rich UI)**: 이미지, 평점, 가격이 포함된 숙소 카드 구현 및 Carousel 레이아웃 적용<br> - **편의 기능**: 추천 질문 칩(Suggestion Chips) 추가<br> - **디자인 개선**: 가독성 향상(여백, 폰트) 및 공통 스타일(`GMarketSans`, 브랜드 컬러) 적용 | [`src/components/ai/AIRecommendationWindow.jsx`](src/components/ai/AIRecommendationWindow.jsx)<br>[`src/components/ai/AccommodationCard.jsx`](src/components/ai/AccommodationCard.jsx)<br>[`src/components/map/kakaomap.jsx`](src/components/map/kakaomap.jsx) | AI 채팅 편의성 및 시인성 강화 완료 |
| 2025-12-26 | AI | **Toss Payments 결제 시스템 연동**<br> - 결제 모달(`PaymentModal.jsx`) 구현: 상품 선택 체크박스, 총 결제 금액 계산<br> - 결제 성공/실패 페이지 구현<br> - 상세 페이지 예약하기 버튼 브랜드 컬러 적용 및 호버 효과<br> - 환경 변수(`.env`) 기반 API 키 보안 처리<br> - `App.jsx` 결제 라우트 추가 | [`src/components/payment/PaymentModal.jsx`](src/components/payment/PaymentModal.jsx)<br>[`src/pages/PaymentSuccessPage.jsx`](src/pages/PaymentSuccessPage.jsx)<br>[`src/pages/PaymentFailPage.jsx`](src/pages/PaymentFailPage.jsx)<br>[`src/pages/DetailPage.jsx`](src/pages/DetailPage.jsx)<br>[`src/App.jsx`](src/App.jsx) | Toss Payments SDK 연동 완료 |
| 2025-12-29 | AI | **리스트 페이지 UI/UX 개선**<br> - 필터 스타일 강화 (구분선, 여백)<br> - 리스트 아이템 간격 확대 (`gap-12`)<br> - 배너 섹션 교체 (`EventForm` 적용)<br> - 하트 아이콘 색상 변경 (CSS 강제 적용)<br> - 페이지네이션 확장 (10개씩 보기) | [`src/pages/ListPage.jsx`](src/pages/ListPage.jsx) | UI/UX 개선 완료 |

### 새 항목 추가 템플릿

복사/붙여넣기용 1줄:

`| YYYY-MM-DD | 이름 | 작업 내용 | 관련 파일/링크 | 비고 |`

입력 규칙:

- 날짜는 `YYYY-MM-DD` 형식으로 작성합니다. (예: `2025-12-19`)
- 담당은 실명(또는 합의된 표기)으로 통일합니다.
- 작업 내용은 한 줄 요약 + 필요 시 `<br>`로 세부 항목을 추가합니다.
- 관련 파일/링크는 가능한 범위에서 1~5개를 [`src/pages/MainPage.jsx`](src/pages/MainPage.jsx) 형태로 연결합니다.

## 기술 스택 ([`package.json`](package.json) 기반)

| 구분 | 기술 | 버전 | 비고 |
| --- | --- | --- | --- |
| 프레임워크 | React | ^19.2.0 | UI 라이브러리 |
| 렌더링 | React DOM | ^19.2.0 |  |
| 빌드/개발 서버 | Vite | ^7.2.6 |  |
| Vite 플러그인 | @vitejs/plugin-react | ^5.1.1 | React 지원 |
| 스타일링 | Tailwind CSS | ^4.1.17 |  |
| Tailwind(PostCSS) | @tailwindcss/postcss | ^4.1.17 |  |
| UI 컴포넌트 | Chakra UI | ^3.30.0 |  |
| CSS-in-JS | @emotion/react | ^11.14.0 | Chakra UI 의존 |
| 라우팅 | react-router-dom | ^7.10.0 |  |
| 라우팅(코어) | react-router | ^7.9.6 |  |
| 테마 | next-themes | ^0.4.6 | 다크/라이트 등 |
| 슬라이더 | swiper | ^12.0.3 |  |
| 캘린더 | react-day-picker | ^9.12.0 |  |
| 아이콘 | react-icons | ^5.5.0 |  |
| AI | @google/generative-ai | ^0.24.1 |  |
| 결제 | @tosspayments/payment-widget-sdk | - | Toss Payments |