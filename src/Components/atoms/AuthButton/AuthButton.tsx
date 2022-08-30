import * as React from 'react';
import './AuthButton.scss';

interface Props {
  title: string;
  backgroundColor: string;
  textColor?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const AuthButton = ({ title, backgroundColor, textColor, onClick }: Props) => {
  return (
    <button
      className="authButton"
      style={{ backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AuthButton;
