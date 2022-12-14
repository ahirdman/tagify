import Magnifier from './SearchBar.svg';
import './SearchBar.scss';
import { memo, useState } from 'react';

interface Props {
  setSearch?: any;
}

const SearchBar = ({ setSearch }: Props) => {
  const [searchString, setSearchString] = useState('');

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const query = event.currentTarget.value;
    setSearchString(query);
    if (setSearch) {
      setSearch(query);
    }
  };

  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <input type="text" className="search--input" value={searchString} onChange={handleOnChange} />
      <Magnifier className="search--icon" />
    </form>
  );
};

export default memo(SearchBar);
