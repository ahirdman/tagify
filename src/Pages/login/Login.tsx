import * as React from 'react';
import { Button, AuthModal, Backdrop } from '../../Components/atoms';
import { ConnectScreen } from '../../Components/molecules';
import { SignInForm, SignUpForm } from '../../Components/organisms';
import { toggleSignInModal, toggleSignUpModal } from '../../store/ui/ui.slice';
import './Login.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Login = () => {
  const { signInModal, signUpModal } = useAppSelector(state => state.ui);
  const { loggedIn } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  return (
    <main className="login">
      <div className="login__logo">TAGIFY</div>
      <div className="login__header"></div>
      <div className="login__buttons">
        <Button
          title="SIGN UP"
          backgroundColor="#1bd760"
          textColor="black"
          onClick={() => dispatch(toggleSignUpModal())}
        />
        <Button
          title="LOG IN"
          backgroundColor="white"
          onClick={() => dispatch(toggleSignInModal())}
        />
      </div>
      {signUpModal && (
        <Backdrop onClick={() => dispatch(toggleSignUpModal())}>
          <AuthModal>{loggedIn ? <ConnectScreen autoConnect={false} /> : <SignUpForm />}</AuthModal>
        </Backdrop>
      )}
      {signInModal && (
        <Backdrop onClick={() => dispatch(toggleSignInModal())}>
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
