import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { scope, generateRandomString } from './spotify.js';
import 'dotenv/config';

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

app.get('/', (_, res) => {
  res.json('Hello Motherflowers!');
});

app.get('/login', (_, res) => {
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
    .cookie(stateKey, state)
    .redirect(
      `https://accounts.spotify.com/authorize?${authParams.toString()}`,
    );
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

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
      .clearCookie(stateKey)
      .cookie('access', data.access_token)
      .redirect('http://localhost:3000');
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/user', async (req, res) => {
  try {
    const results = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${req.body.token}` },
    });
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/track', async (req, res) => {
  const { token } = req.body;
  const { trackId } = req.body;

  try {
    const results = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/save', async (req, res) => {
  const { token } = req.body;
  const { trackId } = req.body

  try {
    await fetch(
      `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      {
        method: 'put',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.json('track saved');
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/start', async (req, res) => {
  const { token } = req.body;
  const deviceId = req.body.trackId
  
  const body = {
    "device_ids": [deviceId],
    "play": "true"
  }

  try {
    await fetch(
      `https://api.spotify.com/v1/me/player`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res.json('playing now');
  } catch (error) {
    res.sendStatus(500);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Set starting playlist to country radio = 37i9dQZF1EQmPV0vrce2QZ

// Endpoint	https://api.spotify.com/v1/playlists/{playlist_id}
// HTTP Method	GET