import React from 'react';
import styled from 'styled-components';
import { score } from '../../types/allType';

const Container = styled.section`
  background-color: #6969ae;
`;
const ScoreWrapper = styled.ul`
display: flex;
flex-flow: column-reverse nowrap;
`;
const ScoreItem = styled.li`
background-color: yellow;
`;
const ScoreItemCurrent = styled.li`
  background-color: green;
`;
const ScoreZero = styled.li`
  background-color: yellow;
  display: none;
`;

type PropsType = {
  itemIndex: number;
}
// фукнція запису бест скор в БД
export const Score: React.FC<PropsType> = ({itemIndex}) => {
  return (
    <Container>
      <ScoreWrapper>
        {score.map((item, index) => {
          if(index === 0) {
            return <ScoreZero key={index}>{item}</ScoreZero>;
          }
          else if (index === itemIndex) {
            return <ScoreItemCurrent key={index}>{item}</ScoreItemCurrent>;
          } else {
            return <ScoreItem key={index}>{item}</ScoreItem>;
          }
        })}
      </ScoreWrapper>
    </Container>
  );
};
