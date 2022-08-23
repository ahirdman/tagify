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

admin.initializeApp();

export const db = admin.firestore();

const app: Application = express();

// var whitelist = [process.env.BASE_URL];
// var corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'POST, GET, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });
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
