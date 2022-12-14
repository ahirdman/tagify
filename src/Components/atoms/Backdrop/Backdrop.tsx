import { Delete } from '../Buttons/Buttons.svg';
import './Backdrop.scss';

interface IProps {
  children: JSX.Element | JSX.Element[];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  modalPosition?: 'CENTER' | 'BOTTOM';
}

const Backdrop = ({ children, onClick, modalPosition }: IProps) => {
  return (
    <div
      className="backdrop"
      style={{ justifyContent: modalPosition === 'BOTTOM' ? 'flex-end' : 'center' }}
      onClick={onClick}
    >
      <div
        className="backdrop__void"
        style={{ width: modalPosition === 'BOTTOM' ? '100%' : '80vw' }}
      >
        <Delete className="backdrop__close" />
      </div>
      {children}
    </div>
  );
};

export default Backdrop;
