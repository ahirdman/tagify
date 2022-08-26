import * as React from 'react';
import useStoredRef from '../../../hooks/useStoredRef';
import './SearchBar.scss';

interface ISearchBarProps {
  icon: any;
  setSearch: any;
}

const SearchBar = ({ icon, setSearch }: ISearchBarProps) => {
  const [searchString, _setSearchString] = React.useState('');

  const handleReturn = (prevState: string) => {
    setSearchString(prevState);
    setSearch(prevState);
  };

  const setSearchString = useStoredRef(
    searchString,
    _setSearchString,
    'searchString',
    handleReturn
  );

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const query = event.currentTarget.value;
    setSearchString(query);
    setSearch(query);
  };

  return (
    <form className="search" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        className="search--input"
        value={searchString}
        onChange={handleOnChange}
      />
      <img src={icon} alt="search" className="search--icon" />
    </form>
  );
};

export default React.memo(SearchBar);
