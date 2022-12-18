import { memo, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { BackButton } from '../../atoms';
import './CardNav.scss';

const Filter = () => {
  const [filter, setFilter] = useState();

  return <button className="filter">Filter</button>;
};

interface Props {
  navigate: boolean;
  filterBtn?: boolean;
}

const CardNav = ({ navigate, filterBtn }: Props) => {
  const profilePic = useAppSelector(state => state.user.spotify.profile.image);

  return (
    <div className="card-nav">
      <div className="card-nav__left">
        {navigate && <BackButton />}
        {filterBtn && <Filter />}
      </div>
      <div className="card-nav__middle">
        <h2 className="card-nav__middle--title"></h2>
      </div>
      <div className="card-nav__right">
        <img src={profilePic} alt="profile" className="card-nav__profile" />
      </div>
    </div>
  );
};

export default memo(CardNav);
