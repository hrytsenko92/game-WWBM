import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 350px;
  height: 250px;
  padding: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: cadetblue;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;
const PopUpWrapper = styled.div``;
const Content = styled.div``;
const Message = styled.div`
  margin-bottom: 25px;
`;
const BtnClose = styled.button``;

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
