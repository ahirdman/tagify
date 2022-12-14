import { Button, Modal, Backdrop } from '../../Components/atoms';
import { ConnectScreen } from '../../Components/molecules';
import { SignInForm, SignUpForm } from '../../Components/organisms';
import './Login.scss';
import { useAppSelector } from '../../store/hooks';
import { useState } from 'react';

const Login = () => {
  const { loggedIn } = useAppSelector(state => state.user);

  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

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
          <Modal>{loggedIn ? <ConnectScreen autoConnect={false} /> : <SignUpForm />}</Modal>
        </Backdrop>
      )}
      {signInModal && (
        <Backdrop onClick={() => setSignInModal(false)}>
          <Modal>{loggedIn ? <ConnectScreen autoConnect={false} /> : <SignInForm />}</Modal>
        </Backdrop>
      )}
      {loggedIn && (
        <Backdrop>
          <Modal>
            <ConnectScreen autoConnect={false} />
          </Modal>
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
