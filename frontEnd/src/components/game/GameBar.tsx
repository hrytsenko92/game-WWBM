import React, { useState } from 'react';
import styled from 'styled-components';
import {
  AType,
  AdwiseType,
  QType,
  btnBgColors,
} from '../../types/questionsType';

const Container = styled.section`
  border: 2px solid blue;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 50px;
`;
const Question = styled.div`
  height: 70px;
  font-size: 30px;
`;
const AnswersWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;
const Answer = styled.button`
  width: 150px;
  height: 50px;
  border: 2px solid purple;
`;
type PropsType = {
  question: QType;
  adwise: AdwiseType[];
  selectAnswer: (a: boolean) => void;
};

export const GameBar: React.FC<PropsType> = ({ question, selectAnswer }) => {
  const [btn0Background, setBtn0Background] = useState(btnBgColors.Default);
  const [btn1Background, setBtn1Background] = useState(btnBgColors.Default);
  const [btn2Background, setBtn2Background] = useState(btnBgColors.Default);
  const [btn3Background, setBtn3Background] = useState(btnBgColors.Default);

   const handleSelect = (a: boolean) => {
    //  a ? selectAnswer() : null;
   };

  return (
    <Container>
      <Question>{question.question}</Question>
      <AnswersWrapper>
        <Answer
          onClick={() => handleSelect(question.answers[0].isTrue)}
          style={{ backgroundColor: btn0Background }}
        >
          {`A: ${question.answers[0].answer}`}
        </Answer>
        <Answer
          onClick={() => handleSelect(question.answers[1].isTrue)}
          style={{ backgroundColor: btn1Background }}
        >
          {`B: ${question.answers[1].answer}`}
        </Answer>
        <Answer
          onClick={() => handleSelect(question.answers[2].isTrue)}
          style={{ backgroundColor: btn2Background }}
        >
          {`C: ${question.answers[2].answer}`}
        </Answer>
        <Answer
          onClick={() => handleSelect(question.answers[3].isTrue)}
          style={{ backgroundColor: btn3Background }}
        >
          {`D: ${question.answers[3].answer}`}
        </Answer>
      </AnswersWrapper>
    </Container>
  );
};
