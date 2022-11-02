import * as React from 'react';
import Card from '../../../Layout/Card/Card';
import { Button } from '../../atoms';
import WelcomeHeader from '../../molecules/WelcomeHeader/WelcomeHeader';
import { RecentTags } from '../../organisms';

const Dashboard = () => {
  return (
    <Card title="Home">
      <WelcomeHeader />
      <RecentTags />
      <Button title="Create new tag" backgroundColor="black" textColor="white" />
    </Card>
  );
};

export default Dashboard;
