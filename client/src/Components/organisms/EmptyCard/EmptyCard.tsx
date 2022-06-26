import * as React from 'react';
import './EmptyCard.scss';

interface IEmptyCardProps {
  icon: any;
  item: string;
}

const EmptyCard = ({ icon, item }: IEmptyCardProps) => {
  return (
    <section className="empty-card">
      <h2 className="empty-card__title">Selection</h2>
      <section className="empty-card__empty">
        <img src={icon} alt="cross" className="empty-card__empty--icon" />
        <p className="empty-card__empty--text">select a {item}</p>
      </section>
    </section>
  );
};

export default EmptyCard;
