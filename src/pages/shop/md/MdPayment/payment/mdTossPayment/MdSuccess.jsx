import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import S from "../mdPayment/style";

const MdSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const orderName = decodeURIComponent(searchParams.get("orderName"));
  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const userName = decodeURIComponent(searchParams.get("userName"));
  const userEmail = decodeURIComponent(searchParams.get("userEmail"));
  const userPhone = decodeURIComponent(searchParams.get("userPhone"));
  const address = decodeURIComponent(searchParams.get("address"));
  const deliveryMessage = decodeURIComponent(searchParams.get("deliveryMessage"));

  useEffect(() => {
    if (paymentKey && orderId && amount) confirmPayment();
  }, []);

  async function confirmPayment() {
    try {
      const response = await fetch(
        "http://localhost:8000/shop/md/payment/toss-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
            orderName,
            productId,
            quantity,
            userName,
            userEmail,
            userPhone,
            address,
            deliveryMessage,
          }),
        }
      );

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        navigate("/shop/md/payment/toss-payment/failed");
      }
    } catch (error) {
      console.error("결제 확인 중 오류 발생:", error);
      navigate("/shop/md/payment/toss-payment/failed");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <S.Container>
        <S.Loading>결제 확인 중...</S.Loading>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Card>
        <S.IconCircleSuccess>✓</S.IconCircleSuccess>
        <S.BadgeSuccess>결제 완료</S.BadgeSuccess>
        <S.Title>주문이 완료되었습니다</S.Title>
        <S.Sub>마이페이지에서 주문 내역을 확인하세요</S.Sub>
        <S.InfoCard>
          <S.InfoRow>
            <S.InfoLabel>상품</S.InfoLabel>
            <S.InfoValue style={{ color: "#ffd400" }}>{orderName}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>수량</S.InfoLabel>
            <S.InfoValue>{quantity}개</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제 금액</S.InfoLabel>
            <S.InfoValue>{Number(amount).toLocaleString()}원</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>배송지</S.InfoLabel>
            <S.InfoValue>{address}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>주문번호</S.InfoLabel>
            <S.InfoValue style={{ fontSize: "11px", color: "#555" }}>
              {orderId}
            </S.InfoValue>
          </S.InfoRow>
        </S.InfoCard>
        <S.BtnPrimary onClick={() => navigate("/mypage")}>
          마이페이지에서 확인
        </S.BtnPrimary>
        <S.BtnSecondary onClick={() => navigate("/shop/md")}>
          굿즈로 돌아가기
        </S.BtnSecondary>
      </S.Card>
    </S.Container>
  );
};

export default MdSuccess;