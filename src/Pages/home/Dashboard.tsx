import * as React from 'react';
import Card from '../../Layout/Card/Card';
import { Button } from '../../Components/atoms';
import WelcomeHeader from '../../Components/molecules/WelcomeHeader/WelcomeHeader';
import { RecentTags } from '../../Components/organisms';
import { selectTaglists, setPlaylists } from '../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { onSnapshot } from 'firebase/firestore';
import { Firestore } from '../../services';
import { Playlist } from '../../store/playlists/playlists.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateTag } from '../../Components/molecules';

const Dashboard = () => {
  const [createTagModal, setCreateTagModal] = React.useState(false);

  const dispatch = useAppDispatch();
  const taglists = useAppSelector(selectTaglists);
  const fireId = useAppSelector(state => state.user.fireId);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagCol(fireId), collection => {
      const lists: Playlist[] = [];

      collection.forEach(doc => {
        const data = doc.data();

        const existingList = taglists.find(list => list.name === data.name);

        lists.push({
          id: uuidv4(),
          name: data.name,
          color: data.color,
          type: 'TAG',
          tracks: data.tracks,
          exported: data.exported,
          playlistId: data.playlistId,
          snapshotId: data.snapshotId,
          isActive: existingList ? existingList.isActive : false,
          status: {
            sync: existingList ? existingList.status.sync : 'UNKNOWN',
            exporting: existingList ? existingList.status.exporting : false,
            error: existingList ? existingList.status.error : false,
          },
        });
      });

      dispatch(setPlaylists({ lists }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch]);
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
