import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { add } from '../../store/userSlice';
import { HasAccTrueType } from '../../components/auth/submitForm';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #c1e1d6;
  height: 100vh;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 25px;
  gap: 15px;
`;
const Title = styled.span``;
const Button = styled.button``;

export const Auth: React.FC = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();
  const handleChange = () => {
    setHasAccount(prev => !prev);
  };
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userData);

  const hasToken = (data: HasAccTrueType) => {
    if (typeof data == 'string') {
      dispatch(add({ userToken: data }));
    }
    return navigate('/main');
  };

  useEffect(() => {
    userData.userToken.length > 0 ? navigate('/main') : null;
  }, []);
  return (
    <Container>
      <AuthForm
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        hasToken={hasToken}
      />
      {hasAccount ? (
        <ButtonWrapper>
          <Title>Створити аккаунт?</Title>
          <Button onClick={handleChange}>Зареєструватись</Button>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Title>У Вас є аккаунт?</Title>
          <Button onClick={handleChange}>Увійти</Button>
        </ButtonWrapper>
      )}
    </Container>
  );
};
