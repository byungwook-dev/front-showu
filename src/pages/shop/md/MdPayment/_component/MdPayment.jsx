import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import S from "./stylePayment";
import Postcode from "./PostCode";

const MdPayment = () => {
  const { state } = useLocation();
  const { product, quantity, name } = state || { product: null, quantity: 0, name: null };
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // Redux에서 currentUser 가져오기
  const [userName, setUserName] = useState(currentUser?.name || "");
  const [userEmail, setUserEmail] = useState("");
  const [userEmailDomain, setUserEmailDomain] = useState("");
  const [userPhone1, setUserPhone1] = useState("");
  const [userPhone2, setUserPhone2] = useState("");
  const [userPhone3, setUserPhone3] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [userDetailAddress, setUserDetailAddress] = useState("");
  const [userPostcode, setUserPostcode] = useState("");
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleAddressSelect = (zonecode, address) => {
    setUserPostcode(zonecode);
    setUserAddress(address);
    setIsPostcodeOpen(false);
  };

  const handleBackButton = () => {
    const confirmLeave = window.confirm("작성하신 정보가 모두 사라집니다. 취소하시겠습니까?");
    if (confirmLeave) {
      navigate(`/shop/md`);
    }
  };

  // 배송비 계산
  let productTotal = product ? product.price * quantity : 0;
  const deliveryFee = productTotal >= 70000 ? 0 : 3000;
  const discountAmount = 0;
  const totalAmount = productTotal + deliveryFee - discountAmount;

  const validateField = (field, value) => {
    return value.trim() === "";
  };

  const handleBlur = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("jwtToken");

    const emailInput = `${userEmail}@${userEmailDomain}`;

    const paymentData = {
      productName: product._id,
      price: product.price,
      quantity,
      image: product.image,
      name: userName,
      address: `${userAddress} ${userDetailAddress}`,
      totalAmount,
      deliveryFee,
      discount: 0,
      userEmail: emailInput,
      userPhone: `${userPhone1}-${userPhone2}-${userPhone3}`,
      deliveryMessage: selectedMessage,
      userId: currentUser?._id, // Redux에서 가져온 userId 추가
    };

    console.log("Payment Data:", paymentData);

    try {
      const response = await fetch("http://localhost:8000/shop/md/payment/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "결제 생성 중 오류 발생");
      }

      // alert("결제가 완료되었습니다!");

      navigate("/shop/md/payment/toss", {
        state: {
          userName,
          userEmail: emailInput,
          userPhone: `${userPhone1}-${userPhone2}-${userPhone3}`,
          product,
          quantity,
          name: product.mdName,
          totalAmount,
          address: `${userAddress} ${userDetailAddress}`,
          deliveryMessage: selectedMessage,
          userId: currentUser?._id, // Redux에서 가져온 userId 추가
        },
      });
    } catch (error) {
      console.error("결제 생성 중 오류 발생:", error);
      alert(error.message);
    }
  };

  return (
    <S.PaymentWrapper>
      <S.PaymentTitle>
        <h1>주문 / 결제</h1>
      </S.PaymentTitle>

      <S.PaymentProduct>
        <S.Info>주문 상품</S.Info>

        <S.Head>
          <S.Left></S.Left>
          <S.Left>
            <S.HeadItem>상품명</S.HeadItem>
          </S.Left>
          <S.Center>
            <S.HeadItem>수량</S.HeadItem>
          </S.Center>
          <S.Right>
            <S.HeadItem>금액</S.HeadItem>
          </S.Right>
        </S.Head>

        <S.PaymentList>
          {product && (
            <S.PaymentItem>
              <S.ProductImage
                src={product.image || "/images/shop/md/md1.jpg"}
                alt="주문 상품"
              />
              <S.Left>{name}</S.Left>
              <S.Center>{quantity}</S.Center>
              <S.Right>
                {(product.price * quantity).toLocaleString()} 원
              </S.Right>
            </S.PaymentItem>
          )}
        </S.PaymentList>

        <S.TotalAmount>
          총 상품 금액 = {(product.price * quantity).toLocaleString()} 원 (
          {quantity}개)
        </S.TotalAmount>
      </S.PaymentProduct>

      <S.InfoWrapper>
        <S.Info>주문 정보</S.Info>

        <S.OrderInfo>
          <p>주문자</p>
          <S.InputName>
            <input
              type="text"
              id="name"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => handleBlur("userName", userName)}
            />
            {errors.userName && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
          </S.InputName>
        </S.OrderInfo>

        <S.OrderInfo>
          <p>이메일</p>
          <S.EmailWrapper>
            <S.InputEmail>
              <input
                type="text"
                className="email-input"
                id="email"
                placeholder="이메일 입력"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onBlur={() => handleBlur("userEmail", userEmail)}
              />
              <span>@</span>
              <input
                type="text"
                className="email-domain-input"
                id="email-domain"
                placeholder="도메인 입력"
                value={userEmailDomain}
                onChange={(e) => setUserEmailDomain(e.target.value)}
                onBlur={() => handleBlur("userEmailDomain", userEmailDomain)}
              />
            </S.InputEmail>
            {errors.userEmail && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
          </S.EmailWrapper>
        </S.OrderInfo>

        <S.OrderInfo>
          <p>휴대전화</p>
          <S.InputPhone>
            <S.PhoneWrapper>
              <input
                type="text"
                maxLength="3"
                className="phone-input"
                value={userPhone1}
                onChange={(e) => setUserPhone1(e.target.value)}
                onBlur={() => handleBlur("userPhone1", userPhone1)}
              />
              {errors.userPhone1 && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
            </S.PhoneWrapper>
            <span>-</span>
            <S.PhoneWrapper>
              <input
                type="text"
                maxLength="4"
                className="phone-input"
                value={userPhone2}
                onChange={(e) => setUserPhone2(e.target.value)}
                onBlur={() => handleBlur("userPhone2", userPhone2)}
              />
              {errors.userPhone2 && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
            </S.PhoneWrapper>
            <span>-</span>
            <S.PhoneWrapper>
              <input
                type="text"
                maxLength="4"
                className="phone-input"
                value={userPhone3}
                onChange={(e) => setUserPhone3(e.target.value)}
                onBlur={() => handleBlur("userPhone3", userPhone3)}
              />
              {errors.userPhone3 && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
            </S.PhoneWrapper>
          </S.InputPhone>
        </S.OrderInfo>

        <S.Info>배송지</S.Info>
        <S.OrderInfo>
          <p>주문자</p>
          <S.InputName>
            <input
              type="text"
              id="name"
              placeholder="이름"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => handleBlur("userName", userName)}
            />
            {errors.userName && <S.ErrorText>필수 항목입니다.</S.ErrorText>}
          </S.InputName>
        </S.OrderInfo>

        <S.OrderInfo>
          <p>주소</p>
          <S.InputAddress>
            <input
              type="text"
              value={userPostcode}
              placeholder="우편번호"
              readOnly
              onClick={() => setIsPostcodeOpen(true)}
            />
            <input
              type="text"
              value={userAddress}
              placeholder="기본 주소"
              readOnly
            />
            <input
              type="text"
              placeholder="나머지 주소(선택)"
              value={userDetailAddress}
              onChange={(e) => setUserDetailAddress(e.target.value)}
            />
          </S.InputAddress>
        </S.OrderInfo>

        {isPostcodeOpen && (
          <S.PostcodePopup>
            <Postcode onComplete={handleAddressSelect} />
            <S.CloseButton onClick={() => setIsPostcodeOpen(false)}>
              닫기
            </S.CloseButton>
          </S.PostcodePopup>
        )}

        <S.OrderInfo>
          <p>배송 메시지</p>
          <S.InputMessage>
            <input
              type="text"
              className="delivery-message-input"
              id="delivery-message"
              placeholder="배송 메시지를 입력해주세요."
              value={selectedMessage}
              onChange={(e) => setSelectedMessage(e.target.value)}
              onBlur={() => handleBlur("selectedMessage", selectedMessage)}
            />
          </S.InputMessage>
        </S.OrderInfo>
      </S.InfoWrapper>

      <S.PayWrapper>
        <S.Info>결제 금액</S.Info>
        <S.OrderInfoWrapper>
          <S.OrderInfo>
            <p>상품 금액</p>
          </S.OrderInfo>
          <S.Price>{productTotal.toLocaleString()} 원</S.Price>
        </S.OrderInfoWrapper>
        <S.OrderInfoWrapper>
          <S.OrderInfo>
            <p>배송비</p>
          </S.OrderInfo>
          <S.Price>{deliveryFee.toLocaleString()} 원</S.Price>
        </S.OrderInfoWrapper>
        <S.OrderInfoWrapper>
          <S.OrderInfo>
            <p>할인 금액</p>
          </S.OrderInfo>
          <S.Price>{discountAmount.toLocaleString()} 원</S.Price>
        </S.OrderInfoWrapper>
      </S.PayWrapper>

      <S.OrderInfoWrapper>
        <S.TotalWrapper>
          <S.TotalAmount2>
            총 결제 금액
            <S.Price className="total-amount">
              {totalAmount.toLocaleString()} 원
            </S.Price>
          </S.TotalAmount2>
        </S.TotalWrapper>
      </S.OrderInfoWrapper>

      <S.PaymentButton>
        <S.BackButton onClick={handleBackButton}>이전 페이지로</S.BackButton>
        <S.ReserveButton onClick={handlePayment}>결제 진행</S.ReserveButton>
      </S.PaymentButton>
    </S.PaymentWrapper>
  );
};

export default MdPayment;



 


