import * as React from 'react';
import './Text.scss';

interface IHeaderProps {
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  children: string;
  bold?: boolean;
  color?: string;
}

const Header = ({ size, children, bold, color }: IHeaderProps) => {
  switch (size) {
    case 'LARGE':
      return (
        <h1
          className="h1"
          style={{
            fontStyle: bold ? 'bold' : 'normal',
            color: color ? color : 'white',
          }}
        >
          {children}
        </h1>
      );
    case 'MEDIUM':
      return (
        <h1
          className="h2"
          style={{
            fontStyle: bold ? 'bold' : 'normal',
            color: color ? color : 'white',
          }}
        >
          {children}
        </h1>
      );
    case 'SMALL':
      return (
        <h1
          className="h3"
          style={{
            fontStyle: bold ? 'bold' : 'normal',
            color: color ? color : 'white',
          }}
        >
          {children}
        </h1>
      );
  }
};

interface IBodyProps {
  children: string;
  bold?: boolean;
  grey?: boolean;
  className?: string;
}

const Body = ({ children, bold, grey, className }: IBodyProps) => {
  return (
    <p
      className={grey ? `p3--grey ${className}` : `p3 ${className}`}
      style={{
        fontStyle: bold ? 'bold' : 'normal',
      }}
    >
      {children}
    </p>
  );
};

export { Header, Body };
