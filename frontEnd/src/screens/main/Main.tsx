import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../public/logo.png'

const Container = styled.section`
  background-color: #92ccce;
  border: 1px solid red;
  height: 100vh;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto;
`;
const Header = styled.header`
  background-color: #b29f83;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;
const Logo = styled.img`
width: auto;
height: 80px;
object-position: center;
object-fit: cover;
`;
const Title = styled.h3``;

const LinkWrapper = styled.nav`
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`;

const OptionLink = styled(Link)`
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
width: 120px;
height: 50px;
border: 1px solid blue;
background-color: #6c98eb;
text-decoration: none;
`;
const GameLink = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border: 1px solid blue;
  background-color: #6c98eb;
  text-decoration: none;
`;

export const Main = () => {

  return (
    <Container>
      <Header>
        <LinkWrapper>
          <GameLink to={'game'}>Гра</GameLink>
          <OptionLink to={'options'}>Налаштування</OptionLink>
        </LinkWrapper>
        <Title>Хто хоче стати мільйонером?</Title>
        <Logo src={logo} />
      </Header>
      <Outlet />
    </Container>
  );
};
