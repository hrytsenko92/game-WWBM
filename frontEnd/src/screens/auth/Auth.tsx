import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthForm } from '../../components/auth/AuthForm';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { add, remove, stateType } from '../../store/userSlice';
import { userDataType } from '../../components/auth/submitForm';

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

  const hasToken = (data: userDataType) => {
    console.log(data)
    if (typeof data.token == "string" && typeof data.id == "string") {
       const dt = {
         userID: data.id,
         userToken: data.token,
       };
       dispatch(
         add(dt)
       );
    }
    return navigate('/main');
   
    // localStorage.setItem('token', token);
    // if (typeof localStorage.getItem('token') === 'string') {
    //   return navigate('/main');
    // }
  };

  useEffect(()=>{
    localStorage.getItem('token') ? navigate('/main') : null;
  },[])
  return (
    <Container>
      <AuthForm hasAccount={hasAccount} setHasAccount={setHasAccount} hasToken={hasToken} />
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

  // const hasToken = (token: string) => {
  //   localStorage.setItem('token', token);
  //   if (typeof localStorage.getItem('token') === 'string') {
  //     return navigate('/main');
  //   }
  // };

  // useEffect(() => {
  //   localStorage.getItem('token') ? navigate('/main') : null;
  // }, []);