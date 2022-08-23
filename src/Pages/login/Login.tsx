import * as React from 'react';
import { useContext } from 'react';
import AuthButton from '../../Components/atoms/AuthButton/AuthButton';
import AuthModal from '../../Components/atoms/AuthModal/AuthModal';
import Backdrop from '../../Components/atoms/Backdrop/Backdrop';
import ConnectScreen from '../../Components/molecules/ConnectScreen/ConnectScreen';
import SignInForm from '../../Components/molecules/SignInForm/SignInForm';
import SignUpForm from '../../Components/molecules/SignUpForm/SignUpForm';
import { UserContext } from '../../utils/context/UserContext';
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
