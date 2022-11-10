import * as React from 'react';
import './Modal.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Modal = ({ children }: Props) => {
  return (
    <div className="modal" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default Modal;
