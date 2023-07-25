import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AdwiseType, NextQuestion } from '../../types/allType';
import { colors } from '../../types/colors';

const Container = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-width: 100%;
  padding-top: 15px;
`;
const LineWrapper = styled.div`
  padding: 15px 25px;
  width: 100%;
  height: auto;
  min-height: 70px;
  border: 3px solid ${colors.blue};
  border-radius: 50px;
  background-color: ${colors.defaultQuestion};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -300px;
    width: 300px;
    height: 5px;
    background-color: ${colors.blue};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    right: -300px;
    width: 300px;
    height: 5px;
    background-color: ${colors.blue};
  }
`;

const Question = styled.div`
  font-size: 1rem;
  text-align: center;
  color: white;
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
  gap: 20px;
  margin: 20px;
`;
const Answer = styled.button`
  padding: 5px 5px;
  width: 100%;
  height: 100%;
  border: 3px solid ${colors.border};
  border-radius: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: white;
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
    colors.defaultQuestion,
    colors.defaultQuestion,
    colors.defaultQuestion,
    colors.defaultQuestion,
  ]);
  const handleSelectQ = (index: number, isTrue: boolean) => {
    const newBtnBackgrounds = [...btnBackgrounds];
    newBtnBackgrounds[index] = isTrue ? colors.green : colors.red;
    if (!isTrue) {
      for (let i = 0; i < question.answers.length; i++) {
        if (i !== index && !question.answers[i].isTrue) {
          newBtnBackgrounds[i] = colors.red;
        } else if (i !== index && question.answers[i].isTrue) {
          newBtnBackgrounds[i] = colors.green;
        }
      }
    }

    setBtnBackgrounds(newBtnBackgrounds);
    if (isTrue) {
      setTimeout(() => {
        selectAnswer(isTrue);
      }, 2000);
    } else {
      setTimeout(() => {
        selectAnswer(isTrue);
      }, 1500);
    }
  };
  useEffect(() => {
    setBtnBackgrounds([
      colors.defaultQuestion,
      colors.defaultQuestion,
      colors.defaultQuestion,
      colors.defaultQuestion,
    ]);
  }, [question]);
  return (
    <Container>
      <LineWrapper>
        <Question>{question.question}</Question>
      </LineWrapper>
      <AnswersWrapper>
        {question.answers.map((answer, index) => {
          const isActive = adwise[index]?.active ?? true;
          const backgroundColor = isActive
            ? btnBackgrounds[index]
            : colors.border;
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
