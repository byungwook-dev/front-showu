import styled from "styled-components";

const S = {};

S.TossPayButton = styled.button`
  border: none;
  border-radius: 8px;
  background-color: #ffd400;
  color: #000;
  width: 100%;
  height: 52px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.h5};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  cursor: pointer;

  &:hover {
    background-color: #ffca00;
  }
`;

export default S;