import { FC } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../types/colors';

const Container = styled.section`
display: flex;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
`;
const OpsWrapper = styled.div`
  min-width: 300px;
  min-height: 200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  row-gap: 25px;
`;
const Title = styled.h1`
font-size: 25px;
font-weight: 600;
color: ${colors.gold};
`
const Message = styled.p`
padding: 10px;
`;
const Text = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gold};
`;
const LinkHomePage = styled(Link)`
font-size: 20px;
font-weight: 600;
color: ${colors.red};
`

export const ErrorPage: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <OpsWrapper>
          <Title>Oops! {error.status}</Title>
          {error.data?.message && (
            <Message>
              <Text>{error.data.message}</Text>
            </Message>
          )}
          <LinkHomePage to={'/'}>Home page</LinkHomePage>
        </OpsWrapper>
      </Container>
    );
  } else if (error instanceof Error) {
    return (
      <Container>
        <OpsWrapper>
          <Title>Oops! Unexpected Error</Title>
          <Message>
            <Text>{error.message}</Text>
          </Message>
          <LinkHomePage to={'/'}>Home page</LinkHomePage>
        </OpsWrapper>
      </Container>
    );
  } else {
    return <></>;
  }
};
