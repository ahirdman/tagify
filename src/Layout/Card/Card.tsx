import { Spacer } from '../../Components/atoms';
import { CardNav, SearchBar } from '../../Components/molecules';
import { useAppSelector } from '../../store/hooks';
import './Card.scss';

interface IProps {
  title: string;
  navigate: boolean;
  filter?: boolean;
  setFilter?: any;
  children: JSX.Element | JSX.Element[];
}

const Card = ({ title, navigate, filter, setFilter, children }: IProps) => {
  const playback = useAppSelector(state => state.playback.isActive);
  return (
    <div className="card">
      <CardNav title={title} navigate={navigate} />
      {filter && <SearchBar setSearch={setFilter} />}
      {children}
      {playback && <Spacer />}
    </div>
  );
};

export default Card;
