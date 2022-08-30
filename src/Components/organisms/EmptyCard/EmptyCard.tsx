import * as React from 'react';
import { CardNav } from '../../molecules';
import './EmptyCard.scss';

interface Props {
  icon: string;
  item: string;
}

const EmptyCard = ({ icon, item }: Props) => {
  return (
    <div className="empty-card">
      <CardNav title="..." />
      <section className="empty-card__empty">
        <img src={icon} alt="cross" className="empty-card__empty--icon" />
        <p className="empty-card__empty--text">select a {item}</p>
      </section>
    </div>
  );
};

export default EmptyCard;
