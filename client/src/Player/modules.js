import fetchJson from '../httpClient';

const saveTrack = async (track, token) => {
  document.querySelector('.addLove').classList.add('addLove--visible')
  await fetchJson('/playback/save', token, track.id)
  setTimeout(() => {
    document.querySelector('.addLove').classList.remove('addLove--visible')
  }, 2000)
}

const startSession = async (devideId, token) => fetchJson('/playback', token, devideId)

const trackObject = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
}

export {
  saveTrack,
  startSession,
  trackObject
}
