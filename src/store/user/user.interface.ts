export interface IUser {
  mail: string;
  fireId: string;
  loggedIn: boolean;
  ready: boolean;
  spotify: {
    connected: boolean;
    profile: {
      image: string;
      name: string;
      id: string;
    };
    auth: {
      consumedBySDK: boolean;
      accessToken: string;
      expires: number;
    };
  };
}

export type IFirebaseSignInPayload = Pick<IUser, 'mail' | 'fireId'>;

export type TokenPayload = Pick<
  IUser['spotify']['auth'],
  'accessToken' | 'expires'
>;

export type ISpotifyProfilePayload = Pick<
  IUser['spotify']['profile'],
  'image' | 'name' | 'id'
>;
