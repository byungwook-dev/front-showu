# ShowU — 예술가 지망생과 예술 팬을 위한 통합 플랫폼

> **예술가 지망생의 모든 필요와 예술 팬의 발견을 연결하는 생태계**
>
> 티켓 판매, 공간 대여, 커뮤니티, 멘토링을 통합한 예술 특화 플랫폼

---

## 📌 프로젝트 개요

### 서비스 개요

**ShowU**는 예술가 지망생(배우, 가수, 뮤지컬 배우 등)을 중심으로 설계된 **예술 생태계 플랫폼**입니다.

- 🎤 **티켓 판매** — 공연 예매, 좌석 선택, 토스페이먼츠 결제
- 🏢 **공간 대여** — 리허설실, 공연장 등 시간/날짜 기반 예약
- 💬 **커뮤니티** — 관람후기, 기대평, 출연진 정보
- ❤️ **찜하기** — 공연/공간 저장, 마이페이지 관리
- 📊 **예약 관리** — 예약 내역, 결제 이력, 취소 규정

### 기술적 특징

- **동시성 제어** — 시간 충돌 방지 로직 (date-fns 활용)
- **실시간 가격 계산** — 시간/날짜/좌석 기반 동적 가격
- **예약 제약** — 1인당 최대 2매 (좌석), 시간대 중복 방지
- **토스페이먼츠 연동** — 실결제 API 및 검증 흐름
- **JWT 인증** — 댓글, 찜하기 등 사용자별 권한 관리

---

