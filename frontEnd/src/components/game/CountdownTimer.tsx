import React from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Container = styled.div`
opacity: 0.8;
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
        duration={9959}
        size={100}
        colors={[
          '#ffd700',
          '#a99210',
          '#ff6b6b',
          '#f60202',
          '#A30000',
          '#710000',
          '#2d0000',
        ]}
        colorsTime={[55,45, 35, 30, 25,15, 0]}
        onComplete={() => countDownFinish()}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </Container>
  );
};
