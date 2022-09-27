import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IFirestoreTagDocument, Spotify } from '../../services';
import {
  PlaylistState,
  SelectListPayload,
  SetTagListsPayload,
  UpdateSyncPayload,
} from './playlists.interface';

export const exportPlaylist = createAsyncThunk('playlists/exportPlaylist', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { token } = state.user.spotify;
  const { id } = state.user.spotify.profile;
  const { name, tracks } = state.playlist.selectedList;

  const data = await Spotify.createNewPlaylistWithTracks(name, token, id, tracks);

  return data;
});

const initialState: PlaylistState = {
  tagLists: [] as IFirestoreTagDocument[],
  selectedList: null,
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setSelectedList: (state, { payload }: PayloadAction<SelectListPayload>) => {
      state.selectedList = {
        color: payload.selectedList.color,
        name: payload.selectedList.name,
        tracks: payload.selectedList.tracks,
        spotifySync: payload.selectedList.spotifySync,
        status: {
          error: false,
          exporting: false,
          sync: 'UNSYNCED',
        },
      };
    },
    clearSelectedList: state => {
      state.selectedList = null;
    },
    setTagLists: (state, { payload }: PayloadAction<SetTagListsPayload>) => {
      state.tagLists = payload.lists;
    },
    updateSync: (state, { payload }: PayloadAction<UpdateSyncPayload>) => {
      state.selectedList.status.sync = payload.sync;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(exportPlaylist.pending, ({ selectedList }) => {
        selectedList.status.exporting = true;
        selectedList.status.error = false;
      })
      .addCase(exportPlaylist.rejected, ({ selectedList }) => {
        selectedList.status.exporting = false;
        selectedList.status.error = true;
      })
      .addCase(exportPlaylist.fulfilled, ({ selectedList }, { payload }) => {
        selectedList.status.exporting = false;
        selectedList.status.error = false;
        selectedList.status.sync = 'SYNCED';
        selectedList.spotifySync = {
          exported: true,
          playlistId: payload.playlistId,
          snapshotId: payload.snapshotId,
        };
      });
  },
});

export const { setSelectedList, clearSelectedList, setTagLists, updateSync } =
  playlistSlice.actions;

export default playlistSlice.reducer;
