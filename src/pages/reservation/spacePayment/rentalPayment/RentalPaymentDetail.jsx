import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "../rentalTossPayment/PaymentButton";
import S from "./style";

const RentalPaymentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const {
    totalPrice = 0,
    name = "",
    spaceId = "",
    rentalPeriod = [],
    location: spaceLocation = "",
    userId = "",
    customerName = "",
    customerEmail = "",
  } = state;

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
            <S.HeaderSub>대여 내용을 확인하고 결제를 진행해주세요</S.HeaderSub>
          </div>
        </S.Header>

        <S.Body>
          <S.SectionTitle>공간 정보</S.SectionTitle>
          <S.InfoGrid>
            <S.InfoItem style={{ gridColumn: "1 / -1" }}>
              <S.InfoItemLabel>공간 이름</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "15px", color: "#ffd400" }}>
                {name}
              </S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem style={{ gridColumn: "1 / -1" }}>
              <S.InfoItemLabel>위치</S.InfoItemLabel>
              <S.InfoItemValue>{spaceLocation}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>예약자</S.InfoItemLabel>
              <S.InfoItemValue>{customerName}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>이메일</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "12px" }}>
                {customerEmail}
              </S.InfoItemValue>
            </S.InfoItem>
          </S.InfoGrid>

          <S.SectionTitle>대여 일정</S.SectionTitle>
          <S.PeriodList>
            {rentalPeriod.length > 0 ? (
              rentalPeriod.map((period, index) => (
                <S.PeriodItem key={index}>
                  {new Date(period.date).toLocaleDateString()} —{" "}
                  {period.timeSlots.join(", ")}시
                </S.PeriodItem>
              ))
            ) : (
              <S.PeriodItem>일정 정보가 없습니다.</S.PeriodItem>
            )}
          </S.PeriodList>

          <S.PriceRow>
            <S.PriceLabel>최종 결제 금액</S.PriceLabel>
            <S.PriceValue>{totalPrice.toLocaleString()}원</S.PriceValue>
          </S.PriceRow>

          <PaymentButton
            productPrice={totalPrice}
            orderName={name}
            spaceId={spaceId}
            rentalPeriod={rentalPeriod}
            spaceLocation={spaceLocation}
            userId={userId}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </S.Body>
      </S.Wrap>
    </S.Container>
  );
};

export default RentalPaymentDetail;