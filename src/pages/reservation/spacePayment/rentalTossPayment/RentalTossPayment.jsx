import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import S from "./style";
import { useNavigate } from "react-router-dom";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const RentalTossPayment = ({
  productPrice,
  orderName,
  spaceId,
  rentalPeriod,
  spaceLocation,
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

      const successUrl = `${window.location.origin}/reservation/rental-toss-payment/rental-success?orderId=${orderId}&amount=${productPrice}&orderName=${encodeURIComponent(orderName)}&spaceId=${spaceId}&rentalPeriod=${encodeURIComponent(JSON.stringify(rentalPeriod))}&spaceLocation=${encodeURIComponent(spaceLocation)}&userId=${userId}`;
      const failUrl = `${window.location.origin}/reservation/rental-toss-payment/rental-failed`;

      await widgets?.requestPayment({
        orderId,
        orderName,
        successUrl,
        failUrl,
      });
    } catch (error) {
      console.error("결제 오류:", error);
      navigate("/reservation/rental-toss-payment/rental-failed");
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

export default RentalTossPayment;