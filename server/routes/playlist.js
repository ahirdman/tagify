import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async ({ body: { token, userId, name } }, res) => {
  try {
    const results = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/add', async ({ body: { token, playlistId, tracks } }, res) => {
  const postBody = {
    uris: tracks,
  };

  try {
    const results = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
