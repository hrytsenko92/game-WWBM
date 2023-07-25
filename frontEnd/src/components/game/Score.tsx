import React, { useEffect } from 'react';
import styled from 'styled-components';
import { score } from '../../types/allType';
import { updateUserScore } from './dataLoaders';

const Container = styled.section``;
const ScoreWrapper = styled.ul`
  display: flex;
  flex-flow: column-reverse nowrap;
  list-style: none;
  padding: 5px 0px;
  text-align: right;
  width: auto;
`;
const ScoreItem = styled.li`
  font-size: 0.9rem;
  color: gold;
  opacity: 0.8;
`;
const ScoreItemCurrent = styled.li`
  background-color: gold;
  font-size: 0.9rem;
  opacity: 0.8;
`;
const ScoreZero = styled.li`
  display: none;
`;

type PropsType = {
  itemIndex: number;
  token: string;
};

export const Score: React.FC<PropsType> = ({ itemIndex, token }) => {
  const updateScore = (itemIndex: number) => {
    let temp = 1;
    itemIndex !== 1 ? (temp = itemIndex - 1) : null; // if < 16
    const item = score[temp];
    updateUserScore(token, item);
  };
  useEffect(() => {
    updateScore(itemIndex);
  }, [itemIndex]);
  return (
    <Container>
      <ScoreWrapper>
        {score.map((item, index) => {
          if (item === 0) {
            return <ScoreZero key={index}>start</ScoreZero>;
          } else if (index === itemIndex - 1) {
            return <ScoreItemCurrent key={index}>{item}</ScoreItemCurrent>;
          } else {
            return <ScoreItem key={index}>{item}</ScoreItem>;
          }
        })}
      </ScoreWrapper>
    </Container>
  );
};

  // const updateScore = (itemIndex: number) => {
  //   let temp = 1;
  //   itemIndex !== 1 ? (temp = itemIndex - 1) : null; // if < 16
  //   const item = score[temp];
  //   updateUserScore(token, item);
  // };