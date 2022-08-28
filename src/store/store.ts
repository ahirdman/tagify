import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import uiReducer from './ui/ui.slice';
import playbackReducer from './playback/playback.slice';
import savedTracksReducer from './savedTracks/savedTracks.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    playback: playbackReducer,
    savedTracks: savedTracksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
