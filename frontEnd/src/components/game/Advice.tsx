import React from 'react';
import styled from 'styled-components';
import { AdwiseType, Answer } from '../../types/allType';

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
  answers: Answer[];
  isfiftyPercent: boolean;
  handleFiftyPercent: (a: AdwiseType[]) => void;
  iscallFriend: boolean;
  handleCallFriend: (a: string) => void;
  isaskViewers: boolean;
  handleAskViewers: (a: string) => void;
};

export const Advice: React.FC<PropsType> = ({
  answers,
  isfiftyPercent,
  handleFiftyPercent,
  iscallFriend,
  handleCallFriend,
  isaskViewers,
  handleAskViewers,
}) => {
  const fiftyPercent = (answers: Answer[]) => {
    if (isfiftyPercent) {
      return;
    } else {
      const trueIndex = answers.findIndex(obj => obj.isTrue === true);
      if (trueIndex === -1) {
        console.log("немає об'єкта з isTrue === true");
        return;
      }
      const result: AdwiseType[] = [];
      for (let i = 0; i < answers.length; i++) {
        if (i === trueIndex || result.filter(obj => obj.active).length < 2) {
          result.push({ active: true });
        } else {
          result.push({ active: false });
        }
      }
      const trueCount = result.filter(obj => obj.active).length;
      if (trueCount >= 3) {
        const falseIndex = result.findIndex(
          (obj, index) => index !== trueIndex && obj.active === true
        );
        if (falseIndex !== -1) {
          result[falseIndex].active = false;
        }
      }
      handleFiftyPercent(result);
    }
  };
  const callFriend = (answers: Answer[]) => {
    if (iscallFriend) {
      return;
    } else {
      const trueIndex = answers.findIndex(obj => {
        if (obj.isTrue) {
          handleCallFriend(
            `Хммм... я впевнений що правильна відповідь ${obj.answer}`
          );
        }
      });
    }
  };

  const AskViewers = (answers: Answer[]) => {
    if (isaskViewers) {
      return;
    } else {
      const trueIndex = answers.findIndex(obj => {
        if (obj.isTrue) {
          handleAskViewers(
            `Переважна більшість глядачів вважають що вірна відповідь ${obj.answer}`
          );
        }
      });
    }
  };

  return (
    <Container>
      <Ahalf onClick={() => fiftyPercent(answers)}>50/50</Ahalf>
      <Afriend onClick={() => callFriend(answers)}>Friend</Afriend>
      <Aviewers onClick={() => AskViewers(answers)}>Допомога залу</Aviewers>
    </Container>
  );
};
