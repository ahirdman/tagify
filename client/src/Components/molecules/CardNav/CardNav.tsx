import * as React from 'react';
import useWindowSize from '../../../utils/hooks/window';
import { IWindow } from '../../../utils/interface';
import Back from '../../../assets/go-back.svg';
import './CardNav.scss';

interface ICardNavProps {
  title: string;
  setSelectedTrack?: any;
}

const CardNav = ({ title, setSelectedTrack }: ICardNavProps) => {
  const size: IWindow = useWindowSize();

  if (size.width > 600) {
    return (
      <div className="card-nav">
        <h2 className="card-nav__title">{title}</h2>
      </div>
    );
  }

  return (
    <div className="card-nav">
      <img src={Back} alt="back" onClick={() => setSelectedTrack(undefined)} />
      <h2 className="card-nav__title">{title}</h2>
    </div>
  );
};

export default CardNav;
