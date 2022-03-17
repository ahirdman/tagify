import cookieParser from 'cookie-parser';
import querystring from 'querystring';
import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';
import { scope, generateRandomString } from './spotify.js';
import 'dotenv/config';
import cors from 'cors';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const PORT = 8080;

const app = express();
const stateKey = 'spotify_auth_state';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Hello Motherflowers!');
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });

  res
    .clearCookie('access')
    .clearCookie('refresh')
    .cookie(stateKey, state)
    .redirect(
      'https://accounts.spotify.com/authorize?' + authParams.toString()
    );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.send('state mismatch');
  }

  const form = new URLSearchParams();
  form.append('code', code);
  form.append('redirect_uri', redirectUri);
  form.append('grant_type', 'authorization_code');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: form,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
      },
    });

    const data = await response.json();
    res
      .clearCookie(stateKey)
      .cookie('access', data.access_token)
      .cookie('refresh', data.refresh_token)
      .redirect('http://localhost:3000');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post('/user', async (req, res) => {
  try {
    const results = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + req.body.token },
    });
    const data = await results.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send(500);
  }
});

app.post('/track', async (req, res) => {
  const token = req.body.token;
  const trackId = req.body.trackId;

  try {
    const results = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
