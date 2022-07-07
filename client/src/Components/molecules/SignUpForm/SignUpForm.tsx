import * as React from 'react';
import * as Auth from '../../../utils/firebase/auth';
import './SignUpForm.scss';

export interface IAuthError {
  display: boolean;
  message: string;
}

const SignUpForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState({} as IAuthError);

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

    if (password !== confirm) {
      setError({
        display: true,
        message: 'Passwords doesnt match',
      });
    }

    if (password === confirm) {
      Auth.createAccount(email, password, setError);
    }
  };

  return (
    <>
      <div className={error.display ? 'error' : 'error--hidden'}>
        {error.message}
      </div>
      <h1>SIGN UP</h1>
      <form className="sign-up" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="sign-up__input"
          autoFocus
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
    </>
  );
};

export default SignUpForm;
