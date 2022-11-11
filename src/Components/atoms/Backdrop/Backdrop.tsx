import * as React from 'react';
import './Backdrop.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  modalPosition?: 'CENTER' | 'BOTTOM';
}

const Backdrop = ({ children, onClick, modalPosition }: Props) => {
  return (
    <div
      className="backdrop"
      style={modalPosition === 'BOTTOM' && { alignItems: 'flex-end' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
