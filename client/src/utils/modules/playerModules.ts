import { post } from '../httpClient/index';

const saveTrack = async (track: any, token: string): Promise<void> => {
  document.querySelector('.addLove').classList.add('addLove--visible');
  await post('/playback/save', { token, trackId: track.id });
  setTimeout(() => {
    document.querySelector('.addLove').classList.remove('addLove--visible');
  }, 2000);
};

const playTrack = async (
  deviceId: string,
  token: string,
  album: string,
  position: number
): Promise<void> => {
  await post('/playback', { token, deviceId, album, position });
};

const trackObject = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

export { saveTrack, playTrack, trackObject };
