import styled from "styled-components";

const S = {};

S.Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  overflow: auto;
  width: 540px;
  background-color: #fff;
  position: fixed;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  & #payment-method {
    width: 100%;
  }

  & .toss-button-wrap {
    width: 100%;
  }

  & .toss-button {
    width: 100%;
    padding: 11px 22px;
    border: none;
    border-radius: 8px;
    background-color: #3282f6;
    color: #f9fcff;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
  }
`;

S.ModalBg = styled.div`
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 90;
`;

S.Container = styled.div`
  background-color: #0a0a0a;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
  box-sizing: border-box;
`;

S.Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;        /* max-width → width 고정 */
  min-width: 480px;    /* 추가 */
`;

S.IconCircleSuccess = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(46, 204, 113, 0.15);
  border: 2px solid rgba(46, 204, 113, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #2ecc71;
  margin-bottom: 20px;
`;

S.IconCircleFail = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(231, 76, 60, 0.15);
  border: 2px solid rgba(231, 76, 60, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #e74c3c;
  margin-bottom: 20px;
`;

S.BadgeSuccess = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  background: rgba(30, 200, 100, 0.15);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
`;

S.BadgeFail = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  background: rgba(231, 76, 60, 0.15);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
`;

S.Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
`;

S.Sub = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 28px;
  text-align: center;
`;

S.InfoCard = styled.div`
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  width: 480px;        /* 100% → 고정 */
  padding: 20px;
  margin-bottom: 24px;
`;

S.InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #222;

  &:last-child {
    border-bottom: none;
  }
`;

S.InfoLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

S.InfoValue = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  text-align: right;
  max-width: 280px;
`;

S.Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #222;
  margin-bottom: 24px;
`;

S.BtnPrimary = styled.button`
  background: #ffd400;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 13px 32px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    background: #ffca00;
  }
`;

S.BtnSecondary = styled.button`
  background: transparent;
  color: #ffd400;
  border: 1px solid #ffd400;
  border-radius: 8px;
  padding: 11px 32px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: rgba(255, 212, 0, 0.08);
  }
`;

S.Loading = styled.div`
  color: #888;
  font-size: 15px;
  text-align: center;
`;

export default S;