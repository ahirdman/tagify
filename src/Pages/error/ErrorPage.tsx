import * as React from 'react';
import { useRouteError } from 'react-router-dom';
import './/ErrorPage.scss';

interface IRouterError {
  status: number;
  statusText: string;
}

const ErrorPage = () => {
  const error = useRouteError() as IRouterError;

  return (
    <div className="error-page">
      <h1 className="error-page__header">Oops!</h1>
      <p className="error-page__body">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status || error.statusText || 'Unknown Error'}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
