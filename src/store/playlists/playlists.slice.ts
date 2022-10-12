import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Spotify } from '../../services';
import {
  PlaylistState,
  Playlist,
  SelectListPayload,
  SetPlaylistsPayload,
  UpdatePlaylistData,
  UpdateSyncPayload,
  AddPlaylistsPayload,
} from './playlists.interface';

export const exportPlaylist = createAsyncThunk('playlists/exportPlaylist', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.user.spotify;
  const { id } = state.user.spotify.profile;

  const selectedList = state.playlist.playlists.find(list => list.isActive === true);
  const { name, tracks } = selectedList;

  const data = await Spotify.createNewPlaylistWithTracks(name, token, id, tracks);

  return data;
});

const initialState: PlaylistState = {
  playlists: [] as Playlist[],
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, { payload }: PayloadAction<SetPlaylistsPayload>) => {
      state.playlists = payload.lists;
    },
    addPlaylists: (state, { payload }: PayloadAction<AddPlaylistsPayload>) => {
      state.playlists = [...state.playlists, ...payload.lists];
    },
    setSelectedList: (state, { payload }: PayloadAction<SelectListPayload>) => {
      state.playlists.find(list => list.id === payload.selectedList).isActive = true;
    },
    clearSelectedList: state => {
      state.playlists.map(list => (list.isActive = false));
    },
    updateSyncStatus: (state, { payload }: PayloadAction<UpdateSyncPayload>) => {
      state.playlists.find(list => list.isActive === true).status.sync = payload.sync;
    },
    updateStateDoc: (state, { payload }: PayloadAction<UpdatePlaylistData>) => {
      const activeList = state.playlists.find(list => list.isActive === true);

      if (activeList) {
        Object.assign(activeList, { ...payload.data });
      }
      // state.tagLists[index] = {
      //   ...payload.data,
      //   isActive: state.tagLists[index].isActive,
      //   status: state.tagLists[index].status,
      // };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(exportPlaylist.pending, state => {
        const index = state.playlists.findIndex(e => e.isActive === true);

        state.playlists[index].status.exporting = true;
        state.playlists[index].status.error = false;
      })
      .addCase(exportPlaylist.rejected, state => {
        const index = state.playlists.findIndex(e => e.isActive === true);

        state.playlists[index].status.exporting = false;
        state.playlists[index].status.error = true;
      })
      .addCase(exportPlaylist.fulfilled, (state, { payload }) => {
        const index = state.playlists.findIndex(e => e.isActive === true);

        state.playlists[index] = {
          ...state.playlists[index],
          exported: true,
          playlistId: payload.playlistId,
          snapshotId: payload.snapshotId,
          status: {
            exporting: false,
            error: false,
            sync: 'SYNCED',
          },
        };
      });
  },
});

export const {
  setSelectedList,
  addPlaylists,
  clearSelectedList,
  setPlaylists,
  updateSyncStatus,
  updateStateDoc,
} = playlistSlice.actions;

export default playlistSlice.reducer;

export const selectTaglists = (state: RootState) => state.playlist.playlists;

export const selectActiveTagList = createSelector([selectTaglists], taglists =>
  taglists.find(list => list.isActive === true)
);

export const selectMixedPlaylists = createSelector([selectTaglists], taglists =>
  taglists.filter(list => list.type === 'MIXED')
);

export const selectTagPlaylists = createSelector([selectTaglists], taglists =>
  taglists.filter(list => list.type === 'TAG')
);

export const selectCreatedMixedPlaylists = createSelector([selectTaglists], taglists =>
  taglists.filter(list => list.type === 'MIXED' && list.created === true)
);
