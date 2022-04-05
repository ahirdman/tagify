import express from 'express';
import fetch from 'node-fetch';
import { scope, generateRandomString } from '../modules/index.js';
import 'dotenv/config';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const stateName = 'spotify_auth_state';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://spotifymoody.herokuapp.com/'
  : 'http://localhost:3000'

const router = express.Router();

router.get('/', (req, res) => {
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
  });

  res
    .clearCookie('access')
    .cookie(stateName, state)
    .redirect(
      `https://accounts.spotify.com/authorize?${authParams.toString()}`,
    );
});

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateName] : null;

  if (state === null || state !== storedState) {
    res.json('state mismatch');
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
          `${clientId}:${clientSecret}`,
        ).toString('base64')}`,
      },
    });

    const data = await response.json();

    res
      .clearCookie(stateName)
      .cookie('access', data.access_token)
      .redirect(baseUrl);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
