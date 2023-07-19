import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/auth/AuthForm';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { add } from '../../store/userSlice';
import { HasAccTrueType } from '../../components/auth/submitForm';
import { colors } from '../../types/colors';

const Login = styled.div``;
const Registration = styled.div``;
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 25px;
  margin-top: 25%;
  background: rgba(255, 255, 255, 0.11);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.8px);
  -webkit-backdrop-filter: blur(2.8px);

  opacity: 0;
  animation: fadeIn 1.9s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;
const Title = styled.span`
text-align: center;
color: ${colors.white};
opacity: 0.8;
`;
const Button = styled.button`
  width: 150px;
  height: 30px;
  border: 1px solid ${colors.border};
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
`;

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
    <>
      {hasAccount ? (
        <Login>
          <Container>
            <AuthForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              hasToken={hasToken}
            />
              <ButtonWrapper>
                <Title>Зареєструвати користувача?</Title>
                <Button onClick={handleChange}>Реєстрація</Button>
              </ButtonWrapper>

          </Container>
        </Login>
      ) : (
        <Registration>
          <Container>
            <AuthForm
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              hasToken={hasToken}
            />
              <ButtonWrapper>
                <Title>Ви вже зареєстровані?</Title>
                <Button onClick={handleChange}>Увійти</Button>
              </ButtonWrapper>
          </Container>
        </Registration>
      )}
    </>
  );
};
