import * as React from 'react';
import './Backdrop.scss';

interface IBackdropProps {
  children: any;
  onClick: any;
}

const Backdrop = ({ children, onClick }: IBackdropProps) => {
  return (
    <div className="backdrop" onClick={onClick}>
      {children}
    </div>
  );
};

export default Backdrop;
