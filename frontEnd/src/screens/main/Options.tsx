import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { add, remove, stateType } from '../../store/userSlice';
import axios, { AxiosError } from 'axios';

type AllScoreType = {
  _id: string;
  username: string;
  bestScore: number;
};
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
  const [allScore, setAllScore] = useState<AllScoreType[]>([]);
  const navigate = useNavigate();
  const userData = useAppSelector(state => state.userData);
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(remove());
    navigate('/');
  };

  const loadAllScore = async () => {
    try {
      const token = String(userData.userToken);
      const response = await axios.get(
        'http://localhost:5001/option/allscore',
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllScore(response.data);
    } catch (err) {
      const errors = err as Error | AxiosError;
      if (!axios.isAxiosError(errors)) {
        console.log(errors);
      }
      console.log(`Axios error: ${err}`);
    }
  };

  useEffect(() => {
    loadAllScore();
  }, []);
  console.log(allScore)
  return (
    <Container>
      <ScoreWrapper>
        <Score>
          <ol>
            {allScore.map((item)=> (
              <li>{`${item.username} - ${item.bestScore}`}</li>
            ))}
          </ol>
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
