# ShowU — 예술가 지망생과 예술 팬을 위한 통합 플랫폼

> 티켓 판매, 공간 대여, 굿즈/경매 쇼핑, VOD 스트리밍, 커뮤니티를 통합한 예술 특화 플랫폼 — 프론트엔드

## 📌 핵심 구현

### 1. 좌석 선택 UI
- 10×10 그리드 기반 좌석 선택 (최대 2매)
- 예약된 좌석 실시간 조회 및 비활성화 처리
- 공연 날짜/회차 선택 → 잔여 좌석 자동 갱신

### 2. Toss Payments 결제 흐름
- `requestPayment()` 호출 후 Toss가 실제 `paymentKey`를 `successUrl`에 자동 부착
- `handlePaymentSuccess()` 직접 호출 제거 → Success 페이지에서 백엔드 검증 후 DB 저장
- 티켓 / 공간 / 경매 / 굿즈 4개 도메인 동일 흐름 적용

### 3. 결제 UI 리디자인
- 검정 배경(`#0a0a0a`) + 노란색(`#ffd400`) 테마
- 결제 상세 / 결제 완료 / 결제 실패 3개 화면 Styled-Components 분리 구조

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 18.3 |
| 상태관리 | Redux 5.0 |
| 스타일링 | Styled-Components 6.1 |
| 라우팅 | React-Router-Dom 7.0 |
| 결제 | Toss Payments SDK 2.3 |

## 📂 프로젝트 구조

```
Front_ShowU/src/
├── components/             # 공통 컴포넌트 (버튼, 인풋)
├── global/                 # 글로벌 스타일, 테마
├── hooks/                  # 커스텀 훅
├── modules/                # Redux 모듈
├── pages/
│   ├── admin/              # 관리자 페이지
│   ├── community/          # 커뮤니티 (오디션, 게시판, 댓글)
│   ├── main/               # 메인 페이지
│   ├── mypage/             # 마이페이지
│   ├── reservation/        # ✅ 담당 — 예약 도메인 전체
│   │   ├── payment/
│   │   │   ├── ticketPayment/      # 티켓 결제 상세
│   │   │   └── tossPayment/        # Toss 결제 위젯, Success/Failed
│   │   ├── performing/
│   │   │   ├── performingShow/     # 공연 목록
│   │   │   ├── seatSelection/      # 좌석 선택 (10×10 그리드)
│   │   │   └── showDetail/         # 공연 상세, 날짜/회차 선택
│   │   ├── space/
│   │   │   ├── rentalDetail/       # 공간 상세
│   │   │   ├── rentalSelection/    # 날짜/시간 선택
│   │   │   └── spaceRental/        # 공간 목록
│   │   ├── spacePayment/
│   │   │   ├── rentalPayment/      # 공간 결제 상세
│   │   │   └── rentalTossPayment/  # 공간 Toss 결제
│   │   └── ticket/
│   │       ├── openDetail/         # 티켓 오픈 상세
│   │       └── ticketOpen/         # 티켓 오픈 목록
│   ├── shop/
│   │   ├── auction/
│   │   │   ├── AuctionDetail/      # 경매 상세 (팀원)
│   │   │   ├── AuctionMain/        # 경매 메인 (팀원)
│   │   │   └── AuctionPayment/     # ✅ 담당 — 경매 결제 파트
│   │   │       └── payment/
│   │   │           ├── auctionPayment/
│   │   │           └── auctionTossPayment/
│   │   └── md/
│   │       ├── MdMain/             # 굿즈 메인 (팀원)
│   │       ├── MdDetail/           # 굿즈 상세 (팀원)
│   │       └── MdPayment/          # ✅ 담당 — 굿즈 결제 파트
│   │           └── payment/
│   │               ├── mdPayment/
│   │               └── mdTossPayment/
│   └── vod/                # VOD 스트리밍
└── routes/
    └── router.js
```

## ⚙️ 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
yarn start
```

> 백엔드 서버(`nodemon app`)가 먼저 실행되어 있어야 합니다.

## 🔑 환경변수

```env
REACT_APP_API_URL=http://localhost:8000
```

## 🔗 관련 링크

- 백엔드 레포지토리: [back-showu](https://github.com/byungwook-dev/back-showu)
- 포트폴리오: https://app.notion.com/p/by-Byungwook-dev-36505e05fc2f80cd831cd45ef9059112
