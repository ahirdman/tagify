import fetchJson from '../httpClient/index';
import { ITrack } from '../interface';

interface ISDKTrack {
  name: string,
  album: {
    images: [{ url: string }]
  },
  artists: [{ name: string }]
}

const saveTrack = async (track:any, token:string) => {
  console.log(track)
  document.querySelector('.addLove').classList.add('addLove--visible')
  await fetchJson('/playback/save', token, track.id)
  setTimeout(() => {
    document.querySelector('.addLove').classList.remove('addLove--visible')
  }, 2000)
}

const startSession = async (devideId:string, token:string) => fetchJson('/playback', token, devideId)

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
