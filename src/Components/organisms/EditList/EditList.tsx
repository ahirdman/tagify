import * as React from 'react';
import './EditList.scss';
import { CardNav, PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearSelectedList, setSelectedList } from '../../../store/playlists/playlists.slice';
import { TracksList } from '..';
import { onSnapshot } from 'firebase/firestore';
import { Firestore } from '../../../services';
import { SelectedList } from '../../../store/playlists/playlists.interface';
import * as assert from 'assert';

const EditList = () => {
  const selected = useAppSelector(state => state.playlist.selectedList);
  const fireId = useAppSelector(state => state.user.fireId);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // snapshot Id will always be identical if no check with spotify, check spotify before comparison

    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, selected.name), doc => {
      // Listen to changes in selected document
      // status {} is local and not stored in firestore

      const tagDocument = doc.data();
      // const newListState = selected

      // if (selected.name !== tagDocument.name) {
      //   newListState.name = tagDocument.name
      // }
      console.log(assert.deepStrictEqual(tagDocument, selected));

      // lists.push({
      //   name: data.name,
      //   color: data.color,
      //   tracks: data.tracks,
      //   spotifySync: {
      //     exported: data.exported,
      //     playlistId: data.playlistId,
      //     snapshotId: data.snapshotId,
      //   },
      // });
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, dispatch]);

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
