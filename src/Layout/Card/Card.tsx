import * as React from 'react';
import { Spacer } from '../../Components/atoms';
import { CardNav, SearchBar } from '../../Components/molecules';
import { useAppSelector } from '../../store/hooks';
import './Card.scss';

interface IProps {
  title: string;
  navClick?: any;
  filter?: boolean;
  setFilter?: any;
  children: JSX.Element | JSX.Element[];
}

const Card = ({ title, navClick, filter, setFilter, children }: IProps) => {
  const playback = useAppSelector(state => state.playback.isActive);
  return (
    <div className="card">
      <CardNav title={title} onClick={navClick} />
      {filter && <SearchBar setSearch={setFilter} />}
      {children}
      {playback && <Spacer />}
    </div>
  );
};

export default Card;
