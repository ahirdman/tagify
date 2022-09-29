import { createListenerMiddleware } from '@reduxjs/toolkit';
import { Spotify } from '../../services/index';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { updateStateDoc, updateSync } from './playlists.slice';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const playlistSync = createListenerMiddleware();

const startplaylistSyncListening = playlistSync.startListening as AppStartListening;

startplaylistSyncListening({
  actionCreator: updateStateDoc,
  effect: async (action, listenerApi) => {
    const { playlistId, snapshotId } = action.payload.doc.spotifySync;
    const state = listenerApi.getState();
<<<<<<< HEAD
    const exported = state.playlist.selectedList.spotifySync.exported;

    if (!exported) return;

    const token = state.user.spotify.token;

=======
    const token = state.user.spotify.token;

    // TODO: is there a case when spotify doesnt have to be checked?
>>>>>>> origin
    const result = await Spotify.validateSnapshot(playlistId, snapshotId, token);

    const status = snapshotId === result.snapshotId ? 'SYNCED' : 'UNSYNCED';

    listenerApi.dispatch(
      updateSync({
        sync: status,
      })
    );
  },
});
