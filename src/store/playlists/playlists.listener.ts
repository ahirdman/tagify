import { createListenerMiddleware } from '@reduxjs/toolkit';
import { Spotify } from '../../services/index';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { addPlaylists, setPlaylists, updateStateDoc, updateSyncStatus } from './playlists.slice';
import { createMatchLists } from '../../services/firebase/firestore/firestore.helper';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const playlistSync = createListenerMiddleware();
export const createMixedSuggestions = createListenerMiddleware();

const startplaylistSyncListening = playlistSync.startListening as AppStartListening;
const startMixedListsListening = createMixedSuggestions.startListening as AppStartListening;

startplaylistSyncListening({
  actionCreator: updateStateDoc,
  effect: async (action, listenerApi) => {
    const { playlistId, snapshotId } = action.payload.data;
    const state = listenerApi.getState();
    const selectedList = state.playlist.playlists.find(list => list.playlistId === playlistId);

    if (!selectedList.exported) return;

    const token = state.user.spotify.token;

    const result = await Spotify.validateSnapshot(playlistId, snapshotId, token);

    // console.log(result);

    const status = snapshotId === result.snapshotId ? 'SYNCED' : 'UNSYNCED';

    listenerApi.dispatch(
      updateSyncStatus({
        sync: status,
      })
    );
  },
});

startMixedListsListening({
  actionCreator: setPlaylists,
  effect: async (action, listenerApi) => {
    const taglists = action.payload.lists;

    // console.log(1, taglists);
    const mixes = createMatchLists(taglists);

    // console.log(2, mixes);

    if (mixes.length < 1) return;

    listenerApi.dispatch(addPlaylists({ lists: mixes }));
  },
});
