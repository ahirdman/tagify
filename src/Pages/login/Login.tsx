import * as React from 'react';
import { useContext } from 'react';
import { AuthButton, AuthModal, Backdrop } from '@components/atoms';
import { ConnectScreen, SignInForm, SignUpForm } from '@components/molecules';
import { UserContext } from '../../context/UserContext';
import './Login.scss';

const Login = () => {
  const [openSignUp, setOpenSignUp] = React.useState<boolean>(false);
  const [openSignIn, setOpenSignIn] = React.useState<boolean>(false);

  const user = useContext(UserContext);

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
          <AuthModal>
            {user.loggedIn ? (
              <ConnectScreen autoConnect={false} />
            ) : (
              <SignUpForm />
            )}
          </AuthModal>
        </Backdrop>
      )}
      {openSignIn && (
        <Backdrop onClick={() => setOpenSignIn(false)}>
          <AuthModal>
            {user.loggedIn ? (
              <ConnectScreen autoConnect={false} />
            ) : (
              <SignInForm />
            )}
          </AuthModal>
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
