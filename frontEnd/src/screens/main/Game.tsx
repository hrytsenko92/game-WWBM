import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Score } from '../../components/game/Score';
import { GameBar } from '../../components/game/GameBar';
import { Advice } from '../../components/game/Advice';
import {
  QType,
  testQ,
  AdwiseType,
  defaultAdwise,
} from '../../types/questionsType';
import { Popup } from '../../components/game/Popup';

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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

export const Game: React.FC = () => {
  const [question, setQuestion] = useState<QType>();
  const [adwise, setAdwise] = useState<AdwiseType[]>();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [message, setMessage] = useState<string>('aloha');

  const handlePopup = () => {
    setIsOpenPopup(prev => !prev);
  };

  const selectAnswer = (a: boolean) => {
    a ? console.log('yes, next') : console.log('no, new game');
  };
  const handleFiftyPercent = (a: AdwiseType[]) => {
    setAdwise(a);
  };
  const handleCallFriend = (a: string) => {
    setMessage(a);
    setIsOpenPopup(true);
  };
  const handleAskViewers = (a: string) => {
    setMessage(a);
    setIsOpenPopup(true);
  };

  useEffect(() => {
    setQuestion(testQ); // get from db
    setAdwise(defaultAdwise);
  }, []);

  return (
    <Container>
      <SideBarWrapper>
        <Score />
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
  );
};
