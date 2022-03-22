interface IUser {
  image: string,
  name: string,
  followers: string
}

interface ITrack {
  album: {
    images: [{
      url: string,
      height: number,
      width: number
    }]
    name: string,
    uri: string,
  },
  artists: [{
    name: string,
    uri: string
  }],
  duration_ms: number,
  id: string,
  is_playable: boolean,
  linked_from: {
    id?: string,
    uri?: string
  },
  media_type: string;
  name: string,
  track_type: string;
  type: string,
  uid: string,
  uri: string
}

interface IAccessProp {
  accessToken: string
}

export type {
  IUser,
  ITrack,
  IAccessProp
}
