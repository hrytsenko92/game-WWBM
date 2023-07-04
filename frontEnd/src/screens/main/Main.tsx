import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export const Main = () => {

  return (
    <>
      <div>
        <header>header</header>
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
