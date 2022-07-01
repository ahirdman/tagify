import * as React from 'react';
import CardNav from '../../molecules/CardNav/CardNav';
import './EmptyCard.scss';

interface IEmptyCardProps {
  icon: any;
  item: string;
}

const EmptyCard = ({ icon, item }: IEmptyCardProps) => {
  return (
    <div>
      <CardNav title="..." />
      <section className="empty-card">
        <section className="empty-card__empty">
          <img src={icon} alt="cross" className="empty-card__empty--icon" />
          <p className="empty-card__empty--text">select a {item}</p>
        </section>
      </section>
    </div>
  );
};

export default EmptyCard;
