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

S.PeriodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

S.PeriodItem = styled.div`
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #ccc;
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

export default S;