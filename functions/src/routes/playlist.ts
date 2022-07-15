import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async ({ body: { token, userId, name } }, res) => {
  try {
    const results = await axios(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: 'POST',
        data: JSON.stringify({ name }),
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/add', async ({ body: { token, playlistId, tracks } }, res) => {
  const postBody = {
    uris: tracks,
  };

  try {
    const results = await axios(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        data: JSON.stringify(postBody),
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
