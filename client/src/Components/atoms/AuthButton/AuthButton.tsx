import * as React from 'react';
import './AuthButton.scss';

interface IAuthButtonProps {
  title: string;
  backgroundColor: string;
  textColor?: string;
  onClick?: any;
}

const AuthButton = ({
  title,
  backgroundColor,
  textColor,
  onClick,
}: IAuthButtonProps) => {
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
