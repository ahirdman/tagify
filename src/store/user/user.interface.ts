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
    accessToken: string;
    expires: number;
  };
}

export type IFirebaseSignInPayload = Pick<IUser, 'mail' | 'fireId'>;

export type ITokenPayload = Pick<IUser['spotify'], 'accessToken' | 'expires'>;

export type ISpotifyProfilePayload = Pick<
  IUser['spotify']['profile'],
  'image' | 'name' | 'id'
>;
