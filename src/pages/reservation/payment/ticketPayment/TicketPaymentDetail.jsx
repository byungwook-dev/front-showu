import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "../tossPayment/PaymentButton";
import S from "./style";

const TicketPaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  if (!state) {
    navigate("/");
    return null;
  }

  const {
    productPrice,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
    customerName,
    customerEmail,
  } = state;

  console.log("TicketPaymentDetail 데이터:", {
    productPrice,
    orderName,
    showId,
    date,
    time,
    seatNumbers,
    userId,
  });

  const handlePaymentSuccess = () => {
    navigate("/reservation/payment/success");
  };

  return (
    <S.Container>
      <S.Wrap>
        <S.Header>
          <S.HeaderIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd400" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </S.HeaderIcon>
          <div>
            <S.HeaderTitle>결제 정보 확인</S.HeaderTitle>
            <S.HeaderSub>예매 내용을 확인하고 결제를 진행해주세요</S.HeaderSub>
          </div>
        </S.Header>

        <S.Body>
          <S.SectionTitle>공연 정보</S.SectionTitle>
          <S.InfoGrid>
            <S.InfoItem style={{ gridColumn: "1 / -1" }}>
              <S.InfoItemLabel>공연 이름</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "15px", color: "#ffd400" }}>
                {orderName}
              </S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>공연 일자</S.InfoItemLabel>
              <S.InfoItemValue>{new Date(date).toLocaleDateString()}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>시간</S.InfoItemLabel>
              <S.InfoItemValue>{time}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>예매자</S.InfoItemLabel>
              <S.InfoItemValue>{customerName}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>이메일</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "12px" }}>{customerEmail}</S.InfoItemValue>
            </S.InfoItem>
          </S.InfoGrid>

          <S.SectionTitle>선택 좌석</S.SectionTitle>
          <S.SeatTags>
            {seatNumbers.map((seat) => (
              <S.SeatTag key={seat}>{seat}</S.SeatTag>
            ))}
          </S.SeatTags>

          <S.PriceRow>
            <S.PriceLabel>최종 결제 금액</S.PriceLabel>
            <S.PriceValue>{productPrice.toLocaleString()}원</S.PriceValue>
          </S.PriceRow>

          <PaymentButton
            productPrice={productPrice}
            orderName={orderName}
            showId={showId}
            date={date}
            time={time}
            seatNumbers={seatNumbers}
            userId={userId}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </S.Body>
      </S.Wrap>
    </S.Container>
  );
};

export default TicketPaymentDetail;