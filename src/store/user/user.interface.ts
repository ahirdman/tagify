export interface IUser {
  mail: string;
  fireId: string;
  loggedIn: boolean;
  ready: boolean;
  spotify: {
    connected: boolean;
    token: string;
    profile: {
      image: string;
      name: string;
      id: string;
    };
  };
}

export type IFirebaseSignInPayload = Pick<IUser, 'mail' | 'fireId'>;

export type TokenPayload = Pick<
  IUser['spotify'],
  'token'
>;

export type ISpotifyProfilePayload = Pick<
  IUser['spotify']['profile'],
  'image' | 'name' | 'id'
>;
