import React from 'react';
import styled from 'styled-components';
import { AType, AdwiseType } from '../../types/allType';

const Container = styled.section`
  background-color: #6d6ded;
`;
const Ahalf = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: aquamarine;
`;
const Afriend = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: aquamarine;
`;
const Aviewers = styled.button`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: aquamarine;
`;

type PropsType = {
  answers: AType[];
  handleFiftyPercent: (a: AdwiseType[]) => void;
  handleCallFriend: (a: string) => void;
  handleAskViewers: (a: string) => void;
};

export const Advice: React.FC<PropsType> = ({
  answers,
  handleFiftyPercent,
  handleCallFriend,
  handleAskViewers,
}) => {
  const fiftyPercent = (answers: AType[]) => {
    const trueIndex = answers.findIndex(obj => obj.isTrue === true);
    if (trueIndex === -1) {
      return console.log("немає об'єкта з isTrue === true");
    }
    const result: AdwiseType[] = [];
    for (let i = 0; i < answers.length; i++) {
      if (i === trueIndex || result.length < 2) {
        result.push({ active: true });
      } else {
        result.push({ active: false });
      }
    }
    handleFiftyPercent(result);
  };
  const callFriend = (answers: AType[]) => {
    const trueIndex = answers.findIndex(obj => {
      if (obj.isTrue) {
        handleCallFriend(
          `Хммм... я впевнений що правильна відповідь ${obj.answer}`
        );
      }
    });
  };
  const AskViewers = (answers: AType[]) => {
    const trueIndex = answers.findIndex(obj => {
      if (obj.isTrue) {
        handleAskViewers(
          `Переважна більшість глядачів вважають що вірна відповідь ${obj.answer}`
        );
      }
    });
  };

  return (
    <Container>
      <Ahalf onClick={() => fiftyPercent(answers)}>50/50</Ahalf>
      <Afriend onClick={() => callFriend(answers)}>Friend</Afriend>
      <Aviewers onClick={() => AskViewers(answers)}>Допомога залу</Aviewers>
    </Container>
  );
};
