/**
 * Actions Interface
 */

type FirebaseSignOutAction = {
  type: UserActionTypes.FIREBASE_SIGN_OUT;
  payload: IUser;
};

interface IFirebaseSingInPayload {
  loggedIn: boolean;
  mail: string;
  fireId: string;
}

type FirebaseSignInAction = {
  type: UserActionTypes.FIREBASE_SIGN_IN;
  payload: IFirebaseSingInPayload;
};

interface IProfilePayload {
  image: string;
  name: string;
  id: string;
}

type SpotifyUserProfileAction = {
  type: UserActionTypes.SPOTIFY_PROFILE;
  payload: IProfilePayload;
};

interface ITokenPayload {
  accessToken: string;
  refreshToken: string;
  expires: number;
}

type TokenAction = {
  type: UserActionTypes.SPOTIFY_TOKEN;
  payload: ITokenPayload;
};

type IUserActionTypes =
  | SpotifyUserProfileAction
  | FirebaseSignInAction
  | FirebaseSignOutAction
  | TokenAction;

/**
 * Actions Definition
 */

export enum UserActionTypes {
  SPOTIFY_PROFILE = 'getSpotifyProfile',
  FIREBASE_SIGN_IN = 'signInFirebase',
  FIREBASE_SIGN_OUT = 'signOutFirebase',
  SPOTIFY_TOKEN = 'spotifyToken',
}

/**
 * Reducer Interface
 */

export interface IUser {
  mail: string;
  fireId: string;
  loggedIn: boolean;
  spotify: {
    connected: boolean;
    profile: {
      image: string;
      name: string;
      id: string;
    };
    accessToken: string;
    refreshToken: string;
    expires: number;
  };
}

/**
 * Reducer Definition
 */

// TODO: Make firebase refresh token in the background?

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
    refreshToken: '',
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
