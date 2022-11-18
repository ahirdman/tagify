import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import playbackReducer from './playback/playback.slice';
import savedTracksReducer from './savedTracks/savedTracks.slice';
import playlistsReducer from './playlists/playlists.slice';
import statsSliceReducer from './stats/stats.slice';
import { signIn, spotifyToken } from './user/user.listener';
import { playlistSync, createMixedSuggestions } from './playlists/playlists.listener';

export const store = configureStore({
  reducer: {
    user: userReducer,
    playback: playbackReducer,
    savedTracks: savedTracksReducer,
    playlist: playlistsReducer,
    statistics: statsSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(
      signIn.middleware,
      spotifyToken.middleware,
      playlistSync.middleware,
      createMixedSuggestions.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
