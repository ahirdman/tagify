const scope =
  "user-read-playback-state user-modify-playback-state user-follow-modify user-follow-read user-library-modify user-library-read streaming user-read-playback-position playlist-modify-private playlist-read-collaborative user-read-email playlist-read-private user-top-read playlist-modify-public user-read-currently-playing user-read-recently-played";

const generateRandomString = (length: number) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export {scope, generateRandomString};
