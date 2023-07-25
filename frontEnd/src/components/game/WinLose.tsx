import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  height: 100px;
  margin-bottom: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 25px;
  text-align: center;
  color: white;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
interface WinLoseProps {
  message: string;
  handleWinLose: (i:boolean) => void;
}

export const WinLoose: React.FC<WinLoseProps> = ({ message, handleWinLose }) => {
  useEffect(() => {
    setTimeout(() => {
      handleWinLose(false);
    }, 2500);
  }, []);
  return <Container>{message}</Container>;
};
