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
import { colors } from '../../types/colors';

type AllScoreType = {
  _id: string;
  username: string;
  bestScore: number;
};
const Container = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1.5fr;
  gap: 25px;
  padding: 25px;
  width: 100%;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Score = styled.ul`
  grid-column: 1/2;
  grid-row: 2/3;
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
  font-size: 1rem;
  white-space: nowrap;
`;
const UserScoreWrapper = styled.div`
  grid-column: 1/3;
  grid-row: 1/2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const Title = styled.h3`
  font-size: 1rem;
`;
const SybTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 400;
  text-align: justify;
`;
const UserScoreData = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.gold};
  margin: 10px 0px;
`;
const SettingWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ResetWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const ResetTitle = styled.span`
  font-size: 1rem;
  text-align: center;
`;
const Reset = styled.button`
  width: 40px;
  height: 40px;
  text-decoration: none;
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
const ExitWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);
`;
const ExitTitle = styled.span`
  font-size: 1rem;
  text-align: center;
`;
const Exit = styled.button`
  width: 40px;
  height: 40px;
  text-decoration: none;
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
        <Title>Ваш найкращий рахунок:</Title>
        <UserScoreData>
          {`${userScore?.username} - ${userScore?.bestScore}`}
        </UserScoreData>
        <SybTitle>
          Дякую що спробували мою першу гру. На меті було використати на
          практиці стек технологій MERN - 'MongoDB, Express, ReactJS, NodeJS'.
          Якщо Ви знайшли помилку - прошу написати мені на email:
          m.hrytsenko1802@gmail.com
        </SybTitle>
      </UserScoreWrapper>
      <SettingWrapper>
        <ResetWrapper>
          <Reset onClick={resetScore}>
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.75C11.0215 2.75 10.1871 3.37503 9.87787 4.24993C9.73983 4.64047 9.31134 4.84517 8.9208 4.70713C8.53026 4.56909 8.32557 4.1406 8.46361 3.75007C8.97804 2.29459 10.3661 1.25 12 1.25C13.634 1.25 15.022 2.29459 15.5365 3.75007C15.6745 4.1406 15.4698 4.56909 15.0793 4.70713C14.6887 4.84517 14.2602 4.64047 14.1222 4.24993C13.813 3.37503 12.9785 2.75 12 2.75Z"
                fill={colors.gold}
              />
              <path
                d="M2.75 6C2.75 5.58579 3.08579 5.25 3.5 5.25H20.5001C20.9143 5.25 21.2501 5.58579 21.2501 6C21.2501 6.41421 20.9143 6.75 20.5001 6.75H3.5C3.08579 6.75 2.75 6.41421 2.75 6Z"
                fill={colors.gold}
              />
              <path
                d="M5.91508 8.45011C5.88753 8.03681 5.53015 7.72411 5.11686 7.75166C4.70356 7.77921 4.39085 8.13659 4.41841 8.54989L4.88186 15.5016C4.96735 16.7844 5.03641 17.8205 5.19838 18.6336C5.36678 19.4789 5.6532 20.185 6.2448 20.7384C6.83639 21.2919 7.55994 21.5307 8.41459 21.6425C9.23663 21.75 10.2751 21.75 11.5607 21.75H12.4395C13.7251 21.75 14.7635 21.75 15.5856 21.6425C16.4402 21.5307 17.1638 21.2919 17.7554 20.7384C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9637 17.8205 19.0328 16.7844 19.1183 15.5016L19.5818 8.54989C19.6093 8.13659 19.2966 7.77921 18.8833 7.75166C18.47 7.72411 18.1126 8.03681 18.0851 8.45011L17.6251 15.3492C17.5353 16.6971 17.4712 17.6349 17.3307 18.3405C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8988 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8988 7.26957 19.6431C6.99616 19.3873 6.80583 19.025 6.66948 18.3405C6.52891 17.6349 6.46488 16.6971 6.37503 15.3492L5.91508 8.45011Z"
                fill={colors.gold}
              />
              <path
                d="M9.42546 10.2537C9.83762 10.2125 10.2051 10.5132 10.2464 10.9254L10.7464 15.9254C10.7876 16.3375 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29502 16.4868 9.25381 16.0746L8.75381 11.0746C8.71259 10.6625 9.0133 10.2949 9.42546 10.2537Z"
                fill={colors.gold}
              />
              <path
                d="M15.2464 11.0746C15.2876 10.6625 14.9869 10.2949 14.5747 10.2537C14.1626 10.2125 13.795 10.5132 13.7538 10.9254L13.2538 15.9254C13.2126 16.3375 13.5133 16.7051 13.9255 16.7463C14.3376 16.7875 14.7051 16.4868 14.7464 16.0746L15.2464 11.0746Z"
                fill={colors.gold}
              />
            </svg>
          </Reset>
          <ResetTitle>Обнулити рахунок</ResetTitle>
        </ResetWrapper>
        <ExitWrapper>
          <Exit onClick={handleExit}>
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9453 1.25C13.5778 1.24998 12.4754 1.24996 11.6085 1.36652C10.7084 1.48754 9.95048 1.74643 9.34857 2.34835C8.82363 2.87328 8.55839 3.51836 8.41916 4.27635C8.28387 5.01291 8.25799 5.9143 8.25196 6.99583C8.24966 7.41003 8.58357 7.74768 8.99778 7.74999C9.41199 7.7523 9.74964 7.41838 9.75194 7.00418C9.75803 5.91068 9.78643 5.1356 9.89448 4.54735C9.99859 3.98054 10.1658 3.65246 10.4092 3.40901C10.686 3.13225 11.0746 2.9518 11.8083 2.85315C12.5637 2.75159 13.5648 2.75 15.0002 2.75H16.0002C17.4356 2.75 18.4367 2.75159 19.1921 2.85315C19.9259 2.9518 20.3144 3.13225 20.5912 3.40901C20.868 3.68577 21.0484 4.07435 21.1471 4.80812C21.2486 5.56347 21.2502 6.56459 21.2502 8V16C21.2502 17.4354 21.2486 18.4365 21.1471 19.1919C21.0484 19.9257 20.868 20.3142 20.5912 20.591C20.3144 20.8678 19.9259 21.0482 19.1921 21.1469C18.4367 21.2484 17.4356 21.25 16.0002 21.25H15.0002C13.5648 21.25 12.5637 21.2484 11.8083 21.1469C11.0746 21.0482 10.686 20.8678 10.4092 20.591C10.1658 20.3475 9.99859 20.0195 9.89448 19.4527C9.78643 18.8644 9.75803 18.0893 9.75194 16.9958C9.74964 16.5816 9.41199 16.2477 8.99778 16.25C8.58357 16.2523 8.24966 16.59 8.25196 17.0042C8.25799 18.0857 8.28387 18.9871 8.41916 19.7236C8.55839 20.4816 8.82363 21.1267 9.34857 21.6517C9.95048 22.2536 10.7084 22.5125 11.6085 22.6335C12.4754 22.75 13.5778 22.75 14.9453 22.75H16.0551C17.4227 22.75 18.525 22.75 19.392 22.6335C20.2921 22.5125 21.0499 22.2536 21.6519 21.6517C22.2538 21.0497 22.5127 20.2919 22.6337 19.3918C22.7503 18.5248 22.7502 17.4225 22.7502 16.0549V7.94513C22.7502 6.57754 22.7503 5.47522 22.6337 4.60825C22.5127 3.70814 22.2538 2.95027 21.6519 2.34835C21.0499 1.74643 20.2921 1.48754 19.392 1.36652C18.525 1.24996 17.4227 1.24998 16.0551 1.25H14.9453Z"
                fill={colors.gold}
              />
              <path
                d="M2.00098 11.249C1.58676 11.249 1.25098 11.5848 1.25098 11.999C1.25098 12.4132 1.58676 12.749 2.00098 12.749L13.9735 12.749L12.0129 14.4296C11.6984 14.6991 11.662 15.1726 11.9315 15.4871C12.2011 15.8016 12.6746 15.838 12.9891 15.5685L16.4891 12.5685C16.6553 12.426 16.751 12.218 16.751 11.999C16.751 11.7801 16.6553 11.5721 16.4891 11.4296L12.9891 8.42958C12.6746 8.16002 12.2011 8.19644 11.9315 8.51093C11.662 8.82543 11.6984 9.2989 12.0129 9.56847L13.9735 11.249L2.00098 11.249Z"
                fill={colors.gold}
              />
            </svg>
          </Exit>
          <ExitTitle>Вийти з гри</ExitTitle>
        </ExitWrapper>
      </SettingWrapper>
    </Container>
  );
};
