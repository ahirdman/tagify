import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import uiReducer from './ui/ui.slice';
import playbackReducer from './playback/playback.slice';
import savedTracksReducer from './savedTracks/savedTracks.slice';
import { signIn, spotifyToken } from './user/user.listener';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    playback: playbackReducer,
    savedTracks: savedTracksReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(signIn.middleware, spotifyToken.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
