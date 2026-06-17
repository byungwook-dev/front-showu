import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PaymentButton from "../auctionTossPayment/PaymentButton";
import S from "./style";

const AuctionPaymentDetail = () => {
  const location = useLocation();
  const state = location.state || {};

  const {
    userName = "",
    userEmail = "",
    userPhone = "",
    auctionProduct = {},
    quantity = 1,
    totalAmount = auctionProduct.finalPrice || 0,
    address = "",
    deliveryMessage = "",
  } = state;

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser ? currentUser._id : null;
  const name = auctionProduct.auctionName;
  const productId = auctionProduct._id;

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
            <S.HeaderSub>주문 내용을 확인하고 결제를 진행해주세요</S.HeaderSub>
          </div>
        </S.Header>

        <S.Body>
          <S.SectionTitle>상품 정보</S.SectionTitle>
          <S.InfoGrid>
            <S.InfoItem style={{ gridColumn: "1 / -1" }}>
              <S.InfoItemLabel>상품 이름</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "15px", color: "#ffd400" }}>
                {name}
              </S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>수량</S.InfoItemLabel>
              <S.InfoItemValue>{quantity}개</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>주문자</S.InfoItemLabel>
              <S.InfoItemValue>{userName}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>이메일</S.InfoItemLabel>
              <S.InfoItemValue style={{ fontSize: "12px" }}>{userEmail}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoItemLabel>휴대전화</S.InfoItemLabel>
              <S.InfoItemValue>{userPhone}</S.InfoItemValue>
            </S.InfoItem>
            <S.InfoItem style={{ gridColumn: "1 / -1" }}>
              <S.InfoItemLabel>배송지</S.InfoItemLabel>
              <S.InfoItemValue>{address}</S.InfoItemValue>
            </S.InfoItem>
            {deliveryMessage && (
              <S.InfoItem style={{ gridColumn: "1 / -1" }}>
                <S.InfoItemLabel>배송 메시지</S.InfoItemLabel>
                <S.InfoItemValue>{deliveryMessage}</S.InfoItemValue>
              </S.InfoItem>
            )}
          </S.InfoGrid>

          <S.PriceRow>
            <S.PriceLabel>최종 결제 금액</S.PriceLabel>
            <S.PriceValue>{totalAmount.toLocaleString()}원</S.PriceValue>
          </S.PriceRow>

          <PaymentButton
            productPrice={totalAmount}
            orderName={name}
            productId={productId}
            quantity={quantity}
            userName={userName}
            userEmail={userEmail}
            userPhone={userPhone}
            address={address}
            deliveryMessage={deliveryMessage}
            userId={userId}
          />
        </S.Body>
      </S.Wrap>
    </S.Container>
  );
};

export default AuctionPaymentDetail;