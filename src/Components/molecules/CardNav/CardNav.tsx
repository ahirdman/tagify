import * as React from 'react';
import Back from '../../../assets/back.svg';
import './CardNav.scss';

interface Props {
  title: string;
  onClick?: any;
}

const CardNav = ({ title, onClick }: Props) => {
  return (
    <div className="card-nav">
      {typeof onClick !== 'undefined' ? (
        <img
          src={Back}
          alt="back"
          onClick={onClick}
          className="card-nav__back"
        />
      ) : null}
      <h2 className="card-nav__title">{title}</h2>
    </div>
  );
};

export default React.memo(CardNav);
