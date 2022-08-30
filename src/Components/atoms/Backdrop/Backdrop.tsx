import * as React from 'react';
import './Backdrop.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Backdrop = ({ children, onClick }: Props) => {
  return (
    <div className="backdrop" onClick={onClick}>
      {children}
    </div>
  );
};

export default Backdrop;
