import * as React from 'react';
import './EmptyCard.scss';

interface IEmptyCardProps {
  icon: any;
  item: string;
}

const EmptyCard = ({ icon, item }: IEmptyCardProps) => {
  return (
    <fieldset className="empty-card">
      <legend className="empty-card__title">Selection</legend>
      <section className="empty-card__empty">
        <img src={icon} alt="cross" className="empty-card__empty--icon" />
        <p className="empty-card__empty--text">select a {item}</p>
      </section>
    </fieldset>
  );
};

export default EmptyCard;
