import { FC } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
export const ErrorPage: FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log(error.status);
    return (
      <div>
        <h1>Oops! {error.status}</h1>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
        <Link to={'/'}>
          Home page
        </Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Oops! Unexpected Error</h1>
        <p>
          <i>{error.message}</i>
        </p>
        <Link to={'/'}>
          Home page
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
};
