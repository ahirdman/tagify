import * as functions from 'firebase-functions';
import axios from 'axios';
import { PlayTrack } from './playback.interface';
import { isAuthenticated } from '../common/common.error';

const URL = 'https://api.spotify.com/v1/me/player/play?device_id=';

export const playSpotifyTrack = functions.https.onCall(async (data: PlayTrack, context) => {
  isAuthenticated(context);

  if (!data.token || !data.deviceId || !data.uri) {
    throw new functions.https.HttpsError('failed-precondition', 'Missing data in body');
  }

  const result = await axios(URL + data.deviceId, {
    method: 'PUT',
    data: JSON.stringify({ uris: [data.uri] }),
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  console.log(result.data);
  return 'SUCCESS';
});
