import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.section`
  background-color: #6d6ded;
`;
const Score = styled.aside``;
const GameBar = styled.section``;

export const Game: React.FC = () => {
  return (
    <Container>
      <Score>Score</Score>
      <GameBar>Gamebar</GameBar>
    </Container>
  );
};
