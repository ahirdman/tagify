import * as functions from 'firebase-functions';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import auth from './auth/auth.router.js';
import user from './user/user.router.js';
import playback from './playback/playback.router.js';
import playlist from './playlist/playlist.router.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import admin from 'firebase-admin';
import * as AuthService from './auth/auth.service';
import axios from 'axios';
import { IUSerDocument } from './auth/auth.interface';

admin.initializeApp();

export const db = admin.firestore();

const app: Application = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/user', user);
app.use('/playback', playback);
app.use('/playlist', playlist);
app.use(errorHandler);
app.use(notFoundHandler);

export const api = functions.https.onRequest(app);

export const getToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }

  const uid = context.auth.uid;

  const userDoc = (await AuthService.getUserDoc(uid)) as IUSerDocument;

  const form = new URLSearchParams();
  form.append('grant_type', 'refresh_token');
  form.append('refresh_token', userDoc.spotifyRefreshToken);

  const response = await axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    data: form,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${AuthService.clientId}:${AuthService.clientSecret}`
      ).toString('base64')}`,
    },
  });

  const { access_token, expires_in } = response.data;

  await AuthService.updateUserDoc(uid, access_token, expires_in);

  return {
    access_token, expires: expires_in
  };
});

export const refreshToken = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called ' + 'while authenticated.'
    );
  }

  const uid = context.auth.uid;

  const userDoc = (await AuthService.getUserDoc(uid)) as IUSerDocument;

  const form = new URLSearchParams();
  form.append('grant_type', 'refresh_token');
  form.append('refresh_token', userDoc.spotifyRefreshToken);

  const response = await axios('https://accounts.spotify.com/api/token', {
    method: 'post',
    data: form,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${AuthService.clientId}:${AuthService.clientSecret}`
      ).toString('base64')}`,
    },
  });

  const { access_token, expires_in } = response.data;

  await AuthService.updateUserDoc(uid, access_token, expires_in);

  return {
    access_token, expires: expires_in
  };
});
