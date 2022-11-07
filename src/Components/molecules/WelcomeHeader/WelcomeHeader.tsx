import * as React from 'react';
import './WelcomeHeader.scss';
import { Header } from '../../atoms';

const WelcomeHeader = () => {
  return (
    <section className="header">
      <Header size="LARGE">Current Top Artists</Header>
    </section>
  );
};

export default WelcomeHeader;
