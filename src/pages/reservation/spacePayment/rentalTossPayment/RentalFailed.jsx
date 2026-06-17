import { useNavigate } from "react-router-dom";
import S from "../../payment/tossPayment/style";

const RentalFailed = () => {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Card>
        <S.IconCircleFail>✕</S.IconCircleFail>
        <S.BadgeFail>결제 실패</S.BadgeFail>
        <S.Title>결제에 실패했습니다</S.Title>
        <S.Sub>일시적인 오류가 발생했어요. 다시 시도해주세요.</S.Sub>
        <S.Divider />
        <S.BtnPrimary onClick={() => navigate(-1)}>
          다시 시도하기
        </S.BtnPrimary>
        <S.BtnSecondary onClick={() => navigate("/reservation")}>
          예약으로 돌아가기
        </S.BtnSecondary>
      </S.Card>
    </S.Container>
  );
};

export default RentalFailed;