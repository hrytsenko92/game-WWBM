import React from 'react';
import styled from 'styled-components';
import { colors } from '../../types/colors';

const Container = styled.div`
  padding: 15px;
  margin: 40px;
  position: absolute;
  right: -10px;
  top: 55px;
  width: 200px;
  height: auto;
  background-color: ${colors.defaultQuestion};
  border: 8px solid ${colors.blue};
  border-radius: 30px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  z-index: 30;
  &:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -40px;
    top: 30px;
    bottom: auto;
    border: 20px solid;
    border-color: ${colors.blue} transparent transparent ${colors.blue};
  }
  &:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -20px;
    top: 38px;
    bottom: auto;
    border: 12px solid;
    border-color: ${colors.defaultQuestion} transparent transparent
      ${colors.defaultQuestion};
  }
`;
const PopUpWrapper = styled.div``;
const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
const Message = styled.div`
  margin-bottom: 15px;
`;
const BtnClose = styled.button`
  width: 40px;
  height: 20px;
  text-decoration: none;
  background-color: ${colors.gold};
  border-radius: 5px;
  border: 1px solid ${colors.blue};
  opacity: 0.8;
  cursor: pointer;
  outline: none;
`;

interface PopupProps {
  message: string;
  handlePopup: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, handlePopup }) => {
  return (
    <Container>
      <PopUpWrapper className="popup">
        <Content className="popup-content">
          <Message>{message}</Message>
          <BtnClose onClick={handlePopup}>OK</BtnClose>
        </Content>
      </PopUpWrapper>
    </Container>
  );
};
