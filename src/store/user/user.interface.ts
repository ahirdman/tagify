import { ITopItem } from '../../common/common.interface';

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
    topItems: {
      items: ITopItem[];
      loading: boolean;
      error: boolean;
    };
  };
}

export type FirebaseSignInPayload = Pick<IUser, 'mail' | 'fireId'>;

export type TokenPayload = Pick<IUser['spotify'], 'token'>;

export type SpotifyProfilePayload = Pick<IUser['spotify']['profile'], 'image' | 'name' | 'id'>;
