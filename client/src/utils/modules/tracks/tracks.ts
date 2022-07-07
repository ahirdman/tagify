export const dbTrack = (track: any) => ({
  artist: track.artists[0].name,
  title: track.name,
  artwork: track.album.images[2].url,
  uri: track.uri,
});
