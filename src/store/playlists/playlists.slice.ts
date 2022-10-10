import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Spotify } from '../../services';
import {
  PlaylistState,
  Playlist,
  SelectListPayload,
  SetTagListsPayload,
  UpdatePlaylistData,
  UpdateSyncPayload,
  MixedPlaylist,
  SetMixedListsPayload,
} from './playlists.interface';

export const exportPlaylist = createAsyncThunk('playlists/exportPlaylist', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.user.spotify;
  const { id } = state.user.spotify.profile;

  const selectedList = state.playlist.tagLists.find(list => list.isActive === true);
  const { name, tracks } = selectedList;

  const data = await Spotify.createNewPlaylistWithTracks(name, token, id, tracks);

  return data;
});

const initialState: PlaylistState = {
  tagLists: [] as Playlist[],
  mixedLists: [] as MixedPlaylist[],
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setTagLists: (state, { payload }: PayloadAction<SetTagListsPayload>) => {
      state.tagLists = payload.lists;
    },
    setMixedLists: (state, { payload }: PayloadAction<SetMixedListsPayload>) => {
      state.mixedLists = payload.lists;
    },
    setSelectedList: (state, { payload }: PayloadAction<SelectListPayload>) => {
      const activeList = state.tagLists.find(list => list.name === payload.selectedList);
      const activeMixedList = state.mixedLists.find(list => list.name === payload.selectedList);

      if (activeList) {
        activeList.isActive = true;
      }
      if (activeMixedList) {
        activeMixedList.isActive = true;
      }
    },
    clearSelectedList: state => {
      state.tagLists.map(list => (list.isActive = false));
    },
    updateSyncStatus: (state, { payload }: PayloadAction<UpdateSyncPayload>) => {
      const activeList = state.tagLists.find(list => list.isActive === true);

      if (activeList) {
        activeList.status.sync = payload.sync;
      }
    },
    updateStateDoc: (state, { payload }: PayloadAction<UpdatePlaylistData>) => {
      const activeList = state.tagLists.find(list => list.isActive === true);

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
        const index = state.tagLists.findIndex(e => e.isActive === true);

        state.tagLists[index].status.exporting = true;
        state.tagLists[index].status.error = false;
      })
      .addCase(exportPlaylist.rejected, state => {
        const index = state.tagLists.findIndex(e => e.isActive === true);

        state.tagLists[index].status.exporting = false;
        state.tagLists[index].status.error = true;
      })
      .addCase(exportPlaylist.fulfilled, (state, { payload }) => {
        const index = state.tagLists.findIndex(e => e.isActive === true);

        state.tagLists[index] = {
          ...state.tagLists[index],
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
  clearSelectedList,
  setTagLists,
  updateSyncStatus,
  updateStateDoc,
  setMixedLists,
} = playlistSlice.actions;

export default playlistSlice.reducer;

export const selectTaglists = (state: RootState) => state.playlist.tagLists;

export const selectActiveTagList = createSelector([selectTaglists], taglists =>
  taglists.find(list => list.isActive === true)
);
