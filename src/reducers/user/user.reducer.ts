import { UserActionTypes } from './user.actions';
import { IUser, IUserActionTypes } from './user.interface';

export const initialUserState: IUser = {
  mail: '',
  fireId: '',
  loggedIn: false,
  spotify: {
    connected: false,
    profile: {
      image: '',
      name: '',
      id: '',
    },
    accessToken: '',
    expires: -1,
  },
};

export const userReducer = (state: IUser, action: IUserActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SPOTIFY_PROFILE:
      return {
        ...state,
        spotify: {
          ...state.spotify,
          profile: {
            ...payload,
          },
        },
      };
    case UserActionTypes.FIREBASE_SIGN_IN:
      return {
        ...state,
        ...payload,
      };
    case UserActionTypes.FIREBASE_SIGN_OUT:
      return { ...payload };
    case UserActionTypes.SPOTIFY_TOKEN:
      return {
        ...state,
        spotify: {
          ...state.spotify,
          ...payload,
        },
      };
    default:
      throw new Error('userReducer error');
  }
};
