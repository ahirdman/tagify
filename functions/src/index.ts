import * as functions from 'firebase-functions';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth.js';
import user from './routes/user.js';
import playback from './routes/playback.js';
import playlist from './routes/playlist.js';

const app = express();

app.use(cors({ origin: true }));

app.get('/test', (_, res) => {
  res.json('Server responds!');
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/user', user);
app.use('/playback', playback);
app.use('/playlist', playlist);

export const api = functions.https.onRequest(app);
