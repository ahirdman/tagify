import * as React from 'react';
import * as Auth from '../../../utils/firebase/auth';
import './AuthForm.scss';

interface IAuthFormProps {
  title: string;
}

const AuthForm = ({ title }: IAuthFormProps) => {
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
      Auth.createAccount(email, password);
    }

    if (title === 'LOG IN') {
      Auth.logInEmailPassword(email, password);
    }

    clearFields();
  };

  return (
    <>
      <h1>{title}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth-form__input"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth-form__input"
        />
        {title === 'SIGN UP' && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm"
            value={confirm}
            onChange={handleInputChange}
            className="auth-form__input"
          />
        )}
        <input type="submit" value={title} className="auth-form__submit" />
      </form>
    </>
  );
};

export default AuthForm;
