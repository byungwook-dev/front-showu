import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import S from "./style";
import { useNavigate } from "react-router-dom";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const TossPayment = ({
  productPrice,
  orderName,
  showId,
  date,
  time,
  seatNumbers,
  userId,
  onPaymentSuccess,
}) => {
  const [widgets, setWidgets] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }
    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) return;
      await widgets.setAmount({ currency: "KRW", value: productPrice });
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
    }
    renderPaymentWidgets();
  }, [widgets, productPrice]);

  const handlePaymentRequest = async () => {
    try {
      const orderId = generateRandomString();

      // successUrl에 결제 데이터 포함 (Toss가 실제 paymentKey를 붙여서 리다이렉트)
      const successUrl = `${window.location.origin}/reservation/toss-payment/success?orderName=${encodeURIComponent(orderName)}&showId=${showId}&date=${date}&time=${time}&seatNumbers=${encodeURIComponent(JSON.stringify(seatNumbers))}&userId=${userId}`;
      const failUrl = `${window.location.origin}/reservation/toss-payment/failed`;
      // requestPayment 호출 후 Toss가 successUrl로 리다이렉트
      // 이 함수는 리다이렉트이므로 아래 코드는 실행되지 않음
      await widgets?.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
      });
    } catch (error) {
      console.error("결제 오류:", error);
      navigate("/reservation/toss-payment/failed");
    }
  };

  return (
    <div>
      <S.Modal>
        <div id="payment-method" />
        <div id="agreement" />
        <div className="toss-button-wrap">
          <button className="toss-button" onClick={handlePaymentRequest}>
            결제하기
          </button>
        </div>
      </S.Modal>
      <S.ModalBg />
    </div>
  );
};

export default TossPayment;