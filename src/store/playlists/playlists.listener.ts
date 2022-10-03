import { createListenerMiddleware } from '@reduxjs/toolkit';
import { Spotify } from '../../services/index';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { updateStateDoc, updateSyncStatus } from './playlists.slice';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const playlistSync = createListenerMiddleware();

const startplaylistSyncListening = playlistSync.startListening as AppStartListening;

startplaylistSyncListening({
  actionCreator: updateStateDoc,
  effect: async (action, listenerApi) => {
    const { playlistId, snapshotId } = action.payload.data;
    const state = listenerApi.getState();
    const selectedList = state.playlist.tagLists.find(list => list.isActive === true);

    if (!selectedList.exported) return;

    const token = state.user.spotify.token;

    const result = await Spotify.validateSnapshot(playlistId, snapshotId, token);

    console.log(result);

    const status = snapshotId === result.snapshotId ? 'SYNCED' : 'UNSYNCED';

    listenerApi.dispatch(
      updateSyncStatus({
        sync: status,
      })
    );
  },
});
