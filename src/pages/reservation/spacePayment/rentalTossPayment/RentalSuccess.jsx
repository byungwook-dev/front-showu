import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import S from "../../payment/tossPayment/style";

const RentalSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const orderName = decodeURIComponent(searchParams.get("orderName"));
  const spaceId = searchParams.get("spaceId");
  const rentalPeriod = JSON.parse(decodeURIComponent(searchParams.get("rentalPeriod")));
  const spaceLocation = decodeURIComponent(searchParams.get("spaceLocation"));
  const userId = searchParams.get("userId");

  const confirmPayment = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/reservation/rentalToss",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
            orderName,
            spaceId,
            rentalPeriod,
            spaceLocation,
            userId,
          }),
        }
      );

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        navigate("/reservation/rental-toss-payment/rental-failed");
      }
    } catch (error) {
      console.error("결제 확인 중 오류 발생:", error);
      navigate("/reservation/rental-toss-payment/rental-failed");
    } finally {
      setIsLoading(false);
    }
  }, [paymentKey, orderId, amount, orderName, spaceId, rentalPeriod, spaceLocation, userId]);

  useEffect(() => {
  if (paymentKey && orderId && amount) confirmPayment();
  }, []); // 빈 배열로 변경 → 마운트 시 한 번만 실행

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
        <S.Title>공간 대여가 완료되었습니다</S.Title>
        <S.Sub>예약 정보를 마이페이지에서 확인하세요</S.Sub>
        <S.InfoCard>
          <S.InfoRow>
            <S.InfoLabel>공간</S.InfoLabel>
            <S.InfoValue style={{ color: "#ffd400" }}>{orderName}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>위치</S.InfoLabel>
            <S.InfoValue>{spaceLocation}</S.InfoValue>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoLabel>결제 금액</S.InfoLabel>
            <S.InfoValue>{Number(amount).toLocaleString()}원</S.InfoValue>
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
        <S.BtnSecondary onClick={() => navigate("/reservation")}>
          예약 목록으로
        </S.BtnSecondary>
      </S.Card>
    </S.Container>
  );
};

export default RentalSuccess;