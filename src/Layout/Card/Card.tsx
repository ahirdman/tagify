import * as React from 'react';
import { CardNav, SearchBar } from '../../Components/molecules';
import './Card.scss';

interface IProps {
  title: string;
  navClick?: any;
  filter?: boolean;
  setFilter?: any;
  children: JSX.Element | JSX.Element[];
}

const Card = ({ title, navClick, filter, setFilter, children }: IProps) => {
  return (
    <div className="card">
      <CardNav title={title} onClick={navClick} />
      {filter && <SearchBar setSearch={setFilter} />}
      {children}
    </div>
  );
};

export default Card;
