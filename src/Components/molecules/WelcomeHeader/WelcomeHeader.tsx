import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import './WelcomeHeader.scss';

const WelcomeHeader = () => {
  const profile = useAppSelector(state => state.user.spotify.profile);
  return (
    <section className="header">
      <img src={profile.image} className="header__profile" />
      <h3 className="header__greeting">Welcome back {profile.name}</h3>
    </section>
  );
};

export default WelcomeHeader;
