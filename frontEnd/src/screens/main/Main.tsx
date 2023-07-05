import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Main = () => {
  const navigate = useNavigate();
  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
      <div>
        <header>header</header>
        <button onClick={handleExit}>Exit</button>
        <nav>
          <Link
            // onClick={() => setIsOpen(false)}
            to={'game'}
          >
            Game
          </Link>
          <Link
            // onClick={() => setIsOpen(false)}
            to={'options'}
          >
            Options
          </Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
