import Card from '../../Layout/Card/Card';
import { Button } from '../../Components/atoms';
import { RecentTags } from '../../Components/organisms';
import { getAllTags } from '../../store/playlists/playlists.slice';
import { useAppDispatch } from '../../store/hooks';
import { CreateTag, StatsOverview } from '../../Components/molecules';
import './Dashboard.scss';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [createTagModal, setCreateTagModal] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  return (
    <Card navigate={false}>
      <div className="dashboard">
        <StatsOverview />
        <RecentTags />
        <Button
          title="Create new tag"
          backgroundColor="black"
          textColor="white"
          onClick={() => setCreateTagModal(true)}
        />
        {createTagModal && <CreateTag onClick={() => setCreateTagModal(false)} />}
      </div>
    </Card>
  );
};

export default Dashboard;
