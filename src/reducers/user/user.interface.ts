import { UserActionTypes } from './user.actions';

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
    expires: number;
  };
}

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
  expires: number;
}

type TokenAction = {
  type: UserActionTypes.SPOTIFY_TOKEN;
  payload: ITokenPayload;
};

export type IUserActionTypes =
  | SpotifyUserProfileAction
  | FirebaseSignInAction
  | FirebaseSignOutAction
  | TokenAction;
