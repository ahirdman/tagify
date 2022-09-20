import * as AuthService from './auth.service';
import axios from 'axios';
import { FireStoreUserDocument, RefreshTokenResponse } from './auth.interface';
import * as functions from 'firebase-functions';
import { ExperationObj } from '../Utils/date/date.interface';
import { hasExpired } from '../Utils/date/date.service';

export const spotifyToken = functions.https.onCall(async (_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }

  const uid = context.auth.uid as string;

  const userDoc = (await AuthService.getUserDoc(uid)) as FireStoreUserDocument;

  const tokenHasExpired: ExperationObj = hasExpired(
    userDoc.spotifyTokenTimestamp,
    userDoc.spotifyExpires
  );

  if (tokenHasExpired.expired) {
    const accessToken = await refreshToken(userDoc.spotifyRefreshToken, uid);

    return accessToken;
  }

  return {
    accessToken: userDoc.spotifyAccessToken,
  };
});

const refreshToken = async (refreshToken: string, uid: string) => {
  const form = new URLSearchParams();
  form.append('grant_type', 'refresh_token');
  form.append('refresh_token', refreshToken);

  const response = await axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    data: form,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${AuthService.clientId}:${AuthService.clientSecret}`
      ).toString('base64')}`,
    },
  });

  const data: RefreshTokenResponse = response.data;

  await AuthService.updateUserDoc(uid, data.access_token, data.expires_in);

  return {
    accessToken: data.access_token,
  };
};
