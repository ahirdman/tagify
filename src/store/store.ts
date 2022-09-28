import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import uiReducer from './ui/ui.slice';
import playbackReducer from './playback/playback.slice';
import savedTracksReducer from './savedTracks/savedTracks.slice';
import playlistsReducer from './playlists/playlists.slice';
import { signIn, spotifyToken } from './user/user.listener';
import { playlistSync } from './playlists/playlists.listener';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    playback: playbackReducer,
    savedTracks: savedTracksReducer,
    playlist: playlistsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(
      signIn.middleware,
      spotifyToken.middleware,
      playlistSync.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
