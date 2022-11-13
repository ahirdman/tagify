import * as React from 'react';
import { Delete } from '../Buttons/Buttons.svg';
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
      style={{ alignItems: modalPosition === 'BOTTOM' ? 'flex-end' : 'center' }}
      onClick={onClick}
    >
      <Delete className="backdrop__close" />
      {children}
    </div>
  );
};

export default Backdrop;
