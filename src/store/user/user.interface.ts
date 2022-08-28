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

interface IFirebaseSignInPayload {
  mail: string;
  fireId: string;
}

interface ITokenPayload {
  accessToken: string;
  expires: number;
}

interface ISpotifyProfilePayload {
  image: string;
  name: string;
  id: string;
}
