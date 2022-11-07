import * as React from 'react';
import { BackButton } from '../../atoms';
import './CardNav.scss';

interface Props {
  title: string;
  navigate: boolean;
}

const CardNav = ({ title, navigate }: Props) => {
  return (
    <div className="card-nav">
      <div className="card-nav__left">{navigate && <BackButton />}</div>
      <div className="card-nav__middle">
        <h2 className="card-nav__middle--title">{title}</h2>
      </div>
      <div className="card-nav__right"></div>
    </div>
  );
};

export default React.memo(CardNav);
