import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

///

import { useAppSelector, useAppDispatch } from '../../store/hook';

///

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;
const ScoreWrapper = styled.div`
  background-color: #6d9689;
  padding: 50px; // grid
`;
const Score = styled.div`
  padding: 25px;
  border: 1px solid blue;
`; // вибірка по рейтингу, макс 10 гравців


const SettingWrapper = styled.div`
padding: 50px;
background-color: #f9bb5e;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: auto;
justify-items: center;
align-items: center;
`;
const UserScoreWrap = styled.div`
padding: 25px;
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`;
const UserScoreData = styled.span`
  font-size: 35px;
`;
const Reset = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid red;
`;

const Exit = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid green;
`;

export const Options: React.FC = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

    const userData = useAppSelector(state => state.userData);
    console.log(userData)

  return (
    <Container>
      <ScoreWrapper>
        <Score>
          <ul>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
            <li>10.000</li>
          </ul>
        </Score>
      </ScoreWrapper>
      <SettingWrapper>
        <UserScoreWrap>
          <UserScoreData>300.000 euro</UserScoreData>
        </UserScoreWrap>
        <Reset>Reset</Reset>
        <Exit onClick={handleExit}>Вийти</Exit>
      </SettingWrapper>
    </Container>
  );
};
