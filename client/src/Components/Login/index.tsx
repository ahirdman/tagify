import * as React from 'react';
import { handleLogIn } from '../../utils/modules/modules';
import './Login.scss';

const Login = () => {
  return (
    <main className="login">
      <button onClick={handleLogIn} className="login__button">
        Login
      </button>
    </main>
  );
};

export default Login;
