import * as React from 'react';
import Card from '../../Layout/Card/Card';
import { Button } from '../../Components/atoms';
import WelcomeHeader from '../../Components/molecules/WelcomeHeader/WelcomeHeader';
import { RecentTags } from '../../Components/organisms';

const Dashboard = () => {
  return (
    <Card title="Home" navigate={false}>
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
