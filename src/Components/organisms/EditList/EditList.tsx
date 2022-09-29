import * as React from 'react';
import './EditList.scss';
import { CardNav, PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearSelectedList, updateStateDoc } from '../../../store/playlists/playlists.slice';
import { TracksList } from '..';
import { onSnapshot } from 'firebase/firestore';
import { Firestore, IFirestoreTagDocument } from '../../../services';

const EditList = () => {
  const selected = useAppSelector(state => state.playlist.selectedList);
  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, selected.name), doc => {
      const tagDocument = doc.data();
<<<<<<< HEAD
      // status {} is local and not stored in firestore
=======

>>>>>>> origin
      // TODO: Conditional update: if the state playlist is the same as the firestore doc, dont dispatch
      dispatch(updateStateDoc({ doc: tagDocument as IFirestoreTagDocument }));
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch, selected.name]);

  return (
    <div className="edit-list">
      <CardNav title={selected.name} onClick={() => dispatch(clearSelectedList())} />
      <PlaylistController />
      <div className="edit-list__header"></div>
      <TracksList tracks={selected.tracks} />
    </div>
  );
};

export default EditList;
