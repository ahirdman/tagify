import * as React from 'react';
import {
  createAccount,
  logInEmailPassword,
} from '../../../utils/firebase/auth';
import './AuthForm.scss';

interface IAuthFormProps {
  title: string;
  setLoggedIn: any;
}

const AuthForm = ({ title, setLoggedIn }: IAuthFormProps) => {
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

    if (title === 'SIGN UP') {
      createAccount(email, password);
    }

    if (title === 'LOG IN') {
      logInEmailPassword(email, password);
    }

    clearFields();
  };

  return (
    <div className="auth" onClick={e => e.stopPropagation()}>
      <h1>{title}</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth__input"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth__input"
        />
        {title === 'SIGN UP' && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={confirm}
            onChange={handleInputChange}
            className="auth__input"
          />
        )}
        <input type="submit" value={title} className="auth__submit" />
      </form>
    </div>
  );
};

export default AuthForm;
