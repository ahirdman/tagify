import express, {Response, NextFunction} from "express";
import axios from "axios";

const router = express.Router();

// Play track
router.post(
    "/",
    async ({body: {data}}, res: Response, next: NextFunction) => {
      if (!data.token || !data.deviceId || !data.uri) {
        next(new Error("Missing data in body"));
      }
      const putBody = {
        uris: [data.uri],
      };

      try {
        await axios(
            `https://api.spotify.com/v1/me/player/play?device_id=${data.deviceId}`,
            {
              method: "PUT",
              data: JSON.stringify(putBody),
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
        );
        res.json("playing now");
      } catch (error) {
        next(error);
      }
    }
);

// Save track to users library
router.post(
    "/save",
    async ({body: {data}}, res: Response, next: NextFunction) => {
      try {
        await axios(`https://api.spotify.com/v1/me/tracks?ids=${data.trackId}`, {
          method: "put",
          headers: {Authorization: `Bearer ${data.token}`},
        });
        res.json("track saved");
      } catch (error) {
        next(error);
      }
    }
);

export {router as default};
