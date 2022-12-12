import { useState } from 'react';
import './Form.scss';

interface IProps {
  type: 'email' | 'passowrd' | 'text';
  placeholder: string;
  submitValue: string;
  onSubmit: (input: string) => void;
}

const Form = ({ type, placeholder, submitValue, onSubmit }: IProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form__input"
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={e => setInputValue(e.currentTarget.value)}
        autoFocus
      />
      <input type="submit" value={submitValue} className="form__submit" />
    </form>
  );
};

export default Form;
