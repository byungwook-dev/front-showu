import styled from "styled-components";

const S = {};

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

S.Wrap = styled.div`
  background: #0a0a0a;
  border: 0.5px solid #333;
  border-radius: 12px;
  overflow: hidden;
  width: 520px;
  min-width: 520px;
`;

S.Header = styled.div`
  background: #111;
  border-bottom: 1px solid #222;
  padding: 20px 28px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

S.HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

S.HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 2px;
`;

S.HeaderSub = styled.p`
  font-size: 13px;
  color: #666;
`;

S.Body = styled.div`
  padding: 28px;
`;

S.SectionTitle = styled.div`
  font-size: 13px;
  color: #555;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

S.InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

S.InfoItem = styled.div`
  background: #161616;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 12px 14px;
`;

S.InfoItemLabel = styled.div`
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
`;

S.InfoItemValue = styled.div`
  font-size: 15px;
  color: #ddd;
  font-weight: 500;
`;

S.PriceRow = styled.div`
  background: #161616;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

S.PriceLabel = styled.span`
  font-size: 14px;
  color: #888;
`;

S.PriceValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
`;

/* Success/Failed 공통 */
S.Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  min-width: 480px;
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
  width: 480px;
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
  width: 480px;
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
  width: 480px;

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