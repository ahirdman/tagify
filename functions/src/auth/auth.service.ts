import 'dotenv/config';

export const scope =
  'user-read-playback-state user-read-playback-position user-read-currently-playing user-read-recently-played user-read-email user-read-private user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read user-top-read streaming playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public';

export const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const clientId = process.env.CLIENT_ID as string;
export const clientSecret = process.env.CLIENT_SECRET as string;
export const redirectUri = process.env.REDIRECT_URI as string;
export const baseUrl = process.env.BASE_URL as string;
export const stateName = 'spotify_auth_state';
