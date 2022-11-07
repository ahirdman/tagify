import * as React from 'react';
import { Button, AuthModal, Backdrop } from '../../Components/atoms';
import { ConnectScreen } from '../../Components/molecules';
import { SignInForm, SignUpForm } from '../../Components/organisms';
import './Login.scss';
import { useAppSelector } from '../../store/hooks';

const Login = () => {
  const { loggedIn } = useAppSelector(state => state.user);

  const [signInModal, setSignInModal] = React.useState(false);
  const [signUpModal, setSignUpModal] = React.useState(false);

  return (
    <main className="login">
      <div className="login__logo">TAGIFY</div>
      <div className="login__header"></div>
      <div className="login__buttons">
        <Button
          title="SIGN UP"
          backgroundColor="#1bd760"
          textColor="black"
          onClick={() => setSignUpModal(true)}
        />
        <Button title="LOG IN" backgroundColor="white" onClick={() => setSignInModal(true)} />
      </div>
      {signUpModal && (
        <Backdrop onClick={() => setSignUpModal(false)}>
          <AuthModal>{loggedIn ? <ConnectScreen autoConnect={false} /> : <SignUpForm />}</AuthModal>
        </Backdrop>
      )}
      {signInModal && (
        <Backdrop onClick={() => setSignInModal(false)}>
          <AuthModal>{loggedIn ? <ConnectScreen autoConnect={false} /> : <SignInForm />}</AuthModal>
        </Backdrop>
      )}
      {loggedIn && (
        <Backdrop>
          <AuthModal>
            <ConnectScreen autoConnect={false} />
          </AuthModal>
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
