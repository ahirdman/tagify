import * as React from 'react';
import { SelectList, EditList, EmptyCard } from '../../Components/templates';
import List from '../../assets/list.svg';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import {
  setPlaylists,
  selectActiveTagList,
  selectTaglists,
} from '../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Playlist } from '../../store/playlists/playlists.interface';
import { onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import * as Firestore from '../../services/firebase/firestore/firestore.service';

const Lists = () => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector(selectActiveTagList);
  const taglists = useAppSelector(selectTaglists);
  const fireId = useAppSelector(state => state.user.fireId);

  const size: Window = useWindowSize();

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

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <SelectList />
        {selectedList ? <EditList /> : <EmptyCard icon={List} item="list" />}
      </div>
    );
  }

  return <>{selectedList ? <EditList /> : <SelectList />}</>;
};

export default Lists;
