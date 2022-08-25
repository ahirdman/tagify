import express, { Response, NextFunction } from 'express';
import axios from 'axios';

const router = express.Router();

// Create new Playlist
router.post(
  '/',
  async ({ body: { data } }, res: Response, next: NextFunction) => {
    try {
      const results = await axios(
        `https://api.spotify.com/v1/users/${data.userId}/playlists`,
        {
          method: 'POST',
          data: JSON.stringify({ name }),
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
      res.send(results.data);
    } catch (error) {
      next(error);
    }
  }
);

// Add tracks to existing Playlist
router.post(
  '/add',
  async ({ body: { data } }, res: Response, next: NextFunction) => {
    const postBody = {
      uris: data.tracks,
    };

    try {
      const results = await axios(
        `https://api.spotify.com/v1/playlists/${data.playlistId}/tracks`,
        {
          method: 'POST',
          data: JSON.stringify(postBody),
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
      res.send(results.data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as default };
