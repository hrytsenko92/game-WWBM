import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector} from '../../store/hook';
import { Score } from '../../components/game/Score';
import { GameBar } from '../../components/game/GameBar';
import { Advice } from '../../components/game/Advice';
import {
  NextQuestion,
  AdwiseType,
  defaultAdwise,
} from '../../types/allType';
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
  width: 100px;
  height: 100px;
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
  const [timer, setTimer] = useState<boolean>(false)
  const [userScore, setUserScore] = useState<number>(1); 
  const [question, setQuestion] = useState<NextQuestion>();
  const [adwise, setAdwise] = useState<AdwiseType[]>();
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
    if (!fiftyPercent) {
      setAdwise(a);
      setFiftyPercent(true);
    }
  };
  const handleCallFriend = (a: string) => {
    if (!callFriend) {
      setMessage(a);
      setIsOpenPopup(true);
      setCallFriend(true);
    }
  };
  const handleAskViewers = (a: string) => {
    if (!askViewers) {
      setMessage(a);
      setIsOpenPopup(true);
      setAskViewers(true);
    }
  };
  const countDownFinish = async () => {
    setUserScore(1);
    question?.id
      ? await updateUserData(userData.userToken, question?.id)
      : null;
    setAdwise(defaultAdwise);
    setNewGame(false);
  };
  const getNextQuestion = async (score: number) => {
    const res = await getQuestion(userData.userToken, score);
    setQuestion(res.nextQuestion);
  };

  const selectAnswer = async (next: boolean) => {
    if (next) {
      setTimer(false);
      setAdwise(defaultAdwise);
      setUserScore(prevScore => prevScore + 1);
      question?.id
        ? await updateUserData(userData.userToken, question?.id)
        : null;
      await getNextQuestion(userScore);
      setTimer(true);
    } else {
      question?.id
        ? await updateUserData(userData.userToken, question?.id)
        : null;
      await getNextQuestion(1);
      setNewGame(false);
      setTimer(false);
    }
  };

  useEffect(() => {
    getNextQuestion(1)
    setUserScore(1);
    setAdwise(defaultAdwise);
    setTimer(true);
  }, [newGame]);

  return (
    <>
      {newGame ? (
        <Container>
          <CountDouwnWrapper>
            <CountdownTimer start={timer} countDownFinish={countDownFinish} />
          </CountDouwnWrapper>
          <SideBarWrapper>
            <Score itemIndex={userScore} token={userData.userToken} />
            {question?.answers ? (
              <Advice
                answers={question.answers}
                handleFiftyPercent={handleFiftyPercent}
                handleCallFriend={handleCallFriend}
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
