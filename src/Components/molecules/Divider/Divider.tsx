import './Divider.scss';

interface IProps {
  title: string;
}

const Divider = ({ title }: IProps) => {
  return (
    <div className="divider">
      <p className="divider__title">{title}</p>
    </div>
  );
};

export default Divider;
