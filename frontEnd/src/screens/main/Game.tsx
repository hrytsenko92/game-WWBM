import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Score } from '../../components/game/Score';
import { GameBar } from '../../components/game/GameBar';
import { Advice } from '../../components/game/Advice';
import { QType, testQ, AdwiseType, defaultAdwise } from '../../types/allType';
import { Popup } from '../../components/game/Popup';
import { CountdownTimer } from '../../components/game/CountdownTimer';

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
  grid-template-rows: 70% 30%;
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
  const [question, setQuestion] = useState<QType>(); // питання з бБД
  const [userScore, setUserScore] = useState<number>(15); // рахунок
  const [adwise, setAdwise] = useState<AdwiseType[]>(); // 3 кнопки
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [message, setMessage] = useState<string>(''); //
  const [newGame, setNewGame] = useState<boolean>(false);
  const [fiftyPercent, setFiftyPercent] = useState<boolean>(false);
  const [callFriend, setCallFriend] = useState<boolean>(false);
  const [askViewers, setAskViewers] = useState<boolean>(false);

  const handlePopup = () => {
    setIsOpenPopup(prev => !prev);
  };
  const selectAnswer = (a: boolean) => {
    a ? console.log('yes, next') : console.log('no, new game'); // наступне питання, бест скор--, таймер кінець гри
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

  useEffect(() => {
    setQuestion(testQ); // перевірка на попередні ігри
    setAdwise(defaultAdwise); // не міняти
  }, []);

  return (
    <>
      {newGame ? (
        <Container>
          <CountDouwnWrapper>
            <CountdownTimer />
          </CountDouwnWrapper>
          <SideBarWrapper>
            <Score itemIndex={userScore} />
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
