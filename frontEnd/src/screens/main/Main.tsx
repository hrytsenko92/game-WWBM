import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../public/logo.png'
import settingSVG from '../../assets/settings.svg'
import playSVG from '../../assets/play.svg';
import { colors } from '../../types/colors';

const Container = styled.section`
  padding: 25px;
  height: calc(100vh - 25px); 
  max-width: 1440px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
`;
const GameWrapper = styled.section`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto;
  overflow: hidden;
  background: #014f86;
  border-radius: 15px;
`;
const Header = styled.header`
  display: grid;
  grid-template-columns: auto 2fr;
  grid-template-rows: 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 25px;
  padding: 0px 25px;
  background: #012a4a;
`;
const Title = styled.h3`
  text-align: center;
  color: #ffd700;
  opacity: 0.8;
`;

const LinkWrapper = styled.nav`
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`;

const OptionLink = styled(Link)`
  width: 45px;
  height: 45px;
  text-decoration: none;
  background-image: url(${settingSVG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
`;
const GameLink = styled(Link)`
  width: 45px;
  height: 45px;
  text-decoration: none;
  background-image: url(${playSVG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
`;

export const Main = () => {
  const [gameLink, setGameLink] = useState(true);

  return (
    <Container>
      <GameWrapper>
        <Header>
          <LinkWrapper>
            {gameLink ? (
              <OptionLink
                onClick={() => setGameLink(prev => !prev)}
                to={'options'}
              >
                
              </OptionLink>
            ) : (
              <GameLink onClick={() => setGameLink(prev => !prev)} to={'game'}>
                
              </GameLink>
            )}
          </LinkWrapper>
          <Title>Хто хоче стати мільйонером?</Title>
        </Header>
        <Outlet />
      </GameWrapper>
    </Container>
  );
};
