import * as React from 'react';
import { Header, Loader } from '../../atoms';
import { useAppSelector } from '../../../store/hooks';
import './WelcomeHeader.scss';
import { topItemsSelector } from '../../../store/user/user.slice';
import { ITopItem } from '../../../common/common.interface';

const WelcomeHeader = () => {
  const topItems = useAppSelector(topItemsSelector);

  return (
    <section className="header">
      <Header size="LARGE">Current Top Artists</Header>
      <TopArtists items={topItems.items} />
      {topItems.error && <div>ERROR</div>}
      {topItems.loading && <Loader />}
    </section>
  );
};

export default WelcomeHeader;

interface ITopArtistsProps {
  items: ITopItem[];
}

const TopArtists = ({ items }: ITopArtistsProps) => {
  return (
    <ul className="header__items">
      {items.map((item, index) => (
        <li key={index} className="header__item">
          <img src={item.albumArtwork} alt="album" className="header__item--image" />
          <h3 className="header__item--text">{item.artist}</h3>
        </li>
      ))}
    </ul>
  );
};
