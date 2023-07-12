import React from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: bisque;
`;

export const CountdownTimer: React.FC = () => {

  return (
    <Container>
      <CountdownCircleTimer
        isPlaying
        duration={60}
        size={100}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={()=> console.log("finish")}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </Container>
  );
};
