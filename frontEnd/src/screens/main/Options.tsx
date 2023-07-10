import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { remove } from '../../store/userSlice';
import {
  loadUserScore,
  resetUserScore,
  loadAllScore,
} from '../../components/option/optionLoaders';

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
  const [userScore, setUserScore] = useState<AllScoreType>();
  const userData = useAppSelector(state => state.userData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(remove());
    navigate('/');
  };
  const resetScore = async () => {
    const data = await resetUserScore(userData.userToken);
    if (data.isScoreReset) {
      LoadAllScoreData();
      LoadUserScoreData();
    }
  };

  const LoadAllScoreData = async () => {
    const tempAllScore = await loadAllScore(userData.userToken);
    setAllScore(tempAllScore);
  };
  const LoadUserScoreData = async () => {
    const tempUserScore = await loadUserScore(userData.userToken);
    setUserScore(tempUserScore);
  };
  useEffect(() => {
    LoadAllScoreData();
    LoadUserScoreData();
  }, []);

  return (
    <Container>
      <ScoreWrapper>
        <Score>
          <ol>
            {allScore.map(item => (
              <li key={item._id}>{`${item.username} - ${item.bestScore}`}</li>
            ))}
          </ol>
        </Score>
      </ScoreWrapper>
      <SettingWrapper>
        <UserScoreWrap>
          <UserScoreData>
            <div>{userScore?.username}</div>
            <div>{userScore?.bestScore}</div>
          </UserScoreData>
        </UserScoreWrap>
        <Reset onClick={resetScore}>Reset</Reset>
        <Exit onClick={handleExit}>Вийти</Exit>
      </SettingWrapper>
    </Container>
  );
};
