import { createBrowserRouter } from 'react-router-dom';
import { Main } from './screens/main/Main.tsx';
import { Auth } from './screens/auth/Auth.tsx';
import { Game } from './screens/main/Game.tsx';
import { Options } from './screens/main/Options.tsx';
import { ErrorPage } from './screens/Error.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        index: true,
        element: <Game />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'options',
        element: <Options />,
      },
    ],
  },
]);
