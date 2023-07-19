import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/store/store';
import { createGlobalStyle, styled } from 'styled-components';
import { colors } from './types/colors';

const Unsupported = styled.h3``;
const Container = styled.section``;
const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #051937, #150d5f, #144a8b, #1766ba, #1283eb);
  background-size: 400% 400%;
	animation: gradient 25s ease infinite;
  @keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
  ${Container}{
    display: none;
  }
  ${Unsupported}{
    display: block;
    text-align: center;
    color: ${colors.white};
  }
  @media screen and (min-width: 375px) {
    ${Container}{
    display: block;
  }
  ${Unsupported}{
    display: none;
  }
  }
}
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Unsupported>Розмір екрану не підтримується...</Unsupported>
    <Container>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </Container>
  </React.StrictMode>
);
