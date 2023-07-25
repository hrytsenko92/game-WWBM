import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/hook';
import { Score } from '../../components/game/Score';
import { GameBar } from '../../components/game/GameBar';
import { Advice } from '../../components/game/Advice';
import { NextQuestion, AdwiseType, defaultAdwise } from '../../types/allType';
import { Popup } from '../../components/game/Popup';
import { CountdownTimer } from '../../components/game/CountdownTimer';
import { updateUserData, getQuestion } from '../../components/game/dataLoaders';
import { colors } from '../../types/colors';
import wwbmSVG from '../../../public/wwbm.svg';

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100px 75px;
  grid-template-rows: auto auto;
  justify-content: space-between;
  padding: 15px;
  animation: fadeIn 1s ease-out forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  &::before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0px;
    right: 0;
    bottom: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image: url(${wwbmSVG});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: 90%;
    z-index: -1;
  }
`;
const CountDouwnWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  row-gap: 15px;
`;
const SideBarWrapper = styled.aside`
  grid-column: 2/3;
  grid-row: 1/2;
`;
const GameBarWrapper = styled.section`
  grid-column: 1/3;
  grid-row: 2/3;
`;
const NewGameContainer = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
const NewGame = styled.div`
  width: 300px;
  height: 100px;
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
const NewGameMessage = styled.h4`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${colors.gold};
  opacity: 0.8;
`;
const NewGameBtn = styled.button`
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

export const Game: React.FC = () => {
  const [newGame, setNewGame] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(1);
  const [question, setQuestion] = useState<NextQuestion>();
  const [adwise, setAdwise] = useState<AdwiseType[]>(defaultAdwise);
  const [callFriend, setCallFriend] = useState<boolean>(false);
  const [fiftyPercent, setFiftyPercent] = useState<boolean>(false);
  const [askViewers, setAskViewers] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const userData = useAppSelector(state => state.userData);

  const handlePopup = () => {
    setIsOpenPopup(prev => !prev);
  };
  const handleFiftyPercent = (a: AdwiseType[]) => {
    setAdwise(a);
    setFiftyPercent(true);
  };
  const handleCallFriend = (a: string) => {
    setMessage(a);
    setIsOpenPopup(true);
    setCallFriend(true);
  };
  const handleAskViewers = (a: string) => {
    setMessage(a);
    setIsOpenPopup(true);
    setAskViewers(true);
  };
  const countDownFinish = async () => {
    setUserScore(1);
    setNewGame(false);
  };
  const getNextQuestion = async (score: number) => {
    question?.id
      ? await updateUserData(userData.userToken, question?.id)
      : null;
    adwise !== defaultAdwise ? setAdwise(defaultAdwise) : null;
    const res = await getQuestion(userData.userToken, score);
    setQuestion(res.nextQuestion);
    setUserScore(prevScore => prevScore + 1);
  };
  
  const selectAnswer = async (next: boolean) => {
    if (userScore === 17) {
      setMessage('Вітаю!!! Ви виграли 1.000.000!')
      setIsOpenPopup(true)
      setNewGame(false);
    }
    if (next) {
      question ? await updateUserData(userData.userToken, question?.id) : null;
      await getNextQuestion(userScore);
    } else {
      setUserScore(1);
      adwise !== defaultAdwise ? setAdwise(defaultAdwise) : null;
      setNewGame(false);
    }
  };
  useEffect(() => {
    setQuestion(undefined);
    setUserScore(1);
    setCallFriend(false);
    setFiftyPercent(false);
    setAskViewers(false);
    newGame ? getNextQuestion(1) : null;
  }, [newGame]);
  return (
    <>
      {isOpenPopup ? (
        <Popup message={message} handlePopup={handlePopup} />
      ) : null}
      {newGame ? (
        <Container>
          <CountDouwnWrapper>
            <CountdownTimer
              newCountDown={userScore}
              countDownFinish={countDownFinish}
            />
            {question?.answers ? (
              <Advice
                answers={question.answers}
                isfiftyPercent={fiftyPercent}
                handleFiftyPercent={handleFiftyPercent}
                iscallFriend={callFriend}
                handleCallFriend={handleCallFriend}
                isaskViewers={askViewers}
                handleAskViewers={handleAskViewers}
              />
            ) : null}
          </CountDouwnWrapper>
          <SideBarWrapper>
            <Score itemIndex={userScore} token={userData.userToken} />
          </SideBarWrapper>
          <GameBarWrapper>
            {question && adwise ? (
              <GameBar
                question={question}
                adwise={adwise}
                selectAnswer={selectAnswer}
              />
            ) : (
              <span>Loading</span>
            )}
          </GameBarWrapper>
        </Container>
      ) : (
        <NewGameContainer>
          <NewGame>
            <NewGameMessage>Розпочати гру?</NewGameMessage>
            <NewGameBtn onClick={() => setNewGame(true)}>
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8876 9.9348C14.9625 10.8117 15.5 11.2501 15.5 12C15.5 12.7499 14.9625 13.1883 13.8876 14.0652C13.5909 14.3073 13.2966 14.5352 13.0261 14.7251C12.7888 14.8917 12.5201 15.064 12.2419 15.2332C11.1695 15.8853 10.6333 16.2114 10.1524 15.8504C9.6715 15.4894 9.62779 14.7336 9.54038 13.2222C9.51566 12.7947 9.5 12.3757 9.5 12C9.5 11.6243 9.51566 11.2053 9.54038 10.7778C9.62779 9.26636 9.6715 8.51061 10.1524 8.1496C10.6333 7.78859 11.1695 8.11466 12.2419 8.76679C12.5201 8.93597 12.7888 9.10831 13.0261 9.27492C13.2966 9.46483 13.5909 9.69274 13.8876 9.9348Z"
                  stroke={colors.gold}
                  strokeWidth="1.5"
                />
                <path
                  d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                  stroke={colors.gold}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </NewGameBtn>
          </NewGame>
        </NewGameContainer>
      )}
    </>
  );
};
