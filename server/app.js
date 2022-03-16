import cookieParser from 'cookie-parser';
import querystring from 'querystring';
import bodyParser from 'body-parser';
import express from 'express';
import fetch from 'node-fetch';
import { scope, generateRandomString } from './spotify.js';
import 'dotenv/config';
// import cors from 'cors';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const PORT = 8080;

const app = express();
const stateKey = 'spotify_auth_state';

// app.use(cors)
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Motherflowers!');
});

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res
    .cookie(stateKey, state)
    .redirect(`https://accounts.spotify.com/authorize?${
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope,
        redirect_uri: redirectUri,
        state,
      })}`);
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res
      .send('state mismatch');
  } else {
    res
      .clearCookie(stateKey)
      .send(code);
  }
});

app.post('/tokens', async (req, res) => {
  console.log(req.body.code);

  const form = new URLSearchParams();
  form.append('code', req.body.code);
  form.append('redirect_uri', redirectUri);
  form.append('grant_type', 'authorization_code');
  console.log(form);

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: form,
      headers: {
        Authorization: `Basic ${new Buffer(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    const data = await response.json();
    console.log(data);
    // Tokens
    res
      .send(data);
  } catch (error) {
    console.error(error);
    res
      .sendStatus(500);
  }

  // if (!err && res.statusCode === 200) {
  // const accessToken = body.access_token;
  // const refreshToken = body.refresh_token;

  // const options = {
  //   url: 'https://api.spotify.com/v1/me',
  //   headers: { 'Authorization': 'Bearer ' + access_token },
  //   json: true
  // }

  // console.log('ACCESS:', accessToken);
  // console.log('REFRESH:', refreshToken);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
