import * as React from 'react';
import * as Auth from '../../../services/firebase/auth/auth.service';
import { IAuthError } from '../SignUpForm/SignUpForm';
import './SignInForm.scss';

const SignInForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({} as IAuthError);

  const handleInputChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    Auth.logInEmailPassword(email, password, setError);
  };

  return (
    <>
      <div className={error.display ? 'error' : 'error--hidden'}>
        {error.message}
      </div>
      <h1>LOG IN</h1>
      <form className="sign-in" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="sign-in__input"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="sign-in__input"
        />
        <input type="submit" value="LOG IN" className="sign-in__submit" />
      </form>
    </>
  );
};

export default SignInForm;
