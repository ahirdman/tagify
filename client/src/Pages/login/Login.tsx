import * as React from 'react';
import AuthButton from '../../Components/atoms/AuthButton/AuthButton';
import Backdrop from '../../Components/atoms/Backdrop/Backdrop';
import SignUpForm from '../../Components/molecules/SignUpForm/SignUpForm';
import { handleLogIn } from '../../utils/modules/modules';
import './Login.scss';

interface ILoginProps {
  setLoggedIn: any;
}

const Login = ({ setLoggedIn }: ILoginProps) => {
  const [openSignUp, setOpenSignUp] = React.useState<boolean>(false);

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
          title="CONTINUE WITH APPLE"
          backgroundColor="#111111"
          textColor="white"
          onClick={() => console.log('apple')}
        />
        <AuthButton
          title="LOG IN"
          backgroundColor="white"
          onClick={handleLogIn}
        />
      </div>
      {openSignUp && (
        <Backdrop onClick={() => setOpenSignUp(false)}>
          <SignUpForm setLoggedIn={setLoggedIn} />
        </Backdrop>
      )}
    </main>
  );
};

export default Login;
