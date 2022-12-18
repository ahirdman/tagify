import Card from '../../../Layout/Card/Card';
import './EmptyCard.scss';

interface Props {
  icon: string;
  item: string;
}

const EmptyCard = ({ icon, item }: Props) => {
  return (
    <Card navigate={false}>
      <section className="empty-card">
        <img src={icon} alt="cross" />
        <p className="empty-card__text">select a {item}</p>
      </section>
    </Card>
  );
};

export default EmptyCard;
