export interface IAlbumImages {
  url: string;
}

export interface IArtists {
  uri: string;
  name: string;
}

export interface IWebPlaybackTrack {
  uri: string;
  id: string;
  type: string;
  media_type: string;
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: IAlbumImages[];
  };
  artists: IArtists[];
}

export interface ICurrentTrack {
  uri: string;
  id: string;
  type: string;
  media_type: string;
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: IAlbumImages[];
  };
  artists: IArtists[];
}

export interface IPlaybackState {
  isPaused: boolean;
  isActive: boolean;
  deviceID: string;
  currentTrack: ICurrentTrack;
}
