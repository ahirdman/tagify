import * as React from 'react';
import Card from '../../Layout/Card/Card';
import { Button } from '../../Components/atoms';
import WelcomeHeader from '../../Components/molecules/WelcomeHeader/WelcomeHeader';
import { RecentTags } from '../../Components/organisms';
import { getAllTags } from '../../store/playlists/playlists.slice';
import { useAppDispatch } from '../../store/hooks';
import { CreateTag } from '../../Components/molecules';

const Dashboard = () => {
  const [createTagModal, setCreateTagModal] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  return (
    <Card title="Home" navigate={false}>
      <div
        style={{
          padding: '15px',
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
          <Button
            title="Create new tag"
            backgroundColor="black"
            textColor="white"
            onClick={() => setCreateTagModal(true)}
          />
        </div>
      </div>
      {createTagModal && <CreateTag onClick={() => setCreateTagModal(false)} />}
    </Card>
  );
};

export default Dashboard;
