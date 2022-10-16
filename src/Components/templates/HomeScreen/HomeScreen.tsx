import * as React from 'react';
import Card from '../../../Layout/Card/Card';
import WelcomeHeader from '../../molecules/WelcomeHeader/WelcomeHeader';

const HomeScreen = () => {
  return (
    <Card title="Home">
      <WelcomeHeader />
    </Card>
  );
};

export default HomeScreen;
