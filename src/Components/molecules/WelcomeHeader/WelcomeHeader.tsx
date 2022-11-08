import * as React from 'react';
import { Header, Loader } from '../../atoms';
import { useAppSelector } from '../../../store/hooks';
import './WelcomeHeader.scss';
import { topItemsSelector } from '../../../store/user/user.slice';

const WelcomeHeader = () => {
  const topItems = useAppSelector(topItemsSelector);

  return (
    <section className="header">
      <Header size="LARGE">Current Top Artists</Header>
      <div className="header__items">
        {topItems.items.map((item, index) => (
          <div key={index} className="header__item">
            <img src={item.artwork} alt="album" className="header__item--image" />
            <Header size="SMALL">{item.aritst}</Header>
          </div>
        ))}
        {topItems.error && <div>ERROR</div>}
        {topItems.loading && <Loader />}
      </div>
    </section>
  );
};

export default WelcomeHeader;
