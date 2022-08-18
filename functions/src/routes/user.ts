import express from "express";
import axios from "axios";

const router = express.Router();
const baseUrl = "https://api.spotify.com/v1/me";

// Get users profile
router.post("/", async ({body: {token}}, res) => {
  try {
    const results = await axios(baseUrl, {
      headers: {Authorization: `Bearer ${token}`},
    });
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get 50 first users saved tracks
router.post("/saved", async ({body: {token}}, res) => {
  const market = "market=ES";
  const limit = "limit=50";
  const offset = "offset=0";

  try {
    const results = await axios(
        `${baseUrl}/tracks?${market}&${limit}&${offset}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
    );
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get next users saved tracks
router.post("/next", async ({body: {token, url}}, res) => {
  try {
    const results = await axios(url, {
      headers: {Authorization: `Bearer ${token}`},
    });
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export {router as default};
