import * as React from 'react';
import './SearchBar.scss';

interface Props {
  icon: string;
  setSearch?: any;
}

const SearchBar = ({ icon, setSearch }: Props) => {
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
      <img src={icon} alt="search" className="search--icon" />
    </form>
  );
};

export default React.memo(SearchBar);
