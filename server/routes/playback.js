import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post(
  '/',
  async ({ body: { token, deviceId, album, position } }, res) => {
    const putBody = {
      context_uri: album,
      offset: {
        position,
      },
    };

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          body: JSON.stringify(putBody),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.json('playing now');
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.post('/track', async ({ body: { token, trackId } }, res) => {
  try {
    const results = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/save', async ({ body: { token, trackId } }, res) => {
  try {
    await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      method: 'put',
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json('track saved');
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
