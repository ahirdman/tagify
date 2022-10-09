import * as React from 'react';
import './AuthButton.scss';

interface Props {
  title: string;
  backgroundColor: string;
  textColor?: string;
  width?: string;
  border?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const AuthButton = ({ title, backgroundColor, textColor, width, border, onClick }: Props) => {
  return (
    <button
      className="authButton"
      style={{ backgroundColor, color: textColor, width, border }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AuthButton;
