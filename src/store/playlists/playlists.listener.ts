import { createListenerMiddleware } from '@reduxjs/toolkit';
import { Spotify } from '../../services/index';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';
import { getAllTags, setSuggestions, updateStateDoc, updateSyncStatus } from './playlists.slice';
import { findMixMatches } from '../../utils/mixLists/mixLists';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const playlistSync = createListenerMiddleware();
export const createMixedSuggestions = createListenerMiddleware();

const startplaylistSyncListening = playlistSync.startListening as AppStartListening;
const startMixedListsListening = createMixedSuggestions.startListening as AppStartListening;

startplaylistSyncListening({
  actionCreator: updateStateDoc,
  effect: async (action, listenerApi) => {
    const { spotifyId, snapshotId, id } = action.payload.data;
    const state = listenerApi.getState();
    const selectedList = state.playlist.playlists.find(list => list.spotifyId === spotifyId);

    if (!selectedList.exported) return;

    const token = state.user.spotify.token;

    const result = await Spotify.validateSnapshot(spotifyId, snapshotId, token);

    const status = snapshotId === result.snapshotId ? 'SYNCED' : 'UNSYNCED';

    listenerApi.dispatch(
      updateSyncStatus({
        id,
        sync: status,
      })
    );
  },
});

startMixedListsListening({
  actionCreator: getAllTags.fulfilled,
  effect: async (action, listenerApi) => {
    const taglists = action.payload.filter(list => list.type === 'TAG');
    const state = listenerApi.getState();

    const createdMixedLists = state.playlist.playlists.filter(list => list.type === 'MIXED');

    const potentialMixes = findMixMatches(taglists, createdMixedLists);

    listenerApi.dispatch(setSuggestions({ matches: potentialMixes }));
  },
});
