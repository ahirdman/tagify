import * as React from 'react';
import './Modal.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  size?: 'SMALL' | 'MEDIUM' | 'LARGE';
}

const Modal = ({ children, size }: Props) => {
  const className = size === 'LARGE' ? 'modal-large' : 'modal';

  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default Modal;
