import * as React from 'react';
import { PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearSelectedList, updateStateDoc } from '../../../store/playlists/playlists.slice';
import { TracksList } from '../../organisms';
import { onSnapshot } from 'firebase/firestore';
import { Firestore, IFirestoreTagDocument } from '../../../services';
import Card from '../../../Layout/Card/Card';
import { useParams } from 'react-router';

const EditList = () => {
  const { listId } = useParams();

  const playlist = useAppSelector(state =>
    state.playlist.playlists.find(list => list.id === listId)
  );

  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, playlist.name), doc => {
      const tagDocument = doc.data();
      // TODO: Conditional update: if the state playlist is the same as the firestore doc, dont dispatch

      dispatch(updateStateDoc({ data: tagDocument as IFirestoreTagDocument }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch, playlist.name]);

  return (
    <Card title={playlist.name} navClick={() => dispatch(clearSelectedList())}>
      <PlaylistController tracks={playlist.tracks} status={playlist.status} />
      <TracksList tracks={playlist.tracks} />
    </Card>
  );
};

export default EditList;