## 🛠️ 기술 스택

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![date-fns](https://img.shields.io/badge/date--fns-770000?style=flat-square)
![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=flat-square)

### Database & Payment
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Toss Payments](https://img.shields.io/badge/Toss%20Payments-0066CC?style=flat-square)

---

## 🎯 핵심 기능 (당신의 구현)

### 1️⃣ 🎟️ 티켓 판매 시스템

#### 공연 상세 페이지 (ShowDetail.jsx)
- **캘린더 기반 날짜 선택** (date-fns)
- **시간대 선택** (평일/주말 14시, 20시)
- **잔여 좌석 실시간 조회** (R석, S석 구분)
- **출연진 정보** (배우 사진, 이름)
- **탭 시스템** (상세정보, 관람후기, 기대평, 장소정보)

**핵심 구현:**
```javascript
// 시간대별 잔여 좌석 조회
const handleTimeChange = async (time) => {
  const response = await fetch(
    `/reservation/availableSeats?showId=${show._id}&date=${formattedDate}&time=${time}`
  );
  const availableSeatsData = await response.json();
  
  // R석, S석 필터링 (row > 3 = R석, row <= 3 = S석)
  const RSeats = availableSeatsData.filter(
    (seat) => parseInt(seat.split("-")[0]) > 3
  ).length;
  const SSeats = availableSeatsData.filter(
    (seat) => parseInt(seat.split("-")[0]) <= 3
  ).length;
  
  setAvailableSeats({
    R: RSeats > 0 ? `${RSeats}석` : "매진",
    S: SSeats > 0 ? `${SSeats}석` : "매진",
  });
};
```

#### 좌석 선택 페이지 (SeatSelection.jsx)
- **10×10 좌석 그리드** (100개 좌석)
- **예약된 좌석 표시** (회색으로 비활성화)
- **1인당 최대 2매 제한**
- **실시간 가격 계산** (R석/S석 차등 요금)

**핵심 구현:**
```javascript
// 1인당 최대 2매 제한
const totalReservedSeats = existingReservations.reduce(
  (total, reservation) => total + reservation.seatNumbers.length,
  0
);

if (totalReservedSeats + seatNumbers.length > 2) {
  return res.status(400).json({ 
    message: "한 아이디당 최대 2매까지 예매 가능합니다!" 
  });
}
```

#### 결제 시스템
- **TicketPaymentDetail.jsx** — 결제 정보 확인
- **TossPayment.jsx** — 토스페이먼츠 SDK 연동
- **Success/Failed.jsx** — 결제 완료/실패 처리

---

### 2️⃣ 🏢 공간 대여 시스템 (당신의 핵심 구현!)

#### 공간 목록 페이지 (SpaceRental.jsx)
- 모든 공간 리스트 조회 (4열 그리드)
- 검색 기능
- 이미지 클릭 → 상세 페이지

#### 공간 상세 페이지 (RentalDetail.jsx)
- 공간 정보 (위치, 시설, 편의시설)
- 추가 이미지 (1개 메인 + 4개 추가)
- 이미지 확대 모달
- 찜하기 기능
- 예약하기 버튼

#### 날짜/시간 선택 페이지 (RentalSelection.jsx) **【당신의 핵심】**

**시간 충돌 방지 로직:**
```javascript
// 선택한 날짜에 대한 예약된 시간 조회
const fetchReservedTimes = async (date) => {
  const formattedDate = encodeURIComponent(date.toISOString());
  const response = await fetch(
    `/reservation/reservedTimes?spaceId=${spaceId}&date=${formattedDate}`
  );
  const reservedTimes = await response.json();
  
  // 예약된 시간은 UI에서 비활성화
  const isReserved = reservedTimes.some(
    (t) => t.getHours() === time.getHours() && t.getDate() === time.getDate()
  );
};
```

**동적 가격 계산:**
```javascript
// 시간 단위 선택 시
if (selectedTimes.length === 15) {
  // 종일권 (15시간 = 8시~22시)
  setTotalPrice(pricePerDay);
} else {
  // 시간 단위 가격
  setTotalPrice(selectedTimes.length * pricePerHour);
}

// 날짜 범위 선택 시
setTotalPrice(
  (differenceInCalendarDays(selectedEndDate, selectedStartDate) + 1) * pricePerDay
);
```

**캘린더 네비게이션:**
- 이전/다음 월 이동
- 과거 날짜 선택 방지 (내일 이후만 선택 가능)
- 선택된 날짜 하이라이트

**시간대 선택:**
- 8시~22시 (15개 타임슬롯)
- 예약된 시간은 회색으로 표시 (비활성화)
- 종일권 옵션 (일괄 선택)

#### 공간 결제 페이지 (RentalPaymentDetail.jsx)
- 예약 정보 표시 (공간명, 가격, 대여 기간)
- PaymentButton 컴포넌트
- RentalTossPayment로 결제 진행

---

### 3️⃣ 💳 결제 시스템

#### 토스페이먼츠 연동 (RentalTossPayment.jsx, TossPayment.jsx)

**결제 흐름:**
```javascript
// 1. 결제 위젯 로드
const tossPayments = await loadTossPayments(clientKey);
const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

// 2. 금액 설정
const amount = { currency: "KRW", value: productPrice };
await widgets.setAmount(amount);

// 3. 결제 위젯 렌더링
await Promise.all([
  widgets.renderPaymentMethods({
    selector: "#payment-method",
    variantKey: "DEFAULT",
  }),
  widgets.renderAgreement({
    selector: "#agreement",
    variantKey: "AGREEMENT",
  }),
]);

// 4. 결제 요청
await widgets.requestPayment({
  orderId: generateRandomString(),
  orderName: productName,
  successUrl: successUrl,
  failUrl: failUrl,
});
```

**결제 데이터 저장:**
```javascript
// RentalPaymentSchema / TicketPaymentSchema
const payment = new RentalPayment({
  spaceId, userId, orderId, paymentKey,
  amount, orderName, spaceLocation,
  rentalPeriod, status: "success"
});
await payment.save();
```

---

### 4️⃣ 💬 커뮤니티 기능

#### 댓글 시스템 (ShowDetail.jsx, commentController.js)

**CRUD 구현:**
```javascript
// POST: 댓글 추가
const newComment = new Comment({
  user: userId,
  showId: id,
  text: newComment,
  createdAt: getCurrentTime(),
  updatedAt: getCurrentTime(),
});
await newComment.save();
await Show.findByIdAndUpdate(id, { $push: { comments: newComment._id } });

// PUT: 댓글 수정
comment.text = text;
comment.updatedAt = getCurrentTime();
await comment.save();

// DELETE: 댓글 삭제
await comment.deleteOne();
```

**JWT 인증:**
```javascript
// commentRouter.js
commentRouter.post(
  "/performingShows/:id/comments",
  passport.authenticate("jwt", { session: false }),
  addComment
);
```

#### 찜하기 기능 (likeController.js)

**찜 토글:**
```javascript
// 찜 상태 확인
const like = await Like.findOne({ user: userId, [`${type}Id`]: id });

if (like) {
  // 찜 취소
  await Like.deleteOne({ _id: like._id });
} else {
  // 찜 추가
  const newLike = new Like({
    user: userId,
    [`${type}Id`]: id,
  });
  await newLike.save();
}
```

**다중 타입 지원** (show, space):
```javascript
// 공연과 공간 모두 찜 가능
likeRouter.post("/performingShows/:id/likes", toggleLike);
likeRouter.post("/spaces/:id/likes", toggleLike);
```

---

## 🗄️ 데이터베이스 스키마

### Rental (공간 대여)
```javascript
{
  spaceId: ObjectId,          // 공간 ID
  name: String,               // 공간명
  location: String,           // 위치
  rentalPeriod: [{            // 대여기간
    date: Date,
    timeSlots: [Number]       // 8-22시 타임슬롯
  }],
  img: String,
  userId: ObjectId,           // 예약자
  createdAt: String
}
```

### Seat (좌석 예약)
```javascript
{
  showId: ObjectId,           // 공연 ID
  date: Date,
  time: String,               // 공연 시간
  seatNumbers: [String],      // ["1-1", "1-2"] 형태
  userId: ObjectId,           // 예약자
  createdAt: String
}
```

### RentalPayment / TicketPayment
```javascript
{
  spaceId/showId: ObjectId,
  userId: ObjectId,
  orderId: String,            // 토스페이먼츠 주문 ID
  paymentKey: String,         // 결제 키
  amount: Number,             // 결제 금액
  orderName: String,
  status: String,             // "success", "failed"
  createdAt: String
}
```

### Comment
```javascript
{
  user: ObjectId,             // 댓글 작성자
  showId: ObjectId,           // 공연 ID
  text: String,               // 댓글 내용 (1000자 제한)
  createdAt: String,
  updatedAt: String
}
```

### Like
```javascript
{
  user: ObjectId,
  spaceId: ObjectId | null,   // 공간 찜
  showId: ObjectId | null,    // 공연 찜
  createdAt: String
}
```

---

## ⚙️ 아키텍처

### Frontend 계층 구조

```
Reservation (메인)
├── TicketOpen / PerformingShow (상품 목록)
│   └── OpenDetail / ShowDetail (상세 페이지)
│       └── SeatSelection (좌석 선택)
│           └── TicketPaymentDetail (결제)
│
└── SpaceRental (공간 목록)
    └── RentalDetail (상세 페이지)
        └── RentalSelection (날짜/시간 선택)
            └── RentalPaymentDetail (결제)
```

### Backend API 구조

```
/reservation
├── /ticketEvents/:id (GET)     # 티켓 이벤트 조회
├── /performingShows/:id (GET)  # 공연 상세 조회
├── /spaces/:id (GET)           # 공간 상세 조회
├── /reserve (POST)             # 좌석 예약
├── /reservedSeats (GET)        # 예약된 좌석 조회
├── /availableSeats (GET)       # 잔여 좌석 조회
├── /reservations (POST)        # 공간 예약 생성
├── /reservedTimes (GET)        # 예약된 시간 조회
├── /availableTimes (GET)       # 가능한 시간 조회
├── /toss (POST)                # 티켓 결제
├── /rentalToss (POST)          # 공간 결제
├── /performingShows/:id/likes (POST/GET) # 찜하기
├── /spaces/:id/likes (POST/GET)
├── /performingShows/:id/comments (POST/PUT/DELETE)
```

---

## 🔧 기술적 구현 세부사항

### 1. 시간 충돌 방지 (date-fns 활용)

**프론트엔드 (RentalSelection.jsx):**
```javascript
import {
  isSameDay, isSameHour, isBefore, addDays, 
  startOfDay, differenceInCalendarDays
} from "date-fns";

// 날짜 선택 시 예약된 시간 조회
const handleDateChange = async (date) => {
  const reservedTimes = await fetchReservedTimes(date);
  setReservedTimes(reservedTimes);
};

// 시간 클릭 시 중복 체크
const handleTimeClick = (time) => {
  const isReserved = reservedTimes.some(
    (t) => isSameHour(t, time)
  );
  if (isReserved) return; // 예약된 시간은 선택 불가
};
```

**백엔드 (rentalController.js):**
```javascript
// 중복 예약 확인
for (let i = 0; i < parsedRentalPeriod.length; i++) {
  const period = parsedRentalPeriod[i];
  const existingReservations = await Rental.find({
    spaceId,
    "rentalPeriod.date": period.date,
  });

  const conflictingSlots = [];
  existingReservations.forEach((rental) => {
    rental.rentalPeriod.forEach((existingPeriod) => {
      if (isSameDay(new Date(existingPeriod.date), new Date(period.date))) {
        period.timeSlots.forEach((slot) => {
          if (existingPeriod.timeSlots.includes(slot)) {
            conflictingSlots.push(slot);
          }
        });
      }
    });
  });

  if (conflictingSlots.length > 0) {
    return res.status(400).json({
      message: `이미 예약된 시간대입니다. 겹치는 시간대: ${conflictingSlots.join(", ")}`
    });
  }
}
```

### 2. 좌석 예약 (1인당 최대 2매)

**프론트엔드 (SeatSelection.jsx):**
```javascript
// 최대 2개 좌석만 선택 가능
const handleSeatClick = (seat) => {
  const isSelected = selectedSeats.some(
    (selectedSeat) => 
      selectedSeat.row === seat.row && selectedSeat.col === seat.col
  );

  if (isSelected) {
    // 이미 선택된 좌석이면 제거
    setSelectedSeats(selectedSeats.filter(...));
  } else if (selectedSeats.length < 2) {
    // 최대 2개까지만 추가 가능
    setSelectedSeats([...selectedSeats, seat]);
  }
};
```

**백엔드 (seatController.js):**
```javascript
// 1인당 최대 2매 제한
const existingReservations = await Seat.find({
  showId, date, time, userId
});

const totalReservedSeats = existingReservations.reduce(
  (total, reservation) => total + reservation.seatNumbers.length,
  0
);

if (totalReservedSeats + seatNumbers.length > 2) {
  return res.status(400).json({ 
    message: "한 아이디당 최대 2매까지 예매 가능합니다!" 
  });
}
```

### 3. 실시간 가격 계산

**시간/날짜 기반 동적 가격:**
```javascript
// 시간 단위
if (selectedTimes.length === 15) {
  setTotalPrice(pricePerDay); // 종일권
} else {
  setTotalPrice(selectedTimes.length * pricePerHour);
}

// 날짜 범위
const days = differenceInCalendarDays(selectedEndDate, selectedStartDate) + 1;
setTotalPrice(days * pricePerDay);

// 좌석별 차등 요금
const totalPrice = selectedSeats.reduce(
  (total, seat) => total + parseInt(seat.price.replace(/,/g, ""), 10),
  0
);
```

### 4. Redux를 통한 사용자 상태 관리

```javascript
// Redux Store
const { currentUser } = useSelector((state) => state.user);

// 댓글 작성 시 사용자 ID 포함
const response = await fetch(`/reservation/performingShows/${id}/comments`, {
  method: "POST",
  body: JSON.stringify({ 
    userId: currentUser._id, 
    text: newComment 
  }),
});
```

---

## 🐛 트러블슈팅

### 문제 1: 예약된 시간대 로드 후 UI 업데이트 지연

**증상:**
- 날짜 선택 후 시간대 버튼이 로드되지 않음
- `showPrices` 상태가 업데이트되지 않음

**원인:**
- `fetchReservedTimes()`가 비동기인데 동기적으로 처리함
- `setReservedTimes()` 후 바로 `renderTimeButtons()`를 호출

**해결:**
```javascript
// useEffect에서 예약된 시간 조회
useEffect(() => {
  const fetchReservedTimes = async (date) => {
    const response = await fetch(
      `/reservation/reservedTimes?spaceId=${spaceId}&date=${formattedDate}`
    );
    const reservedTimes = await response.json();
    setReservedTimes(reservedTimes);
  };

  if (selectedStartDate && !selectedEndDate) {
    fetchReservedTimes(selectedStartDate);
  }
}, [selectedStartDate]);
```

### 문제 2: 예약 데이터 전달 시 URL 인코딩 누락

**증상:**
- 결제 완료 후 리다이렉션할 때 데이터 손실
- 특수문자 포함된 데이터가 깨짐

**원인:**
- URL 파라미터에 JSON 문자열을 직접 전달
- `rentalPeriod`가 배열이라 파싱 실패

**해결:**
```javascript
// 데이터 인코딩
const successUrl = `${window.location.origin}/success?` +
  `rentalPeriod=${encodeURIComponent(JSON.stringify(rentalPeriod))}`;

// 데이터 디코딩
const rentalPeriod = JSON.parse(
  decodeURIComponent(searchParams.get("rentalPeriod"))
);
```

### 문제 3: 좌석 예약 시 동시성 문제

**증상:**
- 여러 사용자가 동시에 같은 좌석 예약
- DB에 중복 예약 데이터 저장

**원인:**
- 좌석 조회 후 예약 생성 사이에 경쟁 조건 발생
- MongoDB 트랜잭션 미사용

**해결:**
```javascript
// 백엔드에서 재확인
const existingReservations = await Seat.find({
  showId, date, time,
  seatNumbers: { $in: seatNumbers }
});

if (existingReservations.length > 0) {
  return res.status(400).json({ 
    message: "다른 사용자가 이미 예약한 좌석입니다." 
  });
}
```
---

## 📚 API 문서

### 티켓 예매 API

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/reservation/ticketEvents` | 모든 오픈 예정 티켓 조회 |
| GET | `/reservation/ticketEvents/:id` | 특정 티켓 이벤트 조회 |
| GET | `/reservation/performingShows` | 모든 공연 조회 |
| GET | `/reservation/performingShows/:id` | 공연 상세 조회 |
| POST | `/reservation/reserve` | 좌석 예약 생성 |
| GET | `/reservation/reservedSeats` | 예약된 좌석 조회 |
| GET | `/reservation/availableSeats` | 잔여 좌석 조회 |
| POST | `/reservation/toss` | 티켓 결제 (토스페이먼츠) |

### 공간 대여 API

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/reservation/spaces` | 모든 공간 조회 |
| GET | `/reservation/spaces/:id` | 공간 상세 조회 |
| POST | `/reservation/reservations` | 공간 예약 생성 |
| GET | `/reservation/reservedTimes` | 예약된 시간 조회 |
| GET | `/reservation/availableTimes` | 가능한 시간 조회 |
| POST | `/reservation/rentalToss` | 공간 결제 (토스페이먼츠) |

### 커뮤니티 API

| 메서드 | 엔드포인트 | 설명 | 인증 |
|--------|-----------|------|------|
| POST | `/reservation/performingShows/:id/comments` | 댓글 작성 | JWT |
| PUT | `/reservation/performingShows/:id/comments/:commentId` | 댓글 수정 | JWT |
| DELETE | `/reservation/performingShows/:id/comments/:commentId` | 댓글 삭제 | JWT |
| POST | `/reservation/performingShows/:id/likes` | 공연 찜 토글 | JWT |
| GET | `/reservation/performingShows/:id/likeStatus` | 공연 찜 상태 확인 | JWT |
| POST | `/reservation/spaces/:id/likes` | 공간 찜 토글 | JWT |
| GET | `/reservation/spaces/:id/likeStatus` | 공간 찜 상태 확인 | JWT |

---

## 💡 배운 점 / 회고

### 기술적 학습

1. **date-fns 라이브러리의 강력함**
   - `isSameDay`, `isSameHour`로 날짜/시간 비교 간편화
   - 타임존 처리의 복잡성 이해

2. **동시성 제어의 중요성**
   - 좌석/시간 중복 예약 방지 로직 구현
   - 프론트엔드와 백엔드 이중 검증의 필요성

3. **결제 시스템 안전성**
   - 토스페이먼츠 SDK 연동
   - 결제 검증 및 데이터 저장 흐름

4. **MongoDB 설계**
   - 중첩 스키마 활용 (rentalPeriod 배열)
   - 참조(ref) vs 임베딩의 트레이드오프

5. **Redux를 통한 상태 관리**
   - 사용자 정보 전역 관리
   - 댓글/찜 기능에서 사용자별 권한 제어

### 팀 협업 (풀스택 개발)

- 프론트엔드와 백엔드의 데이터 흐름 이해
- API 설계 및 요청/응답 구조
- 에러 처리 및 유효성 검증

### 향후 개선점

- [ ] **WebSocket 실시간 예약** — 다른 사용자의 예약 상황 실시간 반영
- [ ] **Redis 캐싱** — 잔여 좌석/가용 시간대 캐싱
- [ ] **좌석 좌표 기반 UI** — 좌석 배치도 시각화
- [ ] **결제 취소 기능** — 예매/취소 규정 자동 처리
- [ ] **이메일 알림** — 예약 완료, 공연 임박 알림
- [ ] **모바일 반응형** — 스마트폰 예매 최적화
- [ ] **검색 필터** — 지역별, 장르별, 가격대별 필터링
- [ ] **리뷰 별점** — 공연/공간 평점 시스템

---

## 📊 프로젝트 통계

| 항목 | 수치 |
|------|------|
| 프론트엔드 컴포넌트 | 14개 |
| 백엔드 컨트롤러 | 11개 |
| MongoDB 스키마 | 12개 |
| Express 라우터 | 8개 |
| API 엔드포인트 | 25개+ |
| 예약 시간대 | 15개 (8시~22시) |
| 최대 좌석 수 | 100개 (10×10) |
| 결제 시스템 | 토스페이먼츠 |

---

## 관련 링크 및 이메일

- GitHub Frontend: [byungwook-dev/front-showu](https://github.com/byungwook-dev/front-showu)
- GitHub Backend: [byungwook-dev/back-showu](https://github.com/byungwook-dev/back-showu)
- Email: byungwook.dev@gmail.com

---

> ShowU는 예술가 지망생의 꿈과 예술 팬의 열정을 연결하는 플랫폼입니다.
> 
> 시간 충돌 방지, 1인당 최대 2매 제한, 실시간 가격 계산 등 **복잡한 예약 시스템**을 구현하며 
> **풀스택 개발의 깊이**를 경험했습니다.
