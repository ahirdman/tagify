import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import './WelcomeHeader.scss';

const WelcomeHeader = () => {
  return (
    <section className="header">
      <h1 className="h1">Current Top Artists</h1>
    </section>
  );
};

export default WelcomeHeader;
