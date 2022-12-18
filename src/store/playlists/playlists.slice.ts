import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Firestore, Spotify } from '../../services';
import {
  IPlaylistState,
  IPlaylist,
  IUpdatePlaylistData,
  IUpdateSyncPayload,
  IPlaylistsPayload,
  ITagTrackThunkArgs,
  IMixedMatchesPayload,
} from './playlists.interface';
import { IMixMatch } from '../../utils/mixLists/mixLists';

export const exportPlaylist = createAsyncThunk(
  'playlists/exportPlaylist',
  async (playlistId: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.user.spotify;
    const { id } = state.user.spotify.profile;

    const selectedList = state.playlist.playlists.find(list => list.id === playlistId);
    const { name, tracks } = selectedList;

    const data = await Spotify.createNewPlaylistWithTracks(name, token, id, tracks);

    return data;
  }
);

export const createTag = createAsyncThunk(
  'playlists/createTag',
  async (playlist: IPlaylist, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { fireId } = state.user;

    thunkAPI.dispatch(addPlaylists({ lists: [playlist] }));

    await Firestore.createList(
      fireId,
      playlist.id,
      playlist.name,
      playlist.color,
      playlist.type,
      playlist.tracks
    );

    return playlist.id;
  }
);

export const tagTrack = createAsyncThunk(
  'playlists/tagTrack',
  async ({ playlistName, tracks }: ITagTrackThunkArgs, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { fireId } = state.user;

    const result = await Firestore.addTagsToTrack(fireId, playlistName, tracks);

    return result;
  }
);

export const getAllTags = createAsyncThunk('playlists/getAllTags', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const { fireId } = state.user;

  const tags = await Firestore.getAllTags(fireId);

  return tags;
});

const initialState: IPlaylistState = {
  playlists: [] as IPlaylist[],
  mixSuggestions: [] as IMixMatch[],
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setPlaylists: (state, { payload }: PayloadAction<IPlaylistsPayload>) => {
      state.playlists = payload.lists;
    },
    setSuggestions: (state, { payload }: PayloadAction<IMixedMatchesPayload>) => {
      state.mixSuggestions = payload.matches;
    },
    addPlaylists: (state, { payload }: PayloadAction<IPlaylistsPayload>) => {
      state.playlists = [...state.playlists, ...payload.lists];
    },
    updateSyncStatus: (state, { payload }: PayloadAction<IUpdateSyncPayload>) => {
      const playlist = state.playlists.find(list => list.id === payload.id);

      playlist.status.sync = payload.sync;
    },
    updateStateDoc: (state, { payload }: PayloadAction<IUpdatePlaylistData>) => {
      const activeList = state.playlists.find(list => list.id === payload.data.id);

      if (activeList) {
        Object.assign(activeList, { ...payload.data });
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTags.fulfilled, (state, { payload }) => {
        const stateListIds = state.playlists.map(list => list.id);
        const newPayloadList = payload.filter(payloadTag => !stateListIds.includes(payloadTag.id));

        state.playlists.push(...newPayloadList);
      })
      .addCase(exportPlaylist.pending, (state, action) => {
        const index = state.playlists.findIndex(e => e.id === action.meta.arg);

        state.playlists[index].status.exporting = true;
        state.playlists[index].status.error = false;
      })
      .addCase(exportPlaylist.rejected, (state, action) => {
        const index = state.playlists.findIndex(e => e.id === action.meta.arg);

        state.playlists[index].status.exporting = false;
        state.playlists[index].status.error = true;
      })
      .addCase(exportPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(e => e.id === action.meta.arg);

        state.playlists[index] = {
          ...state.playlists[index],
          exported: true,
          spotifyId: action.payload.playlistId,
          snapshotId: action.payload.snapshotId,
          status: {
            exporting: false,
            error: false,
            sync: 'SYNCED',
          },
        };
      });
  },
});

export const { setSuggestions, addPlaylists, setPlaylists, updateSyncStatus, updateStateDoc } =
  playlistSlice.actions;

export default playlistSlice.reducer;

const selectTaglists = (state: RootState) => state.playlist.playlists;

export const selectMixedPlaylists = createSelector([selectTaglists], taglists =>
  taglists.filter(list => list.type === 'MIXED')
);

export const selectTagPlaylists = createSelector([selectTaglists], taglists =>
  taglists.filter(list => list.type === 'TAG')
);

export const selectNumberOfTaggedTracks = createSelector(
  [selectTaglists],
  taglists => taglists.filter(list => list.type === 'MIXED').length // NOT IMPLEMENTED
);

export const selectTaggedTracks = createSelector([selectTaglists], tagList =>
  tagList.flatMap(list => list.tracks).map(track => track.id)
);
