import * as React from 'react';
import { Firestore, SavedTracksData } from '../../../services';
import { updateSync } from '../../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './PlaylistController.scss';
import { onSnapshot } from 'firebase/firestore';
import { ExportButton } from '../../atoms';

const lengthOfPlaylist = (tracksArr: SavedTracksData[]) => {
  const ms = tracksArr.map(track => track.duration).reduce((acc, curr) => acc + curr, 0);

  return (ms / 1000 / 60).toFixed(1);
};

const PlaylistData = () => {
  const dispatch = useAppDispatch();
  const { sync } = useAppSelector(state => state.playlist.selectedList.status);
  const { fireId } = useAppSelector(state => state.user);
  const selected = useAppSelector(state => state.playlist.selectedList);
  const { tracks, name } = selected;
  const { snapshotId } = selected.spotifySync;

  const length = lengthOfPlaylist(tracks);

  React.useLayoutEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagDoc(fireId, name), doc => {
      const tagDocument = doc.data();
      console.log(1, tagDocument.spotifySync.snapshotId);
      console.log(2, snapshotId);

      if (tagDocument.spotifySync.snapshotId !== snapshotId) {
        console.log('snapshotID is not identical');
        dispatch(updateSync({ sync: 'UNSYNCED' }));
      }

      if (tagDocument.spotifySync.snapshotId === snapshotId) {
        console.log('snapshotID is identical');
        dispatch(updateSync({ sync: 'SYNCED' }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [fireId, name, dispatch, snapshotId]);

  return (
    <div className="playlist">
      <section className="playlist__data">
        <p className="playlist__data--text">{tracks.length} tracks</p>
        <p className="playlist__data--text">{length} minutes</p>
        <p className="playlist__data--text">
          Playlist is{sync !== 'SYNCED' ? ' not ' : ' '}synced!
        </p>
      </section>
      <section className="playlist__control">
        <button
          className="playlist__button playlist__button--edit"
          onClick={e => {
            e.preventDefault();
            console.log('edit list');
          }}
        >
          Edit
        </button>
        <ExportButton />
      </section>
    </div>
  );
};

export default PlaylistData;
