import * as React from 'react';
import AuthButton from '../../Components/atoms/AuthButton/AuthButton';
import { handleLogIn } from '../../utils/modules/modules';
import './Login.scss';

const Login = () => {
  return (
    <main className="login">
      <div className="login__logo">TAGIFY</div>
      <div className="login__header"></div>
      <div className="login__buttons">
        <AuthButton
          title="SIGN UP"
          backgroundColor="#1bd760"
          textColor="black"
          onClick={handleLogIn}
        />
        <AuthButton
          title="CONTINUE WITH APPLE"
          backgroundColor="#111111"
          textColor="white"
          onClick={handleLogIn}
        />
        <AuthButton
          title="LOG IN"
          backgroundColor="white"
          onClick={handleLogIn}
        />
      </div>
    </main>
  );
};

export default Login;
