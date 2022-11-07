import * as React from 'react';
import Magnifier from './SearchBar.svg';
import './SearchBar.scss';

interface Props {
  setSearch?: any;
}

const SearchBar = ({ setSearch }: Props) => {
  const [searchString, setSearchString] = React.useState('');

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

export default React.memo(SearchBar);
