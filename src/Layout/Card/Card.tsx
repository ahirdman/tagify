import { Spacer } from '../../Components/atoms';
import { CardNav, SearchBar } from '../../Components/molecules';
import { useAppSelector } from '../../store/hooks';
import './Card.scss';

interface IProps {
  navigate: boolean;
  filter?: boolean;
  filterBtn?: boolean;
  setFilter?: any;
  children: JSX.Element | JSX.Element[];
}

const Card = ({ navigate, filter, filterBtn, setFilter, children }: IProps) => {
  const playback = useAppSelector(state => state.playback.isActive);
  return (
    <div className="card">
      <CardNav navigate={navigate} filterBtn={filterBtn} />
      {filter && <SearchBar setSearch={setFilter} />}
      {children}
      {playback && <Spacer />}
    </div>
  );
};

export default Card;
