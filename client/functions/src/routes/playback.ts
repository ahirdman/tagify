import express from 'express';
import axios from 'axios';

const router = express.Router();

// Play track
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
      await axios(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          data: JSON.stringify(putBody),
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
    const results = await axios(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/save', async ({ body: { token, trackId } }, res) => {
  try {
    await axios(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      method: 'put',
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json('track saved');
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
