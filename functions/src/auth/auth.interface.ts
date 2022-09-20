export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string
  token_type: string,
  scope: string,
  expires_in: number
}

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface FireStoreUserDocument {
  spotifyAuth: boolean;
  spotifyRefreshToken: string;
  spotifyAccessToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: FirestoreTimestamp;
}
