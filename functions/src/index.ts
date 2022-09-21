import * as functions from 'firebase-functions';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import auth from './auth/auth.router.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import admin from 'firebase-admin';

admin.initializeApp();

export const db = admin.firestore();

const app: Application = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use(errorHandler);
app.use(notFoundHandler);

export const api = functions.https.onRequest(app);
export * from './auth/auth.functions';
export * from './user/user.functions';
export * from './playback/playback.functions';
export * from './playlist/playlist.functions';
