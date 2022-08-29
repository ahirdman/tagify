interface IUser {
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

type IFirebaseSignInPayload = Pick<IUser, 'mail' | 'fireId'>;

type ITokenPayload = Pick<IUser['spotify'], 'accessToken' | 'expires'>;

type ISpotifyProfilePayload = Pick<
  IUser['spotify']['profile'],
  'image' | 'name' | 'id'
>;
