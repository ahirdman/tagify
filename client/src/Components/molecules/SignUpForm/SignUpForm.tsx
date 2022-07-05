import * as React from 'react';
import { createAccount } from '../../../utils/firebase/auth';
import { handleLogIn } from '../../../utils/modules/modules';
import './SignUpForm.scss';

interface ISignUpFormProps {
  setLoggedIn: any;
}

const SignUpForm = ({ setLoggedIn }: ISignUpFormProps) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const clearFields = (): void => {
    setEmail('');
    setPassword('');
    setConfirm('');
  };

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirm') setConfirm(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setLoggedIn(true);
    createAccount(email, password, handleLogIn);
    clearFields();
  };

  return (
    <div className="sign-up" onClick={e => e.stopPropagation()}>
      <h1>SIGN UP</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="sign-up__input"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="sign-up__input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm"
          value={confirm}
          onChange={handleInputChange}
          className="sign-up__input"
        />
        <input type="submit" value="SIGN UP" className="sign-up__submit" />
      </form>
    </div>
  );
};

export default SignUpForm;
