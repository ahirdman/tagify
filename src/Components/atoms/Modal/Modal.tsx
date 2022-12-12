import './Modal.scss';

interface IModalProps {
  children: JSX.Element | JSX.Element[];
  type?: 'CENTERED' | 'FULL';
}

const Modal = ({ children, type }: IModalProps) => {
  const className = type === 'FULL' ? 'modal-full' : 'modal';

  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
};

const Confirm = ({ children }: IModalProps) => {
  return <div className="confirm">{children}</div>;
};

export { Modal, Confirm };
