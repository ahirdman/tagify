import * as React from 'react';
import Card from '../../../Layout/Card/Card';
import { Button } from '../../atoms';
import WelcomeHeader from '../../molecules/WelcomeHeader/WelcomeHeader';
import { RecentTags } from '../../organisms';

const Dashboard = () => {
  return (
    <Card title="Home">
      <div
        style={{
          padding: '10px',
        }}
      >
        <WelcomeHeader />
        <RecentTags />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button title="Create new tag" backgroundColor="black" textColor="white" />
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;
