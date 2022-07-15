import * as React from 'react';
import './AuthModal.scss';

interface IAuthModalProps {
  children: JSX.Element | JSX.Element[];
}

const AuthModal = ({ children }: IAuthModalProps) => {
  return (
    <div className="modal" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default AuthModal;
