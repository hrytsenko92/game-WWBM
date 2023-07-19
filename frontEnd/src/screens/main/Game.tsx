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

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1.5fr 1fr;
`;
const CountDouwnWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  width: 150px;
  height: 150px;
`;
const SideBarWrapper = styled.aside`
  grid-column: 3/4;
  grid-row: 1/2;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75% 25%;
`;
const GameBarWrapper = styled.section`
  grid-column: 1/4;
  grid-row: 2/3;
  border: 1px solid red;
`;
const NewGameContainer = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
const NewGame = styled.div`
  width: 350px;
  height: 100px;
  border: 1px solid red;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;
const NewGameMessage = styled.h3`
  font-size: 25px;
  margin-bottom: 25px;
`;
const NewGameBtn = styled.button`
  width: 50px;
  height: 25px;
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
    question?.id ? await updateUserData(userData.userToken, question?.id): null
    adwise !== defaultAdwise ? setAdwise(defaultAdwise) : null;
    const res = await getQuestion(userData.userToken, score);
    setQuestion(res.nextQuestion);
    setUserScore(prevScore => prevScore + 1);
  };
  const selectAnswer = async (next: boolean) => {
    if (next) {
      await getNextQuestion(userScore);
    } else {
      setUserScore(1);
      await getNextQuestion(1);
      setNewGame(false);
    }
  };
  useEffect(() => {
    newGame ? getNextQuestion(1): null;
  }, [newGame]);
  return (
    <>
      {newGame ? (
        <Container>
          <CountDouwnWrapper>
            <CountdownTimer
              newCountDown={userScore}
              countDownFinish={countDownFinish}
            />
          </CountDouwnWrapper>
          <SideBarWrapper>
            <Score itemIndex={userScore} token={userData.userToken} />
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
          {isOpenPopup ? (
            <Popup message={message} handlePopup={handlePopup} />
          ) : null}
        </Container>
      ) : (
        <NewGameContainer>
          <NewGame>
            <NewGameMessage>Розпочати гру?</NewGameMessage>
            <NewGameBtn onClick={() => setNewGame(true)}>Старт</NewGameBtn>
          </NewGame>
        </NewGameContainer>
      )}
    </>
  );
};
