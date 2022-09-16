export interface IAccessData {
  access_token: string | null;
  token_type: string | null;
  scope: string | null;
  expires_in: number | null;
  refresh_token: string | null;
}

export interface IServerTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IUSerDocument {
  spotifyAuth: boolean;
  spotifyRefreshToken: string;
  spotifyAccessToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IServerTimestamp;
}