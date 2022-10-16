import * as React from 'react';
import './Button.scss';

interface Props {
  title: string;
  backgroundColor: string;
  textColor?: string;
  width?: string;
  border?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ title, backgroundColor, textColor, width, border, onClick }: Props) => {
  return (
    <button
      className="button"
      style={{ backgroundColor, color: textColor, width, border }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
