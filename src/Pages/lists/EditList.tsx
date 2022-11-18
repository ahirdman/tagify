import * as React from 'react';
import { AddTracksModal, PlaylistController } from '../../Components/molecules';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateStateDoc } from '../../store/playlists/playlists.slice';
import { TracksList } from '../../Components/organisms';
import { onSnapshot } from 'firebase/firestore';
import { Firestore } from '../../services';
import Card from '../../Layout/Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { fireIdSelector } from '../../store/user/user.slice';
import { IPlaylist } from '../../store/playlists/playlists.interface';

const EditList = () => {
  const [addTracksModal, setAddTracksModal] = React.useState(false);
  const navigate = useNavigate();

  const { listId } = useParams();
  const dispatch = useAppDispatch();
  const fireId = useAppSelector(fireIdSelector);
  const playlist = useAppSelector(state =>
    state.playlist.playlists.find(list => list.id === listId)
  );

  React.useEffect((): any => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, playlist.name), doc => {
      const tagDocument = doc.data() as IPlaylist;
      // TODO: Conditional update: if the state playlist is the same as the firestore doc, dont dispatch

      dispatch(updateStateDoc({ data: tagDocument }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch, playlist.name]);

  return (
    <Card title={playlist.name} navigate={true}>
      <PlaylistController
        addTracks={() => setAddTracksModal(true)}
        tracks={playlist.tracks}
        status={playlist.status}
      />
      <TracksList tracks={playlist.tracks} onNavigate={navigate} />
      {addTracksModal && (
        <AddTracksModal listName={playlist.name} onClick={() => setAddTracksModal(false)} />
      )}
    </Card>
  );
};

export default EditList;
