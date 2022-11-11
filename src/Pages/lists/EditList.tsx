import * as React from 'react';
import { AddTracksModal, PlaylistController } from '../../Components/molecules';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateStateDoc } from '../../store/playlists/playlists.slice';
import { TracksList } from '../../Components/organisms';
import { onSnapshot } from 'firebase/firestore';
import { Firestore, IFirestoreTagDocument } from '../../services';
import Card from '../../Layout/Card/Card';
import { useParams } from 'react-router-dom';
import { fireIdSelector } from '../../store/user/user.slice';

const EditList = () => {
  const [addTracksModal, setAddTracksModal] = React.useState(false);

  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const fireId = useAppSelector(fireIdSelector);
  const playlist = useAppSelector(state =>
    state.playlist.playlists.find(list => list.id === listId)
  );

  React.useEffect((): any => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, playlist.name), doc => {
      const tagDocument = doc.data();
      // TODO: Conditional update: if the state playlist is the same as the firestore doc, dont dispatch

      dispatch(updateStateDoc({ data: tagDocument as IFirestoreTagDocument }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch, playlist]);

  return (
    <Card title={playlist.name} navigate={true}>
      <PlaylistController
        addTracks={() => setAddTracksModal(true)}
        tracks={playlist.tracks}
        status={playlist.status}
      />
      <TracksList tracks={playlist.tracks} />
      {addTracksModal && <AddTracksModal onClick={() => setAddTracksModal(false)} />}
    </Card>
  );
};

export default EditList;
