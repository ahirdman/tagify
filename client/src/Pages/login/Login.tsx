import * as React from 'react';
import AuthButton from '../../Components/atoms/AuthButton/AuthButton';
import Backdrop from '../../Components/atoms/Backdrop/Backdrop';
import AuthForm from '../../Components/molecules/AuthForm/AuthForm';
import './Login.scss';

const Login = () => {
  const [openSignUp, setOpenSignUp] = React.useState<boolean>(false);
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);

  return (
    <main className="login">
      <div className="login__logo">TAGIFY</div>
      <div className="login__header"></div>
      <div className="login__buttons">
        <AuthButton
          title="SIGN UP"
          backgroundColor="#1bd760"
          textColor="black"
          onClick={() => setOpenSignUp(true)}
        />
        <AuthButton
          title="LOG IN"
          backgroundColor="white"
          onClick={() => setOpenSignIn(true)}
        />
      </div>
      {openSignUp && (
        <Backdrop onClick={() => setOpenSignUp(false)}>
          <AuthForm title="SIGN UP" />
        </Backdrop>
      )}
      {openSignIn && (
        <Backdrop onClick={() => setOpenSignIn(false)}>
          <AuthForm title="LOG IN" />
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
