import * as React from 'react';
import './AuthModal.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AuthModal = ({ children }: Props) => {
  return (
    <div className="modal" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default AuthModal;
