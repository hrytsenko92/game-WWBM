import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AdwiseType, NextQuestion, btnBgColors } from '../../types/allType';

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
  question: NextQuestion;
  adwise: AdwiseType[];
  selectAnswer: (a: boolean) => void;
};

export const GameBar: React.FC<PropsType> = ({
  question,
  adwise,
  selectAnswer,
}) => {
  const [btnBackgrounds, setBtnBackgrounds] = useState([
    btnBgColors.Default,
    btnBgColors.Default,
    btnBgColors.Default,
    btnBgColors.Default,
  ]);

  const handleSelectQ = (index: number, isTrue: boolean) => {
    const newBtnBackgrounds = [...btnBackgrounds];
    newBtnBackgrounds[index] = isTrue ? btnBgColors.Green : btnBgColors.Red;
    setBtnBackgrounds(newBtnBackgrounds);

    if (isTrue) {
      setTimeout(() => {
        selectAnswer(isTrue);
      }, 3000);
    } else {
      setTimeout(() => {
        selectAnswer(isTrue);
      }, 1500);
    }
  };
useEffect(() => {
  setBtnBackgrounds([
    btnBgColors.Default,
    btnBgColors.Default,
    btnBgColors.Default,
    btnBgColors.Default,
  ]);
}, [question]);
  return (
    <Container>
      <Question>{question.question}</Question>
      <AnswersWrapper>
        {question.answers.map((answer, index) => {
          const isActive = adwise[index]?.active ?? true;
          const backgroundColor = isActive
            ? btnBackgrounds[index]
            : btnBgColors.Grey;
          return (
            <Answer
              key={index}
              onClick={() => handleSelectQ(index, answer.isTrue)}
              style={{ backgroundColor }}
            >
              {`${String.fromCharCode(65 + index)}: ${answer.answer}`}
            </Answer>
          );
        })}
      </AnswersWrapper>
    </Container>
  );
};
