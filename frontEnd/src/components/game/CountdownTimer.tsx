import React from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Container = styled.div`
  width: 150px;
  height: 150px;
  background-color: bisque;
`;
type PropsType = {
  newCountDown: number;
  countDownFinish: () => void;
};

export const CountdownTimer: React.FC<PropsType> = ({
  newCountDown,
  countDownFinish,
}) => {
  return (
    <Container>
      <CountdownCircleTimer
        isPlaying
        key={newCountDown}
        duration={60}
        size={150}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => countDownFinish()}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </Container>
  );
};
