import * as React from 'react';
import { PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearSelectedList,
  selectActiveTagList,
  updateStateDoc,
} from '../../../store/playlists/playlists.slice';
import { TracksList } from '../../organisms';
import { onSnapshot } from 'firebase/firestore';
import { Firestore, IFirestoreTagDocument } from '../../../services';
import Card from '../../../Layout/Card/Card';

const EditList = () => {
  const selected = useAppSelector(selectActiveTagList);

  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, selected.name), doc => {
      const tagDocument = doc.data();
      // TODO: Conditional update: if the state playlist is the same as the firestore doc, dont dispatch

      dispatch(updateStateDoc({ data: tagDocument as IFirestoreTagDocument }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch, selected.name]);

  return (
    <Card title={selected.name} navClick={() => dispatch(clearSelectedList())}>
      <PlaylistController />
      <TracksList tracks={selected.tracks} />
    </Card>
  );
};

export default EditList;
