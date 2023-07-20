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
import resetSVG from '../../assets/reset.svg';
import logoutSVG from '../../assets/logout.svg';

type AllScoreType = {
  _id: string;
  username: string;
  bestScore: number;
};
const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 150px;
  gap: 25px;
  padding: 25px;
`;
const Score = styled.ul`
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const ScoreItem = styled.li`
text-align: center;
list-style: none;
`;
const UserScoreWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const Title = styled.h3`
  font-size: 18px;
`;
const UserScoreData = styled.span`
  font-size: 20px;
`;
const SettingWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const Reset = styled.button`
  width: 45px;
  height: 45px;
  text-decoration: none;
  background-image: url(${resetSVG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border-radius: 50%;
  border: none;
  opacity: 0.8;
  cursor: pointer;
  outline: none;
`;
const Exit = styled.button`
  width: 45px;
  height: 45px;
  text-decoration: none;
  background-image: url(${logoutSVG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  border: none;
  opacity: 0.8;
  cursor: pointer;
  outline: none;
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
      <Score>
        {allScore.slice(0, 9).map(item => (
          <ScoreItem
            key={item._id}
          >{`${item.username} - ${item.bestScore}`}</ScoreItem>
        ))}
      </Score>
      <UserScoreWrapper>
        <Title>Ваш рахунок:</Title>
        <UserScoreData>
          {`${userScore?.username} - ${userScore?.bestScore}`}
        </UserScoreData>
      </UserScoreWrapper>
      <SettingWrapper>
        <Reset onClick={resetScore}></Reset>
        <Exit onClick={handleExit}></Exit>
      </SettingWrapper>
    </Container>
  );
};
