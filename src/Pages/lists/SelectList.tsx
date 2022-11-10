import * as React from 'react';
import { setPlaylists, selectTaglists } from '../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Playlist } from '../../store/playlists/playlists.interface';
import { onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import * as Firestore from '../../services/firebase/firestore/firestore.service';
import { MixedList, TagList } from '../../Components/organisms';
import { Divider } from '../../Components/molecules';
import Card from '../../Layout/Card/Card';

const SelectList = () => {
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
          id: data.id,
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
    <Card title="Tags" navigate={false}>
      <Divider title="TAGS" />
      <TagList />
      <Divider title="MIXED TAGS" />
      <MixedList />
    </Card>
  );
};

export default SelectList;
